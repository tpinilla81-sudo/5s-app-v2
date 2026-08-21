'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import {
  Camera,
  Upload,
  X,
  CheckCircle,
  Image as ImageIcon,
  SwitchCamera,
  Video,
  VideoOff,
  Zap,
  GalleryHorizontalEnd,
  Loader2,
  Maximize2,
  Minimize2,
} from 'lucide-react';
import { use5SStore } from '../../lib/store';
import { toast } from 'sonner';
import { S_STEPS, MIN_PHOTOS, MINI_STEPS, DRAFT_NAME_BY_S } from '../../lib/5s-constants';
import {
  compressImage,
  generatePhotoFilename,
  base64toFile,
  estimateBase64Size,
  formatBytes,
} from '../../lib/image-utils';

interface FotosModalProps {
  open: boolean;
  onClose: () => void;
  sStep: number;
  miniStep: number;
}

const BEFORE_PROMPT_BY_S: Record<number, string> = {
  1: 'Fotografía los elementos innecesarios que hay en la zona. Esto servirá como referencia "ANTES" de la clasificación.',
  2: 'Fotografía cómo está organizada la zona actualmente. Esto servirá como referencia "ANTES" de la reorganización.',
  3: 'Fotografía los puntos de suciedad de la zona. Esto servirá como referencia "ANTES" de la limpieza.',
  4: 'Fotografía el estado actual de la zona. Esto servirá como referencia "ANTES" de la estandarización.',
  5: 'Fotografía el nivel de cumplimiento de los estándares. Esto servirá como referencia "ANTES" de la disciplina.',
};

interface PhotoItem {
  id: string; // ID único por foto — para actualizaciones de estado seguras en cola
  preview: string;
  serverUrl: string;
  uploaded: boolean;
  uploading: boolean;
  estimatedSize: number;
  title: string; // Título descriptivo de la foto
  photoType: string; // "antes", "despues", "referencia", "hallazgo"
  savedToLibrary: boolean; // Si ya se guardó en la biblioteca
  dbId?: string; // v2.47: id real en PhotoLibrary (solo si savedToLibrary=true)
}

export default function FotosModal({ open, onClose, sStep, miniStep }: FotosModalProps) {
  const { fetchProgress, currentUser, adminFreeNavigation, currentProject, currentZone, canPerform, canView, hasPermission, openModal } = use5SStore();
  const sStepData = S_STEPS.find(s => s.id === sStep);
  const miniStepData = MINI_STEPS.find(m => m.id === miniStep);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const canSkipSteps = hasPermission('skip_steps');
  const canPerformStep = canPerform(sStep, miniStep);
  const canViewStep = canView(sStep, miniStep);
  // Permission-driven: read-only if no execute perm OR if candado closed for skip_steps users
  const isReadOnly = !canPerformStep || (canSkipSteps && !adminFreeNavigation);

  const [isFullscreen, setIsFullscreen] = useState(true);
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  // v2.48: permite re-abrir un Paso 2 ya completado para AÑADIR más fotos
  // (p. ej. si se necesitan fotos adicionales en otros pasos como el 4 o 5).
  // Las fotos ya guardadas siguen sin poder borrarse (backend 409).
  const [showAddMore, setShowAddMore] = useState(false);
  const [cameraMode, setCameraMode] = useState<'idle' | 'streaming' | 'capturing'>('idle');
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [captureFlash, setCaptureFlash] = useState(false);
  const [activeTab, setActiveTab] = useState<'camera' | 'upload'>('camera');
  const [defaultPhotoType, setDefaultPhotoType] = useState<string>('antes');

  // v2.35: límite dinámico de fotos configurable por plantilla / override por zona.
  // Por defecto 10 (MIN_PHOTOS). Se actualiza al abrir el modal.
  const [minPhotos, setMinPhotos] = useState<number>(MIN_PHOTOS);
  const [photoLimitSource, setPhotoLimitSource] = useState<'override' | 'template' | 'default'>('default');

  const beforePrompt = BEFORE_PROMPT_BY_S[sStep] || 'Fotografía la zona para documentar su estado actual.';

  // Generate auto title with traceability
  const generatePhotoTitle = (index: number, photoType: string): string => {
    const sName = sStepData?.japaneseName || `S${sStep}`
    const zoneName = currentZone?.name || 'Zona'
    const typeLabel = photoType === 'antes' ? 'ANTES' : photoType === 'despues' ? 'DESPUÉS' : photoType === 'referencia' ? 'Referencia' : 'Hallazgo'
    const date = new Date().toLocaleDateString('es-ES')
    return `S${sStep} ${sName} - ${zoneName} - ${typeLabel} ${index + 1} (${date})`
  }

  // Refs para cola de subida secuencial — evita saturar CPU/memoria en móvil
  // cuando se seleccionan varias fotos a la vez (era la causa del bloqueo).
  const uploadQueueRef = useRef<{ rawBase64: string; photoType: string }[]>([]);
  const isProcessingRef = useRef(false);
  const photoCounterRef = useRef(0);
  const [queueLength, setQueueLength] = useState(0);

  const uploadPhoto = async (base64Data: string, index: number): Promise<string | null> => {
    try {
      const projectId = currentProject?.id || 'unknown';
      const filename = generatePhotoFilename(projectId, sStep, miniStep, index);
      const file = base64toFile(base64Data, filename);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('filename', filename);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.success && data.url) return data.url;
      return null;
    } catch (error) {
      console.error('Upload error:', error);
      return null;
    }
  };

  // Procesa la cola de fotos UNA A UNA. Así el canvas + toDataURL + fetch
  // no compiten por CPU/memoria, y la UI del móvil no se congela.
  const processQueue = useCallback(async () => {
    if (isProcessingRef.current) return;
    if (uploadQueueRef.current.length === 0) return;
    isProcessingRef.current = true;
    console.log(`[FotosModal] processQueue: iniciando procesamiento de ${uploadQueueRef.current.length} foto(s)`);

    try {
      while (uploadQueueRef.current.length > 0) {
        const item = uploadQueueRef.current.shift()!;
        setQueueLength(uploadQueueRef.current.length);

        const { rawBase64, photoType } = item;
        const index = photoCounterRef.current++;
        const photoId = `photo_${Date.now()}_${index}_${Math.random().toString(36).slice(2, 8)}`;
        console.log(`[FotosModal] processQueue: procesando foto #${index + 1} (id=${photoId}), quedan ${uploadQueueRef.current.length} en cola`);

        try {
          // v2.58: si la compresión falla, usar el original sin comprimir
          let compressed: string;
          try {
            compressed = await compressImage(rawBase64);
          } catch (compressErr) {
            console.warn('[FotosModal] Compression failed, using original:', compressErr);
            compressed = rawBase64;
          }
          const estimatedSize = estimateBase64Size(compressed);

          const newPhoto: PhotoItem = {
            id: photoId,
            preview: compressed,
            serverUrl: '',
            uploaded: false,
            uploading: true,
            estimatedSize,
            title: generatePhotoTitle(index, photoType),
            photoType,
            savedToLibrary: false,
          };

          setPhotos(prev => [...prev, newPhoto]);

          const url = await uploadPhoto(compressed, index);

          // Actualiza por ID — robusto frente a reordenamientos/eliminaciones
          setPhotos(prev =>
            prev.map(p =>
              p.id === photoId
                ? { ...p, serverUrl: url || '', uploaded: !!url, uploading: false }
                : p
            )
          );
        } catch (err) {
          console.error('Error processing queued photo:', err);
          // Marcamos la foto como fallida (uploaded=false, uploading=false) para que el usuario la vea
          setPhotos(prev =>
            prev.map(p =>
              p.id === photoId
                ? { ...p, uploading: false, uploaded: false }
                : p
            )
          );
        }

        // Cede al event loop para que el navegador pinte (evita congelar la UI)
        await new Promise(r => setTimeout(r, 30));
      }
    } finally {
      isProcessingRef.current = false;
      setQueueLength(0);
    }
  }, [sStep, miniStep, currentProject?.id]);

  // Encolar (no procesa directamente). Múltiples llamadas paralelas solo llenan la cola,
  // luego processQueue las consume de una en una.
  const addPhoto = useCallback((rawBase64: string) => {
    uploadQueueRef.current.push({ rawBase64, photoType: defaultPhotoType });
    setQueueLength(uploadQueueRef.current.length);
    processQueue();
  }, [processQueue, defaultPhotoType]);

  const stopStream = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setCameraMode('idle');
  }, [stream]);

  const startCamera = useCallback(async () => {
    setCameraError(null);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode, width: { ideal: 1920 }, height: { ideal: 1080 } },
        audio: false,
      });
      setStream(mediaStream);
      setCameraMode('streaming');
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        await videoRef.current.play();
      }
    } catch (err: any) {
      if (err.name === 'NotAllowedError') setCameraError('Permiso denegado. Permite el acceso a la cámara.');
      else if (err.name === 'NotFoundError') setCameraError('No se encontró ninguna cámara.');
      else setCameraError('Error al acceder a la cámara. Intenta subir una foto desde tu galería.');
    }
  }, [facingMode]);

  const switchCamera = useCallback(async () => {
    stopStream();
    setFacingMode(prev => (prev === 'environment' ? 'user' : 'environment'));
  }, [stopStream]);

  const capturePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    // v2.60: validar que el video tiene un frame listo (videoWidth > 0).
    // Si el stream acaba de iniciar o está en transición, videoWidth puede
    // ser 0 y el canvas resultante sería 0x0 → imagen negra al comprimir.
    if (!video.videoWidth || !video.videoHeight || video.videoWidth < 2 || video.videoHeight < 2) {
      console.warn('[FotosModal] Video not ready (dimensions:', video.videoWidth, 'x', video.videoHeight, '). Skipping capture.');
      toast.error('La cámara aún no está lista. Espera un instante e inténtalo de nuevo.');
      return;
    }
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    // v2.60: llenar el canvas con blanco antes de dibujar (igual que compressImage)
    // para evitar píxeles negros si la imagen tuviera transparencia.
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    if (facingMode === 'user') { ctx.translate(canvas.width, 0); ctx.scale(-1, 1); }
    ctx.drawImage(video, 0, 0);
    const base64 = canvas.toDataURL('image/jpeg', 0.9);
    // v2.60: sanity check — si la captura es sospechosamente pequeña,
    // no la añadimos a la cola (sería una foto negra).
    const base64Len = base64.split(',')[1]?.length || 0;
    const estimatedSize = (base64Len * 3) / 4;
    if (estimatedSize < 1024) {
      console.error('[FotosModal] Capture produced empty image (' + estimatedSize + ' bytes). Skipping.');
      toast.error('La captura salió vacía. Inténtalo de nuevo.');
      return;
    }
    setCaptureFlash(true);
    setTimeout(() => setCaptureFlash(false), 300);
    addPhoto(base64);
  }, [facingMode, addPhoto]);

  // Load existing photos from DB when modal opens
  const [loadingPhotos, setLoadingPhotos] = useState(false);

  // v2.35: cargar límite dinámico de fotos al abrir el modal.
  // Llama a /api/photo-limits que resuelve override > template > 10.
  useEffect(() => {
    if (!open || !currentProject?.id || !currentZone?.id) return;
    const url = `/api/photo-limits?projectId=${currentProject.id}&zoneId=${currentZone.id}&sStep=${sStep}&miniStep=${miniStep}`;
    fetch(url)
      .then(r => r.json())
      .then(data => {
        if (data.success && data.data && typeof data.data.minPhotos === 'number') {
          setMinPhotos(data.data.minPhotos);
          setPhotoLimitSource(data.data.source);
          console.log(`[FotosModal] minPhotos resuelto: ${data.data.minPhotos} (origen: ${data.data.source})`);
        }
      })
      .catch(err => console.error('[FotosModal] Error al cargar photo-limits:', err));
  }, [open, currentProject?.id, currentZone?.id, sStep, miniStep]);

  useEffect(() => {
    if (open && currentProject?.id) {
      setLoadingPhotos(true);
      const zoneIdParam = currentZone?.id ? `&zoneId=${currentZone.id}` : ''
      fetch(`/api/photo-library?projectId=${currentProject.id}&sStep=${sStep}&miniStep=2${zoneIdParam}`)
        .then(res => res.json())
        .then(data => {
          if (data.success && data.data && data.data.length > 0) {
            const existingPhotos: PhotoItem[] = data.data.map((p: any, idx: number) => ({
              id: `existing_${p.id || idx}_${Math.random().toString(36).slice(2, 8)}`,
              preview: p.photoUrl, // Use the stored URL as preview
              serverUrl: p.photoUrl,
              uploaded: true,
              uploading: false,
              estimatedSize: 0,
              title: p.title || '',
              photoType: p.photoType || 'antes',
              savedToLibrary: true, // Already saved in DB
              dbId: p.id, // v2.47: id real en PhotoLibrary
            }));
            photoCounterRef.current = existingPhotos.length;
            setPhotos(existingPhotos);
            // If step was already completed, mark it
            const antesCount = existingPhotos.filter(p => p.photoType === 'antes').length;
            const despuesCount = existingPhotos.filter(p => p.photoType === 'despues').length;
            if (antesCount >= minPhotos) setIsCompleted(true);
          }
          setLoadingPhotos(false);
        })
        .catch(err => {
          console.error('Error loading existing photos:', err);
          setLoadingPhotos(false);
        });
    }
  }, [open, currentProject?.id, sStep, currentZone?.id]);

  useEffect(() => {
    if (!open) {
      stopStream();
      // Don't clear photos on close — they should persist
      // Only clear transient UI state
      setCameraError(null);
      setCameraMode('idle');
      setActiveTab('camera');
      // v2.48: reset del flag "Añadir más fotos" al cerrar el modal
      setShowAddMore(false);
    }
  }, [open, stopStream]);

  // Lee todos los archivos y los encola. NO procesa aquí (eso saturationa el hilo UI).
  // El procesamiento pesado (compresión + upload) lo hace processQueue secuencialmente.
  const readFileAsDataURL = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    // Captura el snapshot del FileList ANTES de limpiar el input.
    // Si limpiamos antes, el navegador vacía el FileList y Array.from(files) da [].
    const fileArr = Array.from(files);
    if (fileInputRef.current) fileInputRef.current.value = '';
    console.log(`[FotosModal] handleFileSelect: ${fileArr.length} archivo(s) seleccionado(s)`);
    await Promise.all(fileArr.map(f => readFileAsDataURL(f).then(addPhoto).catch(err => console.error('Error leyendo archivo:', err))));
  };

  const handleCameraCapture = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const fileArr = Array.from(files);
    if (cameraInputRef.current) cameraInputRef.current.value = '';
    console.log(`[FotosModal] handleCameraCapture: ${fileArr.length} archivo(s) capturado(s)`);
    await Promise.all(fileArr.map(f => readFileAsDataURL(f).then(addPhoto).catch(err => console.error('Error leyendo archivo de cámara:', err))));
  };

  // v2.47: si la foto ya está guardada en la biblioteca (dbId presente),
  // llamamos al backend DELETE para que el borrado persista. Si el backend
  // devuelve 409 (Paso 2 ya completado), mostramos error y NO quitamos la
  // foto del estado local — así el usuario entiende que no se puede borrar.
  // Si la foto no está en la biblioteca (todavía no se hizo handleSubmit),
  // simplemente la quitamos del estado local.
  const removePhoto = async (index: number) => {
    const photo = photos[index];
    if (!photo) return;
    if (photo.savedToLibrary && photo.dbId) {
      try {
        const res = await fetch(`/api/photo-library?id=${photo.dbId}`, { method: 'DELETE' });
        if (!res.ok) {
          const json = await res.json().catch(() => null);
          toast.error(json?.error || 'No se puede eliminar esta foto.');
          return; // NO la quitamos del estado local
        }
      } catch (e) {
        console.error('Error deleting photo from backend:', e);
        toast.error('Error de conexión al eliminar la foto.');
        return;
      }
    }
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const uploadingCount = photos.filter(p => p.uploading).length;
  const isQueueBusy = queueLength > 0 || uploadingCount > 0;
  const canSubmit = photos.length >= minPhotos && uploadingCount === 0 && queueLength === 0;
  const totalSize = photos.reduce((sum, p) => sum + p.estimatedSize, 0);

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setIsSubmitting(true);
    try {
      const urls = photos.map(p => p.serverUrl || p.preview).join(',');

      // v2.40: Cada foto del Paso 2 se vincula automáticamente a un elemento
      // de inventario "borrador" que el usuario clasificará en el Paso 3.
      // Así la foto está vinculada al registro DESDE EL MOMENTO en que se
      // toma, no después. El flujo en InventarioModal cambia: el usuario ya
      // no necesita vincular manualmente — solo rellenar los datos del
      // elemento (nombre, categoría, decisión, etc.) y al hacerlo el
      // borrador pasa a ser un item clasificado.
      const sName = sStepData?.japaneseName || `S${sStep}`;
      const zoneName = currentZone?.name || 'Zona';
      const userLabel = currentUser?.name || 'Usuario';
      let savedCount = 0;
      let failedCount = 0;

      // Procesamos SECUENCIALMENTE (no en paralelo) porque cada foto necesita
      // el id del item creado en el paso anterior para vincularse.
      // v2.48: trackea el dbId devuelto por el backend para cada foto recién
      // guardada, y actualiza el estado local al final — así, si el usuario
      // re-abre "Añadir más fotos", las fotos ya guardadas no se re-envían.
      const newlySavedDbIds: { localId: string; dbId: string }[] = [];
      for (let idx = 0; idx < photos.length; idx++) {
        const p = photos[idx];
        if (p.savedToLibrary) { savedCount++; continue; }
        const photoUrlForDb = p.serverUrl || p.preview; // base64 fallback si el upload falló
        const photoTitle = p.title || generatePhotoTitle(idx, p.photoType);

        // 1) Guardar en PhotoLibrary
        let photoId: string | null = null;
        try {
          const libRes = await fetch('/api/photo-library', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              sStep,
              miniStep: 2,
              title: photoTitle,
              description: `${sName} - ${zoneName} - Paso 2 Fotos - Subida por ${userLabel}`,
              photoUrl: photoUrlForDb,
              photoType: p.photoType || 'antes',
              category: `paso2_s${sStep}`,
              tags: JSON.stringify([`S${sStep}`, sName, zoneName, `paso2`, p.photoType]),
              projectId: currentProject?.id,
              zoneId: currentZone?.id || null,
              uploadedBy: currentUser?.id || null,
            }),
          });
          const libJson = await libRes.json();
          if (libJson.success && libJson.data?.id) {
            photoId = libJson.data.id;
            newlySavedDbIds.push({ localId: p.id, dbId: photoId });
            savedCount++;
          } else {
            failedCount++;
            console.warn(`[FotosModal] Foto ${idx + 1} no se pudo guardar en la biblioteca`);
            continue;
          }
        } catch (err) {
          failedCount++;
          console.error(`[FotosModal] Error guardando foto ${idx + 1} en biblioteca:`, err);
          continue;
        }

        // 2) Crear elemento de inventario BORRADOR vinculado a esta foto.
        //    El nombre es provisional — el usuario lo reemplazará en el Paso 3.
        //    extra.isDraft = true marca el item como pendiente de clasificar.
        let newItemId: string | null = null;
        try {
          const itemRes = await fetch('/api/inventory', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              sStep,
              projectId: currentProject?.id,
              zoneId: currentZone?.id || null,
              name: DRAFT_NAME_BY_S[sStep]?.(idx + 1) || `Pendiente de clasificar (${idx + 1})`,
              location: null,
              category: '', // API aplicará default según sStep; el usuario lo reescribirá
              quantity: 1,
              photoUrl: photoUrlForDb,
              extra: {
                isDraft: true,
                sourcePhotoId: photoId,
                sourcePhotoUrl: photoUrlForDb,
                sourcePhotoType: p.photoType || 'antes',
                sourcePhotoTitle: photoTitle,
              },
              zonaOrigen: currentZone?.name || null,
            }),
          });
          const itemJson = await itemRes.json();
          if (itemJson.success && itemJson.data?.id) {
            newItemId = itemJson.data.id;
          } else {
            console.warn(`[FotosModal] No se pudo crear el borrador para la foto ${idx + 1}`);
          }
        } catch (err) {
          console.error(`[FotosModal] Error creando borrador para foto ${idx + 1}:`, err);
        }

        // 3) Vincular la foto al nuevo item (inventoryItemId en PhotoLibrary)
        if (photoId && newItemId) {
          try {
            await fetch('/api/photo-library', {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ id: photoId, inventoryItemId: newItemId }),
            });
          } catch (err) {
            console.error(`[FotosModal] Error vinculando foto ${idx + 1} al item ${newItemId}:`, err);
          }
        }

        // v2.60: pedir descripción automática al VLM en background.
        // No bloquea el submit — si falla, la foto ya está guardada con
        // la descripción genérica. Si funciona, actualizamos la descripción
        // en la biblioteca. La descripción se verá al abrir la foto en el
        // lightbox del inventario o en la biblioteca de fotos.
        if (photoId && photoUrlForDb) {
          (async () => {
            try {
              const describeRes = await fetch('/api/photo-describe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ imageUrl: photoUrlForDb, sStep }),
              });
              const describeJson = await describeRes.json();
              if (describeJson.success && describeJson.description) {
                await fetch('/api/photo-library', {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ id: photoId, description: describeJson.description }),
                });
                console.log(`[FotosModal] AI description applied to photo ${idx + 1}:`, describeJson.description);
              }
            } catch (describeErr) {
              console.warn(`[FotosModal] VLM description failed for photo ${idx + 1} (non-blocking):`, describeErr);
            }
          })();
        }
      }

      if (failedCount > 0) console.warn(`[FotosModal] ${failedCount} fotos fallaron al guardar`);
      else if (savedCount > 0) console.log(`[FotosModal] ${savedCount} fotos guardadas y vinculadas a borradores`);

      // Mark all photos as saved in local state. v2.48: también setea el dbId
      // devuelto por el backend para las fotos recién guardadas, de forma que
      // el botón × no aparezca y la próxima vez no se re-envíen.
      setPhotos(prev => prev.map(p => {
        const newlySaved = newlySavedDbIds.find(x => x.localId === p.id);
        return {
          ...p,
          savedToLibrary: true,
          dbId: newlySaved ? newlySaved.dbId : p.dbId,
        };
      }));

      // Save progress
      const res = await fetch(`/api/progress/step?sStep=${sStep}&miniStep=${miniStep}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: true, photoUrls: urls, score: 100, projectId: currentProject?.id, zoneId: currentZone?.id || null }),
      });
      const json = await res.json();
      if (json.success) {
        setIsCompleted(true);
        // v2.48: tras guardar con éxito, volvemos a la pantalla de éxito para
        // que el usuario vea el resumen actualizado con las nuevas fotos.
        setShowAddMore(false);
        stopStream();
        await fetchProgress();
      }
    } catch (error) {
      console.error('Error submitting photos:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAdminSkip = async () => {
    try {
      const res = await fetch(`/api/progress/step?sStep=${sStep}&miniStep=${miniStep}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: true, score: 100, notes: 'Completado por administrador (skip)', skipMissingTemplate: true, projectId: currentProject?.id, zoneId: currentZone?.id || null }),
      });
      const json = await res.json();
      if (json.success) { await fetchProgress(); onClose(); }
    } catch (error) { console.error('Error admin skip:', error); }
  };

  const isMobile = typeof navigator !== 'undefined' && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  return (
    <Dialog open={open} onOpenChange={() => { stopStream(); onClose(); }}>
      <DialogContent size={isFullscreen ? "fullscreen" : "xl"} className="flex flex-col overflow-hidden p-0">
        <DialogHeader className="px-6 pt-6 pb-2 flex-shrink-0">
          <DialogTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5" style={{ color: sStepData?.color }} />
            <span>Fotografías (Antes)</span>
            <Badge variant="outline" style={{ borderColor: sStepData?.color, color: sStepData?.color }}>
              {sStepData?.name}
            </Badge>
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="ml-auto p-1 rounded hover:bg-muted transition-colors"
              title={isFullscreen ? "Reducir ventana" : "Pantalla completa"}
            >
              {isFullscreen ? <Minimize2 className="h-4 w-4 text-muted-foreground" /> : <Maximize2 className="h-4 w-4 text-muted-foreground" />}
            </button>
          </DialogTitle>
        </DialogHeader>

        {canSkipSteps && !isCompleted && (
          <div className="flex items-center gap-2 p-2 mx-6 flex-shrink-0 bg-amber-50 border border-amber-200 rounded-lg">
            <span className="text-xs text-amber-700 font-medium">Modo Admin:</span>
            <Button variant="outline" size="sm" className="text-xs border-amber-300 text-amber-700 hover:bg-amber-100" onClick={handleAdminSkip}>
              Completar paso sin subir fotos
            </Button>
          </div>
        )}

        {/* v2.49: botón visible "Reiniciar paso" — más fácil de encontrar que la × diminuta
            en el círculo del paso. Solo admin con candado abierto y paso completado. */}
        {canSkipSteps && adminFreeNavigation && isCompleted && (
          <div className="flex items-center gap-2 p-2 mx-6 flex-shrink-0 bg-red-50 border border-red-200 rounded-lg">
            <span className="text-xs text-red-700 font-medium">Reiniciar:</span>
            <Button
              variant="outline"
              size="sm"
              className="text-xs border-red-300 text-red-700 hover:bg-red-100"
              onClick={async () => {
                const msg = `¿Reiniciar el Paso 2 (Fotos) y el Paso 3 (Inventario)?\n\nEsto eliminará:\n• El progreso del Paso 2 y del Paso 3\n• Todas las fotos del Paso 2 (${photos.length})\n• Todos los elementos del inventario\n\nPodrás empezar de cero desde el Paso 2.`;
                if (!confirm(msg)) return;
                try {
                  const params = new URLSearchParams({
                    sStep: String(sStep),
                    miniStep: String(miniStep),
                    projectId: currentProject?.id || '',
                    cleanup: 'true',
                  });
                  if (currentZone?.id) params.set('zoneId', currentZone.id);
                  const res = await fetch(`/api/progress/step?${params}`, { method: 'DELETE' });
                  const json = await res.json();
                  if (json.success) {
                    await fetchProgress();
                    setPhotos([]);
                    setIsCompleted(false);
                    setShowAddMore(false);
                    toast.success('Paso 2 y 3 reiniciados. Ya puedes empezar de cero.');
                    onClose();
                  } else {
                    toast.error(json.error || 'Error al reiniciar');
                  }
                } catch (err) {
                  console.error('Reset error:', err);
                  toast.error('Error de conexión al reiniciar');
                }
              }}
            >
              Reiniciar Paso 2 y 3 desde cero
            </Button>
          </div>
        )}

        {isReadOnly && (
          <div className="flex items-center gap-2 p-2 mx-6 flex-shrink-0 bg-blue-50 border border-blue-200 rounded-lg">
            <span className="text-xs text-blue-700 font-medium">Solo lectura: {canSkipSteps ? 'Activa el candado para poder realizar pasos.' : 'Puedes ver pero no modificar.'}</span>
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-6 pb-6 min-h-0">
        {isCompleted && !showAddMore ? (
          <div className="text-center py-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-3" />
            <h3 className="text-xl font-bold mb-2">Fotografías del ANTES Guardadas</h3>
            <p className="text-muted-foreground">Ha guardado {photos.length} fotos como evidencia del estado inicial.</p>
            <p className="text-xs text-muted-foreground mt-2">Tamaño total optimizado: {formatBytes(totalSize)}</p>
            <div className="mt-4 p-4 rounded-lg bg-amber-50 border border-amber-300 text-amber-800 text-left">
              <p className="text-sm font-semibold mb-1">→ Próximo paso: clasificar cada foto en el Inventario (S{sStep} · {sStepData?.japaneseName})</p>
              <p className="text-xs">
                Cada foto que acabas de tomar se ha vinculado automáticamente a un elemento del inventario en estado <strong className="bg-red-500 text-white px-1 rounded">Pendiente</strong>.
                En el siguiente paso verás cada foto ya adjunta a su elemento — solo tienes que rellenar el nombre, la categoría y los campos específicos de este paso (S{sStep}).
                Hasta que no clasifiques todos los elementos, no podrás completar el inventario.
              </p>
            </div>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <Button
                onClick={() => { onClose(); openModal('inventario', 3); }}
                style={{ backgroundColor: sStepData?.color }}
                className="text-white"
              >
                Continuar al Inventario →
              </Button>
              {/* v2.48: permite añadir MÁS fotos aunque el Paso 2 ya esté completado.
                  Útil cuando se necesitan fotos adicionales para pasos 4/5 u otros sitios.
                  Las fotos ya guardadas NO se pueden borrar (backend devuelve 409). */}
              {!isReadOnly && (
                <Button
                  variant="outline"
                  onClick={() => setShowAddMore(true)}
                  className="gap-2"
                  title="Añadir más fotos a este paso sin perder las ya guardadas"
                >
                  <Camera className="h-4 w-4" />
                  Añadir más fotos
                </Button>
              )}
            </div>
            <p className="text-[11px] text-muted-foreground mt-3">
              Las {photos.length} fotos ya guardadas están bloqueadas (no se pueden eliminar) porque el Paso 2 está completado.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-3 rounded-lg border-l-4" style={{ borderColor: sStepData?.color, backgroundColor: `${sStepData?.color}08` }}>
              <p className="text-sm font-medium" style={{ color: sStepData?.color }}>{sStepData?.japaneseName} — {sStepData?.spanishName}</p>
              <p className="text-sm text-muted-foreground mt-1">{beforePrompt}</p>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <span className="text-sm font-medium">Fotos del ANTES</span>
              <div className="flex items-center gap-2">
                <Badge variant={photos.length >= minPhotos ? 'default' : 'secondary'}>{photos.length} / {minPhotos} mínimo</Badge>
                {totalSize > 0 && <span className="text-xs text-muted-foreground">({formatBytes(totalSize)})</span>}
              </div>
            </div>

            <Card>
              <CardContent className="p-4 space-y-4">
                <div className="flex gap-1 p-1 bg-muted rounded-lg">
                  <button className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-all ${activeTab === 'camera' ? 'bg-white shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`} onClick={() => setActiveTab('camera')}>
                    <Camera className="h-4 w-4" />Hacer foto
                  </button>
                  <button className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-all ${activeTab === 'upload' ? 'bg-white shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`} onClick={() => { setActiveTab('upload'); stopStream(); }}>
                    <GalleryHorizontalEnd className="h-4 w-4" />Subir desde galería
                  </button>
                </div>

                {activeTab === 'camera' && (
                  <div className="space-y-3">
                    <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={handleCameraCapture} />
                    {isMobile && cameraMode === 'idle' && (
                      <div className="space-y-3">
                        <button className="w-full border-2 border-dashed rounded-xl p-6 flex flex-col items-center gap-3 hover:border-primary/50 hover:bg-muted/30 transition-colors" onClick={() => cameraInputRef.current?.click()}>
                          <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ backgroundColor: `${sStepData?.color}20` }}><Zap className="h-7 w-7" style={{ color: sStepData?.color }} /></div>
                          <p className="text-sm font-semibold">Abrir cámara del dispositivo</p>
                          <p className="text-xs text-muted-foreground">Toma fotos directamente con la cámara de tu móvil</p>
                        </button>
                        <button className="w-full flex items-center justify-center gap-2 py-2 text-xs text-muted-foreground hover:text-foreground transition-colors" onClick={() => { if (cameraInputRef.current) { cameraInputRef.current.setAttribute('capture', 'user'); cameraInputRef.current.click(); setTimeout(() => { if (cameraInputRef.current) cameraInputRef.current.setAttribute('capture', 'environment'); }, 500); } }}>
                          <SwitchCamera className="h-3 w-3" />Usar cámara frontal
                        </button>
                      </div>
                    )}
                    {!isMobile && (
                      <div className="space-y-3">
                        {cameraMode === 'idle' && (
                          <button className="w-full border-2 border-dashed rounded-xl p-6 flex flex-col items-center gap-3 hover:border-primary/50 hover:bg-muted/30 transition-colors" onClick={startCamera}>
                            <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ backgroundColor: `${sStepData?.color}20` }}><Video className="h-7 w-7" style={{ color: sStepData?.color }} /></div>
                            <p className="text-sm font-semibold">Activar cámara</p>
                            <p className="text-xs text-muted-foreground">Conecta tu cámara para tomar fotos directamente</p>
                          </button>
                        )}
                        {cameraError && <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-sm text-destructive">{cameraError}</div>}
                        {(cameraMode === 'streaming' || cameraMode === 'capturing') && (
                          <div className="relative rounded-xl overflow-hidden bg-black">
                            {captureFlash && <div className="absolute inset-0 bg-white z-20 animate-pulse" />}
                            <video ref={videoRef} className="w-full aspect-video object-cover" playsInline muted style={facingMode === 'user' ? { transform: 'scaleX(-1)' } : {}} />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                              <div className="flex items-center justify-center gap-4">
                                <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center hover:bg-white/30 transition-colors" onClick={switchCamera} title="Cambiar cámara"><SwitchCamera className="h-5 w-5 text-white" /></button>
                                <button className="w-16 h-16 rounded-full border-4 border-white flex items-center justify-center hover:scale-105 active:scale-95 transition-transform" style={{ backgroundColor: sStepData?.color || '#3b82f6' }} onClick={capturePhoto}><div className="w-12 h-12 rounded-full bg-white" /></button>
                                <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center hover:bg-white/30 transition-colors" onClick={stopStream} title="Cerrar cámara"><VideoOff className="h-5 w-5 text-white" /></button>
                              </div>
                            </div>
                            <div className="absolute top-3 left-3 flex items-center gap-2">
                              <div className="flex items-center gap-1.5 bg-red-500/80 backdrop-blur px-2 py-1 rounded-full"><div className="w-2 h-2 bg-white rounded-full animate-pulse" /><span className="text-xs text-white font-medium">EN VIVO</span></div>
                              <span className="text-xs text-white/80 bg-black/40 backdrop-blur px-2 py-1 rounded-full">{facingMode === 'user' ? 'Frontal' : 'Trasera'}</span>
                            </div>
                          </div>
                        )}
                        <canvas ref={canvasRef} className="hidden" />
                        {cameraError && <Button variant="outline" size="sm" onClick={startCamera} className="w-full"><Video className="h-4 w-4 mr-2" />Reintentar conexión con cámara</Button>}
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'upload' && (
                  <div>
                    <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleFileSelect} disabled={isQueueBusy} />
                    <button
                      className={`w-full border-2 border-dashed rounded-xl p-6 flex flex-col items-center gap-3 transition-colors ${isQueueBusy ? 'opacity-60 cursor-not-allowed border-muted' : 'hover:border-primary/50 hover:bg-muted/30'}`}
                      onClick={() => { if (!isQueueBusy) fileInputRef.current?.click(); }}
                      disabled={isQueueBusy}
                    >
                      <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ backgroundColor: `${sStepData?.color}20` }}>
                        {isQueueBusy ? <Loader2 className="h-7 w-7 animate-spin" style={{ color: sStepData?.color }} /> : <Upload className="h-7 w-7" style={{ color: sStepData?.color }} />}
                      </div>
                      <p className="text-sm font-semibold">{isQueueBusy ? 'Procesando fotos...' : 'Seleccionar fotos de la galería'}</p>
                      <p className="text-xs text-muted-foreground">{isQueueBusy ? `${queueLength + uploadingCount} pendiente${(queueLength + uploadingCount) !== 1 ? 's' : ''} en cola` : 'Soporta JPG, PNG, GIF — Se procesan una a una para no saturar el dispositivo'}</p>
                    </button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Photo type selector */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-muted-foreground font-medium">Tipo de foto:</span>
              {[
                { value: 'antes', label: 'ANTES', color: 'bg-red-100 text-red-800 border-red-300' },
                { value: 'despues', label: 'DESPUÉS', color: 'bg-green-100 text-green-800 border-green-300' },
                { value: 'referencia', label: 'Referencia', color: 'bg-blue-100 text-blue-800 border-blue-300' },
                { value: 'hallazgo', label: 'Hallazgo', color: 'bg-amber-100 text-amber-800 border-amber-300' },
              ].map(t => (
                <button key={t.value} onClick={() => setDefaultPhotoType(t.value)}
                  className={`px-2.5 py-1 rounded-full text-[10px] font-semibold border-2 transition-all ${
                    defaultPhotoType === t.value ? t.color + ' shadow-sm scale-105' : 'bg-gray-50 text-gray-400 border-gray-200'
                  }`}>
                  {t.label}
                </button>
              ))}
            </div>

            {photos.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">Fotos capturadas</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{photos.length} foto{photos.length !== 1 ? 's' : ''}</span>
                    {isQueueBusy && <span className="text-xs text-blue-500 flex items-center gap-1"><Loader2 className="h-3 w-3 animate-spin" />{queueLength > 0 ? `${queueLength + uploadingCount} en cola` : `Subiendo ${uploadingCount}...`}</span>}
                  </div>
                </div>
                {isQueueBusy && (
                  <div className="p-2 rounded-lg bg-blue-50 border border-blue-200 flex items-center gap-2">
                    <Loader2 className="h-3.5 w-3.5 animate-spin text-blue-500 shrink-0" />
                    <span className="text-xs text-blue-700">Procesando fotos una a una para evitar bloqueos. Espera a que termine para añadir más.</span>
                  </div>
                )}
                <div className="space-y-2">
                  {photos.map((photo, index) => (
                    <div key={index} className="flex items-start gap-3 p-2 rounded-lg border bg-white group">
                      <div className="w-16 h-16 rounded-lg overflow-hidden border shrink-0">
                        <img src={photo.preview} alt={`Foto ${index + 1}`} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0 space-y-1.5">
                        <div className="flex items-center gap-2">
                          <Badge className={`text-[9px] px-1.5 py-0 ${
                            photo.photoType === 'antes' ? 'bg-red-100 text-red-700' :
                            photo.photoType === 'despues' ? 'bg-green-100 text-green-700' :
                            photo.photoType === 'referencia' ? 'bg-blue-100 text-blue-700' :
                            'bg-amber-100 text-amber-700'
                          }`}>
                            {photo.photoType === 'antes' ? 'ANTES' :
                             photo.photoType === 'despues' ? 'DESPUÉS' :
                             photo.photoType === 'referencia' ? 'REF' : 'HALLAZGO'}
                          </Badge>
                          {photo.uploaded ? <CheckCircle className="h-3.5 w-3.5 text-green-500" /> :
                           photo.uploading ? <Loader2 className="h-3.5 w-3.5 animate-spin text-blue-500" /> :
                           !photo.serverUrl ? <X className="h-3.5 w-3.5 text-red-400" /> : null}
                          <span className="text-[9px] text-muted-foreground">{formatBytes(photo.estimatedSize)}</span>
                        </div>
                        <input
                          type="text"
                          value={photo.title}
                          onChange={e => setPhotos(prev => prev.map((p, i) => i === index ? { ...p, title: e.target.value } : p))}
                          className="w-full text-xs border rounded px-2 py-1 h-7 focus:outline-none focus:ring-1 focus:ring-teal-400"
                          placeholder="Título de la foto..."
                        />
                      </div>
                      {/* v2.48: si la foto ya está guardada en la biblioteca, NO mostramos ×.
                          El backend devolvería 409 (Paso 2 completado) y la UX sería mala.
                          Solo mostramos × en fotos recién capturadas (aún no submitidas). */}
                      {!photo.savedToLibrary && (
                        <button className="shrink-0 w-6 h-6 rounded-full bg-red-50 text-red-400 hover:bg-red-100 hover:text-red-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removePhoto(index)} title="Eliminar foto">
                          <X className="h-3 w-3" />
                        </button>
                      )}
                      {photo.savedToLibrary && (
                        <span className="shrink-0 w-6 h-6 flex items-center justify-center text-green-500" title="Foto guardada (no se puede eliminar)">
                          <CheckCircle className="h-3.5 w-3.5" />
                        </span>
                      )}
                    </div>
                  ))}
                  <button className="w-full py-3 rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center gap-2 hover:border-primary/50 hover:bg-muted/20 transition-colors text-sm text-muted-foreground"
                    onClick={() => { if (isMobile) { cameraInputRef.current?.click(); } else { setActiveTab('camera'); if (cameraMode === 'idle') startCamera(); } }}>
                    <Camera className="h-4 w-4" />
                    <span className="text-xs font-medium">Añadir foto ({defaultPhotoType === 'antes' ? 'ANTES' : defaultPhotoType === 'despues' ? 'DESPUÉS' : defaultPhotoType === 'referencia' ? 'Referencia' : 'Hallazgo'})</span>
                  </button>
                </div>
              </div>
            )}

            {photos.length === 0 && (
              <div className="text-center py-4 text-muted-foreground">
                <ImageIcon className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No hay fotos del ANTES aún</p>
                <p className="text-xs mt-1">Usa la cámara o sube fotos de tu galería</p>
              </div>
            )}

            <div className="text-xs text-muted-foreground space-y-1">
              <p>• Mínimo {minPhotos} fotos del estado ANTES de la zona</p>
              <p>• Incluya diferentes ángulos y perspectivas de la zona</p>
            </div>

            <div className="flex justify-end items-center gap-2">
              {/* v2.48: si estamos en modo "Añadir más fotos" (Paso 2 ya completado),
                  ofrecemos un botón para volver a la pantalla de éxito sin guardar. */}
              {isCompleted && showAddMore && (
                <Button variant="ghost" size="sm" onClick={() => setShowAddMore(false)}>
                  Cancelar
                </Button>
              )}
              <Button onClick={handleSubmit} disabled={!canSubmit || isSubmitting || isReadOnly} style={canSubmit && !isReadOnly ? { backgroundColor: sStepData?.color } : undefined} className="gap-2">
                {isSubmitting
                  ? <><Loader2 className="h-4 w-4 animate-spin" />Guardando...</>
                  : isCompleted && showAddMore
                    ? <><CheckCircle className="h-4 w-4" />Guardar fotos adicionales</>
                    : <><CheckCircle className="h-4 w-4" />Guardar Fotos ANTES ({photos.length} foto{photos.length !== 1 ? 's' : ''})</>}
              </Button>
            </div>
          </div>
        )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
