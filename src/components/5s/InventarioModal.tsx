'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ClipboardList, CheckCircle, Download, Upload, FileSpreadsheet, BookOpen, ArrowRight, AlertTriangle, FileUp, Maximize2, Minimize2, File, PenTool, Eye, Loader2, MapPin, Tag, Camera, ZoomIn } from 'lucide-react';
import { toast } from 'sonner';
import { use5SStore } from '@/lib/store';
import { S_STEPS, INVENTORY_CONFIGS, INVENTORY_CLASSIFY_THRESHOLD, DRAFT_NAME_BY_S, DRAFT_INSTRUCTIONS_BY_S } from '@/lib/5s-constants';
import type { InventoryConfig } from '@/lib/5s-constants';
import LayoutEditor from '@/components/5s/LayoutEditor';
import ColorCodeTable from '@/components/5s/ColorCodeTable';
import TagPrinter from '@/components/5s/TagPrinter';
import CleaningPlanPanel from '@/components/5s/CleaningPlanPanel';
import BibliotecaEstandaresView from '@/components/5s/BibliotecaEstandaresView';
import {
  compressImage,
  generatePhotoFilename,
  base64toFile,
} from '@/lib/image-utils';

// v2.50: Decision helpers — 'Retirar' (→Jaula) replaces 'Jaula'; 'Eliminar' absorbs 'Tirar'.
// Backward compat: legacy DB rows may still carry decision='Jaula' or 'Tirar'.
const isJaulaDecision = (d?: string | null) =>
  !d || d === 'Retirar' || d === 'Jaula';
const isEliminarDecision = (d?: string | null) =>
  d === 'Eliminar' || d === 'Tirar';
const displayDecision = (d?: string | null): string => {
  if (!d || d === 'Retirar' || d === 'Jaula') return 'Retirar';
  if (d === 'Tirar') return 'Eliminar';
  return d;
};

interface InventoryItemData {
  id?: string;
  name: string;
  location: string;
  category: string;
  quantity: number;
  quantityNeeded: number;
  quantityUnneeded: number;
  price: number | null;
  action: string;
  extra?: Record<string, string | number>;
  jaulaStatus?: string;
  jaulaFechaEntrada?: string | null;
  jaulaOrigen?: string | null;
  jaulaFechaSalida?: string | null;
  jaulaDestino?: string | null;
  zonaOrigen?: string | null;
  zonaDestino?: string | null;
  photos?: PhotoData[];
}

interface PhotoData {
  id: string;
  title: string;
  description?: string | null;
  photoUrl: string;
  photoType: string; // "antes", "despues", "referencia", "hallazgo", "mejora"
  category: string;
  inventoryItemId?: string | null;
  miniStep: number;
  sStep: number;
  createdAt: string;
}

interface InventarioModalProps {
  open: boolean;
  onClose: () => void;
  sStep: number;
  miniStep: number;
}

export default function InventarioModal({ open, onClose, sStep, miniStep }: InventarioModalProps) {
  const { fetchProgress, currentUser, adminFreeNavigation, currentProject, currentZone, canPerform, canView, hasPermission, openModal } = use5SStore();
  const sStepData = S_STEPS.find(s => s.id === sStep);
  const defaultConfig: InventoryConfig = INVENTORY_CONFIGS[sStep] || INVENTORY_CONFIGS[1];
  const [customConfig, setCustomConfig] = useState<InventoryConfig | null>(null);
  const [hasTemplate, setHasTemplate] = useState<boolean | null>(null); // null = loading, false = no template, true = has template
  const config: InventoryConfig = customConfig || defaultConfig;
  const canSkipSteps = hasPermission('skip_steps');
  const canPerformStep = canPerform(sStep, miniStep);
  const canViewStep = canView(sStep, miniStep);
  // Permission-driven: read-only if no execute perm OR if candado closed for skip_steps users
  const isReadOnly = !canPerformStep || (canSkipSteps && !adminFreeNavigation);
  // v2.39: hide bulk import/export controls from empleado & auditor (only gestor/admin/gerente/responsable see them)
  const canManageBulk = ['gestor', 'admin', 'gerente', 'responsable'].includes(currentUser?.role || '');

  const [items, setItems] = useState<InventoryItemData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  const [csvPreview, setCsvPreview] = useState<InventoryItemData[] | null>(null);
  const [isImporting, setIsImporting] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(true);
  const [showLayoutEditor, setShowLayoutEditor] = useState(false);
  const [showColorCodeTable, setShowColorCodeTable] = useState(false);
  const [savedLayouts, setSavedLayouts] = useState<{ id: string; title: string; photoUrl: string | null; createdAt: string }[]>([]);
  const [layoutUploaded, setLayoutUploaded] = useState(false);

  // Photo attachment state
  const [itemPhotos, setItemPhotos] = useState<Record<string, PhotoData[]>>({});
  const [step2Photos, setStep2Photos] = useState<PhotoData[]>([]);
  const [uploadingPhotoForItem, setUploadingPhotoForItem] = useState<string | null>(null);
  const [uploadPhotoType, setUploadPhotoType] = useState<string>('antes');
  const [showPhotoLightbox, setShowPhotoLightbox] = useState<PhotoData | null>(null);
  // v2.44: eliminados pendingNewPhoto y pendingNewPhotoType — las fotos
  // se vinculan automáticamente desde el Paso 2 (FotosModal.handleSubmit).
  // v2.42: guard contra re-entrancia en la migración de fotos huérfanas.
  // Impide que loadStep2Photos → migrateOrphanPhotos → loadStep2Photos
  // se vuelva a disparar mientras la migración está en curso.
  const isMigratingRef = useRef(false);

  // v2.45: eliminado el state `newItem` y el form "Add item" — los items
  // ahora se crean automáticamente como borradores al tomar fotos en el
  // Paso 2 (FotosModal.handleSubmit). El usuario edita los borradores
  // directamente en la tabla inferior.

  useEffect(() => {
    if (open) {
      // Load config/template FIRST — importTemplateItems will call loadInventory internally
      // after saving template items to DB, so items get proper IDs and are editable.
      // We do NOT call loadInventory() separately here to avoid race conditions.
      loadCustomInventoryConfig().then(() => {
        // loadCustomInventoryConfig may or may not have called loadInventory via importTemplateItems.
        // If no template items were found, loadInventory wasn't called, so load it now.
        // We check by seeing if items are still empty after config load.
        setItems(prev => {
          if (prev.length === 0) {
            loadInventory();
          }
          return prev;
        });
      });
      // Load layouts for any S step that has layout support (S2 primarily, also S3/S4 for estandares)
      if (sStep === 2 || sStep === 3 || sStep === 4) loadLayouts();
      // Load Step 2 photos for this zone/project
      loadStep2Photos();
    }
  }, [open, sStep]);

  // Helper: import template items into the database so they get real IDs and become editable
  const importTemplateItems = async (templateItems: any[]) => {
    if (!currentProject?.id || !templateItems.length) return;
    try {
      // Check if items already exist in DB for this step/project/zone — avoid duplicates
      const existingRes = await fetch(`/api/inventory?sStep=${sStep}&projectId=${currentProject.id}${currentZone?.id ? `&zoneId=${currentZone.id}` : ''}`);
      const existingJson = await existingRes.json();
      const existingNames = new Set(
        (existingJson.success ? existingJson.data : []).map((i: any) => i.name?.trim().toLowerCase())
      );

      // Only import items that don't already exist in the DB
      const itemsToCreate = templateItems.filter(
        (item: any) => item.name && !existingNames.has(item.name.trim().toLowerCase())
      );

      if (itemsToCreate.length === 0) {
        // All items already in DB — just reload from API to get proper IDs
        await loadInventory();
        return;
      }

      // Create each item via POST so they get database IDs
      for (const item of itemsToCreate) {
        const isInnecesario = sStep === 1 && item.category === 'innecesario';
        const isNecesario = sStep === 1 && item.category === 'necesario';
        const qty = item.quantity || 1;
        const extra = { ...(item.extra || {}) };
        if (sStep === 1 && isInnecesario && !extra.decision) {
          extra.decision = 'Retirar'; // v2.50: was 'Jaula'
        }

        await fetch('/api/inventory', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sStep,
            projectId: currentProject.id,
            zoneId: currentZone?.id || null,
            name: item.name,
            location: item.location || '',
            category: item.category || '',
            quantity: qty,
            quantityNeeded: isNecesario ? qty : (item.quantityNeeded || 0),
            quantityUnneeded: isInnecesario ? qty : (item.quantityUnneeded || 0),
            price: item.price ?? null,
            action: item.action || (isInnecesario ? (extra.decision || 'Retirar') : ''),
            extra,
            jaulaStatus: isInnecesario && isJaulaDecision(extra.decision) ? 'en_jaula' : '',
            jaulaFechaEntrada: isInnecesario && isJaulaDecision(extra.decision) ? new Date().toISOString() : null,
            jaulaOrigen: isInnecesario ? (currentZone?.name || currentProject.name || '') : null,
            zonaOrigen: currentZone?.name || null,
            zonaDestino: isInnecesario ? (isEliminarDecision(extra.decision) ? 'Residuo' : 'Jaula') : null,
          }),
        });
      }

      // Now reload from API — items will have real database IDs and be fully editable
      await loadInventory();
    } catch (e) {
      console.error('Error importing template items:', e);
      // Fallback: just reload from API
      await loadInventory();
    }
  };

  // Helper: parse template content and apply it, falling back to INVENTORY_CONFIGS if empty
  const applyTemplateContent = async (content: any) => {
    const hasCategories = Array.isArray(content.categories) && content.categories.length > 0;
    const hasExtraFields = Array.isArray(content.extraFields) && content.extraFields.length > 0;
    const hasItems = Array.isArray(content.items) && content.items.length > 0;

    if (hasCategories || hasExtraFields) {
      // Template has real structure — use it (fill missing parts from defaults)
      setCustomConfig({
        title: content.title || defaultConfig.title,
        subtitle: content.subtitle || defaultConfig.subtitle,
        templateName: content.templateName || defaultConfig.templateName,
        categories: hasCategories ? content.categories : defaultConfig.categories,
        extraFields: hasExtraFields ? content.extraFields : defaultConfig.extraFields,
        ...(content.desplegables_jerarquicos ? { desplegables_jerarquicos: content.desplegables_jerarquicos } : {}),
      });
      setHasTemplate(true);
      // Auto-import template items into DB so they get IDs and become editable
      if (hasItems) {
        await importTemplateItems(content.items);
      }
    } else if (hasItems) {
      // Legacy format: only items, no structure — use default config
      setCustomConfig(null);
      setHasTemplate(true);
      await importTemplateItems(content.items);
    } else {
      // Empty or unknown format — fall back to INVENTORY_CONFIGS defaults
      setCustomConfig(null);
      setHasTemplate(true);
    }
  };

  const loadCustomInventoryConfig = async () => {
    try {
      // If the zone has a board config, fetch inventory template from that config
      if (currentZone?.boardConfigId) {
        const slotsRes = await fetch(`/api/board-slots?boardConfigId=${currentZone.boardConfigId}&sStep=${sStep}&miniStep=3`);
        const slotsJson = await slotsRes.json();
        if (slotsJson.success && slotsJson.data.length > 0) {
          const slot = slotsJson.data[0];
          const inventarioTemplates = (slot.templates || []).filter(
            (t: any) => t.template?.type === 'inventario'
          );
          if (inventarioTemplates.length > 0) {
            const content = JSON.parse(inventarioTemplates[0].template.content);
            await applyTemplateContent(content);
          } else {
            // No inventario template assigned in this board slot — use default config
            setCustomConfig(null);
            setHasTemplate(true);
          }
        } else {
          // No slot configured for this step — use default config
          setCustomConfig(null);
          setHasTemplate(true);
        }
      } else {
        // Fallback: load global template
        const res = await fetch(`/api/templates?type=inventario&sStep=${sStep}&miniStep=3`);
        const json = await res.json();
        if (json.success && json.data && json.data.length > 0) {
          const content = JSON.parse(json.data[0].content);
          await applyTemplateContent(content);
        } else {
          // No global template — use default config (INVENTORY_CONFIGS has entries for all 5 S steps)
          setCustomConfig(null);
          setHasTemplate(true);
        }
      }
    } catch (e) {
      console.error('Error loading custom inventory config:', e);
      // On error, use default config so the modal still works
      setCustomConfig(null);
      setHasTemplate(true);
    }
  };

  const loadLayouts = async () => {
    if (!currentProject) return
    try {
      const params = new URLSearchParams({ projectId: currentProject.id, category: 'layout', sStep: String(sStep) })
      if (currentZone?.id) params.set('zoneId', currentZone.id)
      const res = await fetch(`/api/standards?${params}`)
      const json = await res.json()
      if (json.success) {
        setSavedLayouts(json.data.map((s: any) => ({
          id: s.id,
          title: s.title,
          photoUrl: s.photoUrl,
          createdAt: s.createdAt,
        })))
        setLayoutUploaded(json.data.length > 0)
      }
    } catch (e) {
      console.error('Error loading layouts:', e)
    }
  }

  const handleUploadLayoutImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !currentProject) return
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('projectId', currentProject.id)
      formData.append('filename', `${currentProject.id}_layout_${sStep}_${Date.now()}.png`)
      console.log('[InventarioModal] Uploading layout image:', file.name, 'size:', (file.size / 1024).toFixed(1) + 'KB')
      const res = await fetch('/api/upload', { method: 'POST', body: formData })
      if (!res.ok) {
        console.error('[InventarioModal] Upload HTTP error:', res.status)
        toast.error(`Error al subir imagen (HTTP ${res.status})`)
        e.target.value = ''
        return
      }
      const json = await res.json()
      if (json.success && json.url) {
        const layoutDescriptions: Record<number, string> = {
          2: 'Layout subido como imagen con marcado de suelo según estándar de colores',
          3: 'Layout subido como imagen con puntos de suciedad y zonas de limpieza',
          4: 'Layout subido como imagen con estándares implantados señalados',
        }
        // Save as a layout standard
        const standardPayload = {
          sStep,
          title: `Layout ${currentZone?.name || 'zona'} ${sStepData?.japaneseName || ''} (subido)`,
          description: layoutDescriptions[sStep] || 'Layout subido como imagen',
          category: 'layout',
          photoUrl: json.url,
          status: 'activo',
          version: 1,
          projectId: currentProject.id,
          zoneId: currentZone?.id || null,
        }
        console.log('[InventarioModal] Saving layout standard:', {
          sStep, category: 'layout', hasPhotoUrl: true,
          projectId: currentProject.id, zoneId: currentZone?.id,
        })
        const saveRes = await fetch('/api/standards', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(standardPayload),
        })
        if (!saveRes.ok) {
          console.error('[InventarioModal] Standards API HTTP error:', saveRes.status)
          toast.error(`Error al guardar estándar (HTTP ${saveRes.status})`)
          e.target.value = ''
          return
        }
        const saveJson = await saveRes.json()
        if (saveJson.success) {
          toast.success('Layout subido y guardado en Biblioteca de Estándares')
          await loadLayouts()
        } else {
          console.error('[InventarioModal] Standards API error:', saveJson.error)
          toast.error(`Error al guardar estándar: ${saveJson.error || 'Error desconocido'}`)
        }
      } else {
        console.error('[InventarioModal] Upload failed:', json.error)
        toast.error(`Error al subir imagen: ${json.error || 'Error desconocido'}`)
      }
    } catch (e) {
      console.error('[InventarioModal] Upload error:', e)
      toast.error('Error al subir la imagen del layout')
    }
    e.target.value = ''
  }

  const loadInventory = async () => {
    setIsLoading(true);
    try {
      const projectIdParam = currentProject?.id ? `&projectId=${currentProject.id}` : '';
      const zoneIdParam = currentZone?.id ? `&zoneId=${currentZone.id}` : '';
      const res = await fetch(`/api/inventory?sStep=${sStep}${projectIdParam}${zoneIdParam}`);
      const json = await res.json();
      if (json.success) {
        const photosMap: Record<string, PhotoData[]> = {};
        const mappedItems = json.data.map((item: any) => {
          // Map photos from the relation
          const itemPhotosList: PhotoData[] = (item.photos || []).map((p: any) => ({
            id: p.id,
            title: p.title,
            description: p.description,
            photoUrl: p.photoUrl,
            photoType: p.photoType,
            category: p.category,
            inventoryItemId: p.inventoryItemId,
            miniStep: p.miniStep,
            sStep: p.sStep,
            createdAt: p.createdAt,
          }));
          if (item.id && itemPhotosList.length > 0) {
            photosMap[item.id] = itemPhotosList;
          }
          return {
            id: item.id,
            name: item.name,
            location: item.location || '',
            category: item.category || '',
            quantity: item.quantity || 1,
            // S1: Set quantities based on category (innecesario or necesario)
            quantityNeeded: sStep === 1
              ? (item.category === 'necesario' ? (item.quantityNeeded || item.quantity || 1) : 0)
              : (item.quantityNeeded || 0),
            quantityUnneeded: sStep === 1
              ? (item.category === 'innecesario' ? (item.quantityUnneeded || item.quantity || 1) : 0)
              : (item.quantityUnneeded || 0),
            price: item.price ?? null,
            action: item.action || '',
            extra: typeof item.extra === 'string' ? JSON.parse(item.extra) : (item.extra || {}),
            jaulaStatus: item.jaulaStatus || '',
            jaulaFechaEntrada: item.jaulaFechaEntrada || null,
            jaulaOrigen: item.jaulaOrigen || null,
            jaulaFechaSalida: item.jaulaFechaSalida || null,
            jaulaDestino: item.jaulaDestino || null,
            zonaOrigen: item.zonaOrigen || null,
            zonaDestino: item.zonaDestino || null,
            photos: itemPhotosList,
          };
        });
        setItems(mappedItems);
        setItemPhotos(photosMap);
      } else {
        console.error('Error loading inventory:', json.error);
      }
    } catch (error) {
      console.error('Error loading inventory:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // ─── Photo functions ───

  const loadStep2Photos = async () => {
    if (!currentProject?.id) return;
    try {
      const params = new URLSearchParams({
        projectId: currentProject.id,
        sStep: String(sStep),
        miniStep: '2',
      });
      if (currentZone?.id) params.set('zoneId', currentZone.id);
      const res = await fetch(`/api/photo-library?${params}`);
      const json = await res.json();
      if (json.success) {
        // v2.42: solo nos interesan las fotos HUÉRFANAS (sin inventoryItemId).
        // Las que ya están vinculadas a un item NO deben aparecer en el card
        // "pendientes de clasificar" ni contar en unclassifiedPhotosCount,
        // porque su item correspondiente ya existe (creado automáticamente
        // en FotosModal.handleSubmit o migrado por migrateOrphanPhotos).
        const orphans = (json.data || []).filter((p: any) => !p.inventoryItemId);
        setStep2Photos(orphans.map((p: any) => ({
          id: p.id,
          title: p.title,
          description: p.description,
          photoUrl: p.photoUrl,
          photoType: p.photoType,
          category: p.category,
          inventoryItemId: p.inventoryItemId,
          miniStep: p.miniStep,
          sStep: p.sStep,
          createdAt: p.createdAt,
        })));

        // v2.42: migración automática de fotos huérfanas (pre-v2.40).
        // Si hay fotos del Paso 2 sin inventoryItemId, les creamos un
        // borrador de inventario y los vinculamos, igual que hace
        // FotosModal.handleSubmit para fotos nuevas. Así el usuario no
        // tiene que vincular manualmente — el flujo es consistente
        // tanto para fotos nuevas como para fotos antiguas.
        if (orphans.length > 0 && !isMigratingRef.current) {
          isMigratingRef.current = true;
          try {
            await migrateOrphanPhotos(orphans);
          } finally {
            isMigratingRef.current = false;
          }
        }
      }
    } catch (e) {
      console.error('Error loading Step 2 photos:', e);
    }
  };

  // v2.42: crea un borrador de inventario por cada foto huérfana del Paso 2
  // y vincula la foto al nuevo item. Después recarga items para que los
  // borradores aparezcan en la tabla con badge "Pendiente".
  const migrateOrphanPhotos = async (orphans: any[]) => {
    if (!currentProject?.id || orphans.length === 0) return;
    console.log(`[InventarioModal] Migrando ${orphans.length} foto(s) huérfana(s) del Paso 2 a borradores`);
    let migrated = 0;
    for (let idx = 0; idx < orphans.length; idx++) {
      const photo = orphans[idx];
      try {
        // 1) Crear item borrador
        const itemRes = await fetch('/api/inventory', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sStep,
            projectId: currentProject.id,
            zoneId: currentZone?.id || null,
            name: DRAFT_NAME_BY_S[sStep]?.(idx + 1) || `Pendiente de clasificar (${idx + 1})`,
            location: null,
            category: '',
            quantity: 1,
            photoUrl: photo.photoUrl,
            extra: {
              isDraft: true,
              sourcePhotoId: photo.id,
              sourcePhotoUrl: photo.photoUrl,
              sourcePhotoType: photo.photoType || 'antes',
              sourcePhotoTitle: photo.title || '',
            },
            zonaOrigen: currentZone?.name || null,
          }),
        });
        const itemJson = await itemRes.json();
        if (!itemJson.success || !itemJson.data?.id) {
          console.warn(`[InventarioModal] No se pudo crear borrador para foto ${idx + 1}`);
          continue;
        }
        const newItemId = itemJson.data.id;

        // 2) Vincular la foto al nuevo item
        await fetch('/api/photo-library', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: photo.id, inventoryItemId: newItemId }),
        });
        migrated++;
      } catch (err) {
        console.error(`[InventarioModal] Error migrando foto ${idx + 1}:`, err);
      }
    }

    if (migrated > 0) {
      console.log(`[InventarioModal] ${migrated} foto(s) migrada(s) a borradores`);
      // Recargar items para que aparezcan los borradores nuevos, y recargar
      // step2Photos (ahora debería estar vacío porque todas tienen inventoryItemId).
      await loadInventory();
      // Recargar step2Photos: como acabamos de vincular todas, debería
      // devolver array vacío. Usamos setTimeout(0) para evitar race con
      // el setItems de loadInventory.
      setTimeout(() => loadStep2Photos(), 0);
    }
  };

  const handleAttachPhoto = async (itemId: string, file: File, photoType: string) => {
    if (!currentProject?.id) {
      toast.error('No hay proyecto seleccionado');
      return;
    }
    setUploadingPhotoForItem(itemId);
    try {
      // Read and compress the image
      const reader = new FileReader();
      const base64Promise = new Promise<string>((resolve) => {
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });
      const rawBase64 = await base64Promise;
      const compressed = await compressImage(rawBase64);

      // Upload to server
      const filename = generatePhotoFilename(currentProject.id, sStep, miniStep, Date.now());
      const uploadFile = base64toFile(compressed, filename);
      const formData = new FormData();
      formData.append('file', uploadFile);
      formData.append('filename', filename);
      formData.append('projectId', currentProject.id);

      const uploadRes = await fetch('/api/upload', { method: 'POST', body: formData });
      const uploadJson = await uploadRes.json();

      if (!uploadJson.success || !uploadJson.url) {
        toast.error(`Error al subir foto: ${uploadJson.error || 'Error desconocido'}`);
        return;
      }

      // Save to PhotoLibrary with inventoryItemId
      const sName = sStepData?.japaneseName || `S${sStep}`;
      const zoneName = currentZone?.name || 'Zona';
      const typeLabel = photoType === 'antes' ? 'ANTES' : photoType === 'despues' ? 'DESPUÉS' : 'Referencia';
      const date = new Date().toLocaleDateString('es-ES');
      const item = items.find(i => i.id === itemId);
      const itemLabel = item?.name || 'Elemento';

      const photoRes = await fetch('/api/photo-library', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sStep,
          miniStep,
          title: `S${sStep} ${sName} - ${zoneName} - ${itemLabel} - ${typeLabel} (${date})`,
          description: `Foto adjunta al elemento de inventario: ${itemLabel}`,
          photoUrl: uploadJson.url,
          photoType,
          category: `inventario_s${sStep}`,
          tags: JSON.stringify([`S${sStep}`, sName, zoneName, `inventario`, photoType, itemLabel]),
          projectId: currentProject.id,
          zoneId: currentZone?.id || null,
          uploadedBy: currentUser?.id || null,
          inventoryItemId: itemId,
        }),
      });

      const photoJson = await photoRes.json();
      if (photoJson.success) {
        const newPhoto: PhotoData = {
          id: photoJson.data.id,
          title: photoJson.data.title,
          description: photoJson.data.description,
          photoUrl: photoJson.data.photoUrl,
          photoType: photoJson.data.photoType,
          category: photoJson.data.category,
          inventoryItemId: itemId,
          miniStep: photoJson.data.miniStep,
          sStep: photoJson.data.sStep,
          createdAt: photoJson.data.createdAt,
        };
        // Update local state
        setItemPhotos(prev => ({
          ...prev,
          [itemId]: [...(prev[itemId] || []), newPhoto],
        }));
        setItems(prev => prev.map(it => it.id === itemId
          ? { ...it, photos: [...(it.photos || []), newPhoto] }
          : it
        ));
        toast.success('Foto adjuntada correctamente');
      } else {
        toast.error(`Error al guardar foto: ${photoJson.error || 'Error desconocido'}`);
      }
    } catch (e) {
      console.error('Error attaching photo:', e);
      toast.error('Error al adjuntar la foto');
    } finally {
      setUploadingPhotoForItem(null);
    }
  };

  const handleDeletePhoto = async (photoId: string, itemId: string) => {
    // v2.46: las fotos del Paso 2 (miniStep=2) están bloqueadas una vez
    // completado el Paso 2 — no se pueden borrar desde el Inventario.
    const photo = (itemPhotos[itemId] || []).find(p => p.id === photoId)
      || (items.find(i => i.id === itemId)?.photos || []).find(p => p.id === photoId);
    if (photo && (photo as any).miniStep === 2 && miniStep >= 3) {
      toast.error('Esta foto se tomó en el Paso 2 y no se puede eliminar. Es obligatoria para completar el inventario.');
      return;
    }
    try {
      const res = await fetch(`/api/photo-library?id=${photoId}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.success) {
        setItemPhotos(prev => ({
          ...prev,
          [itemId]: (prev[itemId] || []).filter(p => p.id !== photoId),
        }));
        setItems(prev => prev.map(it => it.id === itemId
          ? { ...it, photos: (it.photos || []).filter(p => p.id !== photoId) }
          : it
        ));
        toast.success('Foto eliminada');
      } else {
        toast.error(`Error al eliminar foto: ${json.error || 'Error desconocido'}`);
      }
    } catch (e) {
      console.error('Error deleting photo:', e);
      toast.error('Error al eliminar la foto');
    }
  };

  // v2.45: eliminado handleAddItem — el form "Add item" ya no existe.
  // Los items se crean automáticamente desde FotosModal.handleSubmit
  // al tomar fotos en el Paso 2. Para añadir manualmente un item,
  // el usuario puede usar "Importar Plantilla" o "Importar Archivo".

  const handleImportTemplate = async () => {
    if (!currentProject?.id) {
      toast.error('No hay proyecto seleccionado.');
      return;
    }
    try {
      let templateItems: any[] = [];

      if (currentZone?.boardConfigId) {
        // Fetch from board config
        const slotsRes = await fetch(`/api/board-slots?boardConfigId=${currentZone.boardConfigId}&sStep=${sStep}&miniStep=3`);
        const slotsJson = await slotsRes.json();
        if (slotsJson.success && slotsJson.data.length > 0) {
          const slot = slotsJson.data[0];
          const inventarioTemplates = (slot.templates || []).filter(
            (t: any) => t.template?.type === 'inventario'
          );
          if (inventarioTemplates.length > 0) {
            const content = JSON.parse(inventarioTemplates[0].template.content);
            templateItems = content.items || [];
          }
        }
      } else {
        // Fallback: global template
        const res = await fetch(`/api/templates?type=inventario&sStep=${sStep}`);
        const json = await res.json();
        if (json.success && json.data.length > 0) {
          const content = JSON.parse(json.data[0].content);
          templateItems = content.items || [];
        }
      }

      if (templateItems.length === 0) {
        toast.info('Esta plantilla define el formato (categorías y campos) pero no contiene elementos predefinidos. Agrega elementos manualmente con el botón "Agregar".');
        return;
      }

      // Use importTemplateItems to save items to DB and reload with proper IDs
      await importTemplateItems(templateItems);
      toast.success('Elementos de plantilla importados correctamente');
    } catch (error) {
      console.error('Error importing template:', error);
      toast.error('Error de conexión al importar plantilla');
    }
  };

  // Unified file import: supports both .csv and .xlsx files
  const handleFileImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const fileName = file.name.toLowerCase();
      let dataRows: string[][] = [];
      let headerRow: string[] = [];

      if (fileName.endsWith('.xlsx') || fileName.endsWith('.xls')) {
        // Parse Excel file using xlsx library
        const XLSX = await import('xlsx');
        const arrayBuffer = await file.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });
        const sheetName = workbook.SheetNames[0]; // Use first sheet
        const sheet = workbook.Sheets[sheetName];
        const rawData: string[][] = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '' });
        
        if (rawData.length < 2) {
          toast.error('El archivo está vacío o no tiene datos');
          e.target.value = '';
          return;
        }

        // Find the header row: look for a row that contains MULTIPLE keywords
        // (not just one — subtitle rows like "Identificar y eliminar los elementos innecesarios"
        // contain "elemento" but are NOT header rows)
        let headerIdx = 0;
        let bestScore = 0;
        const HEADER_KEYWORDS = ['elemento', 'nombre', 'nº', 'punto', 'ubicación', 'zona', 'cantidad', 'precio', 'estado', 'frecuencia', 'decisión', 'responsable', 'observaciones', 'categoría'];
        for (let i = 0; i < Math.min(10, rawData.length); i++) {
          const rowStr = rawData[i].map(c => String(c).toLowerCase()).join('|');
          // Count how many header keywords match AND how many non-empty cells exist
          const keywordScore = HEADER_KEYWORDS.filter(kw => rowStr.includes(kw)).length;
          const nonEmptyCells = rawData[i].filter(c => String(c).trim() !== '').length;
          // Header rows have MANY keyword matches AND many non-empty short-label cells
          // Subtitle rows have few keywords (just 1-2) and few cells
          const combinedScore = keywordScore * 2 + (nonEmptyCells >= 3 ? nonEmptyCells : 0);
          if (combinedScore > bestScore) {
            bestScore = combinedScore;
            headerIdx = i;
          }
        }
        headerRow = rawData[headerIdx].map((h: any) => String(h).trim().toLowerCase());
        dataRows = rawData.slice(headerIdx + 1).filter(row => {
          // Count non-empty, non-numeric-only cells
          const meaningfulCells = row.filter(cell => {
            const v = String(cell).trim();
            return v !== '' && v !== '0';
          });
          // A row with data must have at least 1 meaningful cell that isn't just a row number
          // (a row with just "1" is a template placeholder; a row with "Cartón viejo" is real data)
          if (meaningfulCells.length === 0) return false;
          // If only 1 meaningful cell and it's a number (row index), skip it
          if (meaningfulCells.length === 1 && /^\d+$/.test(String(meaningfulCells[0]).trim())) return false;
          // Skip footer rows like "TOTAL ELEMENTOS", "Notas:", etc.
          const firstMeaningful = meaningfulCells[0].toLowerCase();
          if (firstMeaningful.includes('total') || firstMeaningful.includes('notas') || firstMeaningful.includes('clasificación') || firstMeaningful.includes('empresa:') || firstMeaningful.includes('proyecto:') || firstMeaningful.includes('zona:')) return false;
          return true;
        });

      } else if (fileName.endsWith('.csv')) {
        // Parse CSV file
        const text = await file.text();
        const lines = text.split('\n').filter(l => l.trim());
        if (lines.length < 2) {
          toast.error('El archivo CSV está vacío o no tiene datos');
          e.target.value = '';
          return;
        }
        headerRow = lines[0].split(',').map(h => h.trim().toLowerCase().replace(/^\uFEFF/, '')); // Remove BOM
        dataRows = lines.slice(1).filter(l => l.trim()).map(l => l.split(',').map(v => v.trim()));
      } else {
        toast.error('Formato no soportado. Usa .xlsx o .csv');
        e.target.value = '';
        return;
      }

      // Flexible column mapping: map various header names to standard fields
      const findCol = (headers: string[], ...names: string[]): number => {
        for (const name of names) {
          const idx = headers.findIndex(h => h.includes(name));
          if (idx >= 0) return idx;
        }
        return -1;
      };

      const colMap = {
        name: findCol(headerRow, 'elemento', 'nombre', 'punto', 'estándar', 'práctica', 'estandar', 'practica'),
        location: findCol(headerRow, 'ubicación', 'ubicacion', 'ámbito', 'ambito', 'proceso'),
        zona: findCol(headerRow, 'zona', 'zona origen'),
        category: findCol(headerRow, 'categoría', 'categoria', 'clasificación', 'clasificacion', 'tipo'),
        quantity: findCol(headerRow, 'cantidad', 'total exist', 'total'),
        quantityNeeded: findCol(headerRow, 'necesarios', 'nec.'),
        quantityUnneeded: findCol(headerRow, 'innecesarios', 'innec.'),
        price: findCol(headerRow, 'precio'),
        action: findCol(headerRow, 'acción', 'accion', 'decisión', 'decision', 'método', 'metodo'),
        estado: findCol(headerRow, 'estado'),
        frecuenciaUso: findCol(headerRow, 'frecuencia'),
        nivel: findCol(headerRow, 'nivel'),
        fuente: findCol(headerRow, 'fuente'),
        cercania: findCol(headerRow, 'cercanía', 'cercania'),
        documentado: findCol(headerRow, 'documentado'),
        cumplimiento: findCol(headerRow, 'cumplimiento'),
        ubicacionAsignada: findCol(headerRow, 'ubicación asignada', 'asignada'),
        metodoIdentificacion: findCol(headerRow, 'método identificación', 'identificación', 'identificacion'),
        frecuenciaLimpieza: findCol(headerRow, 'frecuencia limpieza'),
        metodoLimpieza: findCol(headerRow, 'método limpieza'),
        responsable: findCol(headerRow, 'responsable'),
        observaciones: findCol(headerRow, 'observaciones', 'observacion'),
      };

      const parsedItems: InventoryItemData[] = [];
      for (const values of dataRows) {
        const strValues = values.map(v => String(v).trim());
        // Skip rows that are just a number (empty data rows from template)
        if (strValues.length < 2) continue;
        const nonEmptyCount = strValues.filter(v => v !== '' && v !== '0').length;
        if (nonEmptyCount < 1) continue;

        const getVal = (idx: number, fallback?: string) => idx >= 0 && idx < strValues.length ? strValues[idx] : (fallback || '');

        const item: InventoryItemData = {
          name: getVal(colMap.name, strValues[1] || strValues[0] || ''),
          location: getVal(colMap.location, strValues[2] || ''),
          category: getVal(colMap.category) || config.categories[0]?.value || '',
          quantity: parseInt(getVal(colMap.quantity, strValues[4] || '1')) || 1,
          quantityNeeded: parseInt(getVal(colMap.quantityNeeded, '0')) || 0,
          quantityUnneeded: parseInt(getVal(colMap.quantityUnneeded, '0')) || 0,
          price: parseFloat(getVal(colMap.price, '0')) || null,
          action: getVal(colMap.action, '') || getVal(colMap.observaciones, ''),
          zonaOrigen: colMap.zona >= 0 ? getVal(colMap.zona) || null : null,
          extra: {},
        };

        // S1: All items are innecesario by nature, set default decision
        if (sStep === 1) {
          item.quantityUnneeded = item.quantity;
          item.quantityNeeded = 0;
          if (colMap.estado >= 0) item.extra!['estado'] = getVal(colMap.estado);
          if (colMap.frecuenciaUso >= 0) item.extra!['frecuenciaUso'] = getVal(colMap.frecuenciaUso);
          // Map classification/decision columns
          // v2.50: 'Retirar' replaces 'Jaula'; 'Tirar' merged into 'Eliminar'.
          const decisionVal = getVal(colMap.category) || getVal(colMap.action, '');
          if (decisionVal) {
            const lower = decisionVal.toLowerCase();
            if (lower.includes('retirar') || lower.includes('jaula') || lower.includes('red') || lower.includes('etiqueta')) {
              item.extra!['decision'] = 'Retirar';
            } else if (lower.includes('elimin') || lower.includes('tirar') || lower.includes('residuo') || lower.includes('basura')) {
              item.extra!['decision'] = 'Eliminar';
            } else {
              item.extra!['decision'] = 'Retirar'; // Default for S1
            }
          }
          if (!item.extra!['decision']) item.extra!['decision'] = 'Retirar';
        } else if (sStep === 2) {
          if (colMap.ubicacionAsignada >= 0) item.extra!['ubicacionAsignada'] = getVal(colMap.ubicacionAsignada);
          if (colMap.metodoIdentificacion >= 0) item.extra!['metodoIdentificacion'] = getVal(colMap.metodoIdentificacion);
          if (colMap.cercania >= 0) item.extra!['cercania'] = getVal(colMap.cercania);
          if (colMap.frecuenciaUso >= 0) item.extra!['frecuenciaUso'] = getVal(colMap.frecuenciaUso);
        } else if (sStep === 3) {
          if (colMap.nivel >= 0) item.extra!['nivel'] = getVal(colMap.nivel);
          if (colMap.fuente >= 0) item.extra!['fuente'] = getVal(colMap.fuente);
          if (colMap.metodoLimpieza >= 0) item.extra!['metodoLimpieza'] = getVal(colMap.metodoLimpieza);
          if (colMap.frecuenciaLimpieza >= 0) item.extra!['frecuenciaLimpieza'] = getVal(colMap.frecuenciaLimpieza);
        } else if (sStep === 4) {
          if (colMap.estado >= 0) item.extra!['estadoEstandar'] = getVal(colMap.estado);
          if (colMap.documentado >= 0) item.extra!['documentado'] = getVal(colMap.documentado);
          if (colMap.cumplimiento >= 0) item.extra!['cumplimiento'] = getVal(colMap.cumplimiento);
        } else if (sStep === 5) {
          if (colMap.frecuenciaUso >= 0) item.extra!['frecuencia'] = getVal(colMap.frecuenciaUso);
          if (colMap.nivel >= 0) item.extra!['practica'] = getVal(colMap.nivel);
        }

        // Also check config.extraFields for any remaining fields
        config.extraFields.forEach((field) => {
          if (item.extra![field.key]) return; // Already mapped above
          const val = getVal(findCol(headerRow, field.label.toLowerCase()), '');
          if (val) {
            item.extra![field.key] = val;
          }
        });

        // Skip items with no name
        if (!item.name) continue;
        parsedItems.push(item);
      }

      if (parsedItems.length > 0) {
        setCsvPreview(parsedItems);
        toast.info(`${parsedItems.length} elementos encontrados. Revisa y confirma la importación.`);
      } else {
        toast.error('No se encontraron elementos válidos en el archivo. Asegúrate de rellenar las filas con datos.');
      }
    } catch (error) {
      console.error('Error parsing file:', error);
      toast.error('Error al procesar el archivo. Verifica el formato.');
    }
    // Reset file input
    e.target.value = '';
  };

  const handleConfirmCsvImport = async () => {
    if (!csvPreview || csvPreview.length === 0) return;
    if (!currentProject?.id) {
      toast.error('No hay proyecto seleccionado.');
      return;
    }
    setIsImporting(true);
    try {
      const res = await fetch('/api/inventory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          csvPreview.map(item => ({
            sStep,
            projectId: currentProject!.id,
            zoneId: currentZone?.id || null,
            name: item.name,
            location: item.location,
            category: item.category || config.categories[0]?.value || '',
            quantity: item.quantity || 1,
            quantityNeeded: sStep === 1 ? (item.category === 'necesario' ? (item.quantityNeeded || item.quantity || 1) : 0) : (item.quantityNeeded || 0),
            quantityUnneeded: sStep === 1 ? (item.category === 'innecesario' ? (item.quantityUnneeded || item.quantity || 1) : 0) : (item.quantityUnneeded || 0),
            price: item.price || null,
            action: item.action || '',
            extra: item.extra || {},
            // v2.50: Retirar (legacy 'Jaula') → en_jaula; Eliminar (legacy 'Tirar') → Residuo.
            jaulaStatus: sStep === 1 && item.category === 'innecesario' && isJaulaDecision(item.extra?.decision) ? 'en_jaula' : '',
            jaulaFechaEntrada: sStep === 1 && item.category === 'innecesario' && isJaulaDecision(item.extra?.decision) ? new Date().toISOString() : null,
            jaulaOrigen: sStep === 1 && item.category === 'innecesario' && isJaulaDecision(item.extra?.decision) ? item.zonaOrigen || currentZone?.name || currentProject!.name || '' : null,
            zonaOrigen: item.zonaOrigen || currentZone?.name || null,
            zonaDestino: sStep === 1 && item.category === 'innecesario' ? (isEliminarDecision(item.extra?.decision) ? 'Residuo' : 'Jaula') : (item.zonaOrigen || currentZone?.name || null),
          }))
        ),
      });

      const json = await res.json();
      if (json.success) {
        toast.success(`${csvPreview.length} elementos importados correctamente`);
        setCsvPreview(null);
        await loadInventory();
      } else {
        toast.error(`Error al importar CSV: ${json.error || 'Error desconocido'}`);
      }
    } catch (error) {
      console.error('Error importing CSV:', error);
      toast.error('Error de conexión al importar CSV');
    } finally {
      setIsImporting(false);
    }
  };

  const handleDeleteItem = async (id: string) => {
    // v2.52: el candado 🔒 se eliminó. Cualquier item se puede borrar.
    // Si el item viene de una foto del Paso 2 (extra.sourcePhotoId),
    // también se limpia el campo inventoryItemId en la foto para que
    // reaparezca como "pendiente de clasificar" en el Paso 2.
    const item = items.find(i => i.id === id);
    if (!item) return;
    if (!confirm(`¿Eliminar "${item.name}"?${(item.extra as any)?.sourcePhotoId ? ' La foto del Paso 2 quedará como pendiente de clasificar.' : ''}`)) return;
    try {
      const res = await fetch(`/api/inventory?id=${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.success) {
        setItems(prev => prev.filter(item => item.id !== id));
        toast.success('Elemento eliminado');
      } else {
        toast.error(`Error al eliminar: ${json.error || 'Error desconocido'}`);
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      toast.error('Error de conexión al eliminar');
    }
  };

  const handleUpdateJaula = async (id: string, updates: Partial<InventoryItemData>) => {
    try {
      const res = await fetch(`/api/inventory?id=${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      const json = await res.json();
      if (json.success) {
        await loadInventory();
      } else {
        toast.error(`Error al actualizar: ${json.error || 'Error desconocido'}`);
      }
    } catch (error) {
      console.error('Error updating jaula:', error);
      toast.error('Error de conexión al actualizar');
    }
  };

  // v2.52: auto-generar snapshot de etiqueta roja cuando decisión = Retirar (→Jaula).
  // No imprime nada; solo deja el snapshot listo en extra.etiquetaData y marca
  // extra.etiquetaGenerada=true para que la columna "Etiquetas" muestre "Impresa"
  // y permita al usuario imprimir después con un solo click.
  const handleAutoGenerateEtiqueta = async (item: InventoryItemData) => {
    if (!item.id) return;
    const dias = Number(item.extra?.diasCuarentena ?? 40);
    let fechaRevision: string | null = null;
    if (item.jaulaFechaEntrada) {
      try {
        const d = new Date(item.jaulaFechaEntrada);
        d.setDate(d.getDate() + dias);
        fechaRevision = d.toISOString();
      } catch {}
    }
    const snapshot = {
      nombre: item.name,
      ubicacion: item.location || currentZone?.name || currentProject?.name || '',
      cantidad: item.quantityUnneeded || item.quantity || 1,
      estado: String(item.extra?.estado ?? ''),
      frecuenciaUso: String(item.extra?.frecuenciaUso ?? ''),
      decision: 'Retirar',
      categoria: String(item.category ?? 'Innecesario'),
      fechaEntrada: item.jaulaFechaEntrada,
      fechaRevision,
      diasCuarentena: dias,
      zonaOrigen: item.zonaOrigen || item.jaulaOrigen || currentZone?.name || '',
      observaciones: null,
    };
    const fecha = new Date().toISOString();
    const newExtra = {
      ...(item.extra || {}),
      decision: 'Retirar',
      diasCuarentena: dias,
      etiquetaGenerada: true,
      etiquetaFecha: fecha,
      etiquetaData: snapshot,
    };
    delete (newExtra as any).isDraft;
    setItems(prev => prev.map(it => it.id === item.id ? { ...it, extra: newExtra } : it));
    try {
      await fetch(`/api/inventory?id=${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ extra: newExtra }),
      });
    } catch (e) {
      console.error('Error auto-generating etiqueta:', e);
    }
  };

  // Helper: update an extra field on an item and persist
  const handleUpdateExtra = async (itemId: string, key: string, value: string | number) => {
    const item = items.find(i => i.id === itemId);
    if (!item) return;
    const newExtra = { ...(item.extra || {}) };
    if (value === '_clear_') {
      delete newExtra[key];
    } else {
      newExtra[key] = value;
    }
    // Optimistic local update
    setItems(prev => prev.map(it => it.id === itemId ? { ...it, extra: newExtra } : it));
    try {
      await fetch(`/api/inventory?id=${itemId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ extra: newExtra }),
      });
    } catch (e) {
      console.error('Error updating extra field:', e);
    }
  };

  // v2.41: helper para que pulsar Enter en un input inline dispare el guardado
  // sin tener que hacer clic fuera (que era la única forma con onBlur solo).
  // Llama al handler de commit con el valor actual y quita el foco del input
  // para que el estado visual quede consistente.
  const commitOnEnter = (
    e: React.KeyboardEvent<HTMLInputElement>,
    commit: () => void,
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      (e.currentTarget as HTMLInputElement).blur();
      // El blur disparará onBlur que llama a handleUpdateField, pero por
      // si algún campo no tiene onBlur, llamamos al commit explícitamente.
      commit();
    }
  };

  // Helper: update a simple field on an item and persist
  const handleUpdateField = async (itemId: string, field: string, value: any) => {
    const cleanValue = value === '_clear_' ? null : value;
    // v2.40/v2.43: si el item era borrador y el usuario está cambiando el nombre
    // (o la categoría) a un valor real, eliminamos la marca isDraft para
    // que deje de contar como "pendiente". El borrador puede tener cualquiera
    // de los prefijos por S: "Pendiente de clasificar", "Necesario pendiente",
    // "Punto de suciedad pendiente", "Estándar pendiente", "Cumplimiento pendiente".
    const item = items.find(i => i.id === itemId);
    const wasDraft = (item?.extra as any)?.isDraft === true;
    const DRAFT_PREFIXES = [
      'pendiente de clasificar',
      'necesario pendiente',
      'punto de suciedad pendiente',
      'estándar pendiente',
      'cumplimiento pendiente',
    ];
    const isStillDraftName = (v: string) =>
      DRAFT_PREFIXES.some(p => v.toLowerCase().startsWith(p));
    const nameChangedAwayFromDraft = field === 'name'
      && typeof cleanValue === 'string'
      && cleanValue.trim() !== ''
      && !isStillDraftName(cleanValue);
    const categoryChanged = field === 'category'
      && typeof cleanValue === 'string'
      && cleanValue.trim() !== '';

    if (wasDraft && (nameChangedAwayFromDraft || categoryChanged)) {
      const newExtra = { ...(item?.extra || {}) };
      delete (newExtra as any).isDraft;
      // Mantenemos sourcePhotoId/sourcePhotoUrl para trazabilidad histórica
      setItems(prev => prev.map(it => it.id === itemId ? { ...it, [field]: cleanValue, extra: newExtra } : it));
      try {
        await fetch(`/api/inventory?id=${itemId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ [field]: cleanValue, extra: newExtra }),
        });
      } catch (e) {
        console.error('Error updating field (draft clearing):', e);
      }
      return;
    }

    setItems(prev => prev.map(it => it.id === itemId ? { ...it, [field]: cleanValue } : it));
    try {
      await fetch(`/api/inventory?id=${itemId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [field]: cleanValue }),
      });
    } catch (e) {
      console.error('Error updating field:', e);
    }
  };

  // Count classified items
  const classifiedCount = items.filter(i => i.category && i.category !== '').length;
  const classifyPercent = items.length > 0 ? Math.round((classifiedCount / items.length) * 100) : 0;
  // For S2, S3, S4: layout must be uploaded AND classification threshold met
  const needsLayout = sStep === 2 || sStep === 3 || sStep === 4;
  // v2.39: fotos del Paso 2 sin clasificar (sin inventoryItemId) bloquean la compleción.
  // Cada foto del Paso 2 debe estar vinculada a un ítem del inventario.
  const unclassifiedPhotosCount = step2Photos.length;
  const allPhotosClassified = unclassifiedPhotosCount === 0;
  // v2.40: items "borrador" (creados automáticamente al tomar foto en Paso 2)
  // también bloquean la compleción. El usuario debe clasificarlos (cambiar
  // el nombre, asignar categoría/decisión) para que dejen de ser borrador.
  const pendingDraftsCount = items.filter(i => (i.extra as any)?.isDraft === true).length;
  const allDraftsClassified = pendingDraftsCount === 0;
  // S1: No minimum percentage required — just need at least 1 item. If step 4 goes bad, it means not everything was eliminated.
  // S2-S5: Must meet classification threshold (80%)
  const canComplete = sStep === 1
    ? items.length > 0 && classifiedCount > 0 && allPhotosClassified && allDraftsClassified
    : classifyPercent >= INVENTORY_CLASSIFY_THRESHOLD && items.length > 0 && (!needsLayout || layoutUploaded) && allPhotosClassified && allDraftsClassified;

  // S1 specific counts: split by category
  const innecesarios = sStep === 1 ? items.filter(i => i.category === 'innecesario') : items.filter(i => i.category === 'innecesario');
  const necesarios = sStep === 1 ? items.filter(i => i.category === 'necesario') : [];
  const jaulaItems = items.filter(i => i.jaulaStatus === 'en_jaula');
  const totalJaulaValue = jaulaItems.reduce((sum, i) => sum + (i.price || 0) * i.quantity, 0);

  const handleComplete = async () => {
    if (!canComplete) return;
    // Extra guard: check layout for S2/S3/S4
    if (needsLayout && !layoutUploaded) {
      toast.error('Debes dibujar o subir un layout antes de completar este paso');
      return;
    }
    // v2.39: extra guard — fotos del Paso 2 sin clasificar bloquean
    if (unclassifiedPhotosCount > 0) {
      toast.error(`Quedan ${unclassifiedPhotosCount} foto(s) del Paso 2 sin clasificar. Vincula cada foto a un elemento del inventario antes de completar.`);
      return;
    }
    // v2.40: extra guard — items borrador sin clasificar bloquean
    if (pendingDraftsCount > 0) {
      toast.error(`Quedan ${pendingDraftsCount} elemento(s) del inventario pendiente(s) de clasificar. Edita su nombre, categoría y decisión antes de completar.`);
      return;
    }

    try {
      const res = await fetch(`/api/progress/step?sStep=${sStep}&miniStep=${miniStep}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          completed: true,
          score: classifyPercent,
          projectId: currentProject?.id,
          zoneId: currentZone?.id || null,
        }),
      });

      const json = await res.json();
      if (json.success) {
        setIsCompleted(true);
        await fetchProgress();
      }
    } catch (error) {
      console.error('Error completing inventory:', error);
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
      if (json.success) {
        await fetchProgress();
        onClose();
      }
    } catch (error) {
      console.error('Error admin skip:', error);
    }
  };

  const handleSkipMissingTemplate = async () => {
    try {
      const res = await fetch(`/api/progress/step?sStep=${sStep}&miniStep=${miniStep}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: true, score: 100, notes: 'Paso sin plantilla - sin plantilla configurada', projectId: currentProject?.id, zoneId: currentZone?.id || null, skipMissingTemplate: true }),
      });
      const json = await res.json();
      if (json.success) {
        await fetchProgress();
        onClose();
      }
    } catch (error) {
      console.error('Error skip missing template:', error);
    }
  };

  const handleExport = () => {
    const extraHeaders = config.extraFields.map(f => f.label);
    const headerRow = ['Nombre', 'Ubicación', 'Categoría', 'Total exist.', 'Necesarios', 'Innecesarios', 'Precio (€)', ...extraHeaders, 'Acción'].join(',');

    const rows = items.map(item => {
      const extraValues = config.extraFields.map(f => {
        const val = item.extra?.[f.key] ?? '';
        return String(val).replace(/,/g, ';');
      });
      const priceStr = item.price != null ? item.price.toFixed(2) : '';
      return [item.name, item.location, item.category, item.quantity, item.quantityNeeded, item.quantityUnneeded, priceStr, ...extraValues, item.action].join(',');
    });

    const csvContent = [headerRow, ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `inventario_s${sStep}_${sStepData?.japaneseName?.toLowerCase()}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const getCategoryBadge = (category: string) => {
    const cat = config.categories.find(c => c.value === category);
    if (!cat) return <Badge variant="secondary">{category}</Badge>;
    return <Badge className={cat.color}>{cat.label}</Badge>;
  };

  const getExtraValue = (item: InventoryItemData, fieldKey: string) => {
    return item.extra?.[fieldKey] ?? '';
  };

  const getJaulaStatusBadge = (status: string) => {
    const map: Record<string, { label: string; color: string }> = {
      '': { label: '—', color: 'bg-gray-50 text-gray-400' },
      en_jaula: { label: 'En Jaula', color: 'bg-red-100 text-red-800' },
      reclamado: { label: 'Reclamado', color: 'bg-amber-100 text-amber-800' },
      transferido: { label: 'Transferido', color: 'bg-green-100 text-green-800' },
    };
    const info = map[status] || map[''];
    return <Badge className={info.color}>{info.label}</Badge>;
  };

  // v2.48: badge para indicar que la etiqueta roja ya fue impresa y guardada
  // en el sistema (extra.etiquetaGenerada = true).
  const getEtiquetaBadge = (item: InventoryItemData) => {
    if (!item.extra?.etiquetaGenerada) return null;
    const fecha = item.extra.etiquetaFecha
      ? new Date(item.extra.etiquetaFecha).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: '2-digit' })
      : '';
    return (
      <Badge className="bg-emerald-100 text-emerald-800 text-[9px]" title={`Etiqueta impresa${fecha ? ` el ${fecha}` : ''}`}>
        🏷️ Impresa{fecha ? ` ${fecha}` : ''}
      </Badge>
    );
  };

  return (
    <>
    <Dialog open={open} onOpenChange={() => onClose()}>
      <DialogContent size={isFullscreen ? "fullscreen" : "xl"} className="flex flex-col overflow-hidden p-0">
        <DialogHeader className="px-6 pt-6 pb-2 flex-shrink-0">
          <DialogTitle className="flex items-center gap-2">
            <ClipboardList className="h-5 w-5" style={{ color: sStepData?.color }} />
            <span>{config.title}</span>
            <Badge variant="outline" style={{ borderColor: sStepData?.color, color: sStepData?.color }}>
              {sStepData?.japaneseName}
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
          <div className="mx-6 flex items-center gap-2 p-2 bg-amber-50 border border-amber-200 rounded-lg flex-shrink-0">
            <span className="text-xs text-amber-700 font-medium">Modo Admin:</span>
            <Button
              variant="outline"
              size="sm"
              className="text-xs border-amber-300 text-amber-700 hover:bg-amber-100"
              onClick={handleAdminSkip}
            >
              Completar paso sin inventario
            </Button>
          </div>
        )}

        {/* v2.49: botón visible "Reiniciar Paso 2 y 3" — más fácil de encontrar que la × diminuta.
            Solo admin con candado abierto. Disponible siempre (no requiere isCompleted),
            porque el usuario puede querer reiniciar incluso a mitad del Paso 3. */}
        {canSkipSteps && adminFreeNavigation && (
          <div className="mx-6 flex items-center gap-2 p-2 bg-red-50 border border-red-200 rounded-lg flex-shrink-0">
            <span className="text-xs text-red-700 font-medium">Reiniciar:</span>
            <Button
              variant="outline"
              size="sm"
              className="text-xs border-red-300 text-red-700 hover:bg-red-100"
              onClick={async () => {
                const msg = `¿Reiniciar el Paso 2 (Fotos) y el Paso 3 (Inventario)?\n\nEsto eliminará:\n• El progreso del Paso 2 y del Paso 3\n• Todas las fotos del Paso 2\n• Todos los elementos del inventario (${items.length})\n\nPodrás empezar de cero desde el Paso 2.`;
                if (!confirm(msg)) return;
                try {
                  const params = new URLSearchParams({
                    sStep: String(sStep),
                    miniStep: '2', // siempre 2 → cascada borra 2 + 3 + fotos + items
                    projectId: currentProject?.id || '',
                    cleanup: 'true',
                  });
                  if (currentZone?.id) params.set('zoneId', currentZone.id);
                  const res = await fetch(`/api/progress/step?${params}`, { method: 'DELETE' });
                  const json = await res.json();
                  if (json.success) {
                    await fetchProgress();
                    setItems([]);
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
        {hasTemplate === null ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 text-green-500 animate-spin" />
            <span className="ml-3 text-muted-foreground">Cargando plantilla...</span>
          </div>
        ) : hasTemplate === false ? (
          <div className="text-center py-16">
            <ClipboardList className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-500 mb-2">Sin plantilla configurada</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              El administrador no ha configurado ninguna plantilla de inventario para S{sStep} ({sStepData?.japaneseName}) en el Paso 3.
              Puedes pasar este paso y completarlo más tarde.
            </p>
            {!isReadOnly && (
              <Button variant="outline" className="mt-4" onClick={handleSkipMissingTemplate}>
                Pasar sin plantilla
              </Button>
            )}
          </div>
        ) : isCompleted ? (
          <div className="text-center py-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-3" />
            <h3 className="text-xl font-bold mb-2">¡Inventario Completado!</h3>
            <p className="text-muted-foreground">
              Se han clasificado {classifiedCount} de {items.length} elementos ({classifyPercent}%).
            </p>
            {sStep === 1 && (
              <div className="mt-4 flex justify-center gap-4">
                <span className="text-sm text-red-600">Innecesarios: {innecesarios.length}</span>
                <span className="text-sm text-green-600">Necesarios: {necesarios.length}</span>
              </div>
            )}
            <div className="mt-4 p-3 rounded-lg bg-blue-50 border border-blue-200 text-blue-700">
              <p className="text-sm font-semibold">→ Próximo paso: Pre-auditoría (Autoevaluación)</p>
            </div>
            <div className="mt-3 flex justify-center">
              <Button
                onClick={() => { onClose(); openModal('autoevaluacion', 4); }}
                style={{ backgroundColor: sStepData?.color }}
                className="text-white"
              >
                Continuar al paso 4: Autoevaluación →
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* S-specific subtitle */}
            <div className="p-3 rounded-lg border-l-4" style={{ borderColor: sStepData?.color, backgroundColor: `${sStepData?.color}08` }}>
              <p className="text-sm font-medium" style={{ color: sStepData?.color }}>
                {config.subtitle}
              </p>
            </div>

            {/* ═══ ELEMENTOS BORRADOR (creados automáticamente al tomar fotos en Paso 2) ═══ */}
            {pendingDraftsCount > 0 && (() => {
              const instructions = DRAFT_INSTRUCTIONS_BY_S[sStep] || DRAFT_INSTRUCTIONS_BY_S[1];
              return (
              <Card className="border-2 border-red-300 bg-red-50/40">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    <h4 className="font-semibold text-red-800">{instructions.title}</h4>
                    <Badge className="bg-red-100 text-red-800">{pendingDraftsCount} sin clasificar</Badge>
                  </div>
                  <p className="text-xs text-red-700 mb-2 font-medium">
                    {instructions.subtitle}
                  </p>
                  <ul className="text-xs text-red-700 mb-2 list-disc pl-5 space-y-0.5">
                    {instructions.fields.map((f, i) => (
                      <li key={i}><strong>{f.split(':')[0]}</strong>{f.includes(':') ? `:${f.split(':').slice(1).join(':')}` : ''}</li>
                    ))}
                  </ul>
                  <p className="text-xs text-muted-foreground">
                    Cuando rellenes el nombre o la categoría, el elemento deja de ser «pendiente» automáticamente. Hasta que no clasifiques todos los elementos, no podrás completar el inventario.
                  </p>
                </CardContent>
              </Card>
              );
            })()}

            {/* ═══ LAYOUT DE LA ZONA — S2 (Marcado de Suelo), S3 (Limpieza), S4 (Estándares) ═══ */}
            {(sStep === 2 || sStep === 3 || sStep === 4) && (
              <Card className="border-2 border-blue-200 bg-blue-50/30">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <PenTool className="h-5 w-5 text-blue-600" />
                    <h4 className="font-semibold text-blue-800">
                      {sStep === 2 ? 'Layout de la Zona — Marcado de Suelo' 
                        : sStep === 3 ? 'Layout de la Zona — Puntos de Limpieza' 
                        : 'Layout de la Zona — Estándares Implantados'}
                    </h4>
                    <Badge className={layoutUploaded ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}>
                      {layoutUploaded ? 'Layout adjuntado' : 'Pendiente'}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">
                    {sStep === 2
                      ? 'Dibuja o sube el layout de la zona con el marcado de suelo según el estándar de colores. Esto es obligatorio para completar el paso 3 de S2 (Seiton).'
                      : sStep === 3
                      ? 'Dibuja o sube el layout de la zona indicando los puntos de suciedad y las zonas de limpieza. Esto forma parte del inventario de S3 (Seiso).'
                      : 'Dibuja o sube el layout de la zona con los estándares implantados señalados. Esto forma parte del inventario de S4 (Seiketsu).'}
                  </p>

                  {/* Action buttons */}
                  {!isReadOnly && (
                    <div className="flex items-center gap-2 mb-4">
                      <Button size="sm" onClick={() => setShowLayoutEditor(true)}
                        className="gap-1 bg-blue-600 hover:bg-blue-700 text-white text-xs h-8">
                        <PenTool className="h-3 w-3" /> Dibujar Layout
                      </Button>
                      {sStep === 2 && (
                        <Button variant="outline" size="sm" onClick={() => setShowColorCodeTable(true)}
                          className="gap-1 text-xs h-8 border-yellow-400 text-yellow-700 hover:bg-yellow-50">
                          <Eye className="h-3 w-3" /> Ver Estándar Colores
                        </Button>
                      )}
                      <div className="relative">
                        <Button variant="outline" size="sm"
                          className="gap-1 text-xs h-8 border-green-400 text-green-700 hover:bg-green-50"
                          onClick={() => document.getElementById('layout-upload-s2')?.click()}>
                          <Upload className="h-3 w-3" /> Subir Imagen/Croquis
                        </Button>
                        <input id="layout-upload-s2" type="file" accept="image/*" className="hidden"
                          onChange={handleUploadLayoutImage} />
                      </div>
                    </div>
                  )}

                  {/* Saved layout previews */}
                  {savedLayouts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {savedLayouts.map(layout => (
                        <div key={layout.id} className="border rounded-lg overflow-hidden bg-white">
                          {layout.photoUrl ? (
                            <img src={layout.photoUrl} alt={layout.title}
                              className="w-full h-32 object-cover cursor-pointer hover:opacity-80 transition-opacity"
                              onClick={() => window.open(layout.photoUrl!, '_blank')} />
                          ) : (
                            <div className="w-full h-32 bg-gray-100 flex items-center justify-center text-gray-400 text-xs">
                              Sin imagen
                            </div>
                          )}
                          <div className="px-2 py-1.5 flex items-center justify-between">
                            <span className="text-[10px] font-medium truncate">{layout.title}</span>
                            <span className="text-[9px] text-muted-foreground">
                              {new Date(layout.createdAt).toLocaleDateString('es-ES')}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 bg-white rounded-lg border border-dashed border-blue-300">
                      <PenTool className="h-8 w-8 text-blue-300 mx-auto mb-2" />
                      <p className="text-xs text-muted-foreground">No hay layout adjuntado</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">Dibuja o sube el layout de la zona</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Classification progress — v2.39: hidden for empleado/auditor (bulk management only) */}
            {canManageBulk && (
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div>
                <span className="text-sm font-medium">Clasificación</span>
                <p className="text-xs text-muted-foreground">
                  {classifiedCount}/{items.length} clasificados
                </p>
              </div>
              <Badge variant={canComplete ? 'default' : 'secondary'}>
                {classifyPercent}%{sStep !== 1 ? ` (mín. ${INVENTORY_CLASSIFY_THRESHOLD}%)` : ''}
              </Badge>
            </div>
            )}

            {/* Action buttons — v2.39: bulk import/export hidden for empleado/auditor */}
            <div className="flex gap-2 flex-wrap items-center">
              {canManageBulk && (
              <>
              <Button variant="outline" size="sm" onClick={handleImportTemplate}>
                <Upload className="h-4 w-4 mr-1" /> Importar Plantilla
              </Button>
              <Button variant="outline" size="sm" onClick={handleExport} disabled={items.length === 0}>
                <Download className="h-4 w-4 mr-1" /> Exportar CSV
              </Button>
              {/* Unified file import: accepts .xlsx and .csv */}
              <label className="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-1.5 text-xs font-medium ring-offset-background hover:bg-accent hover:text-accent-foreground cursor-pointer">
                <FileUp className="h-4 w-4 mr-1" /> Importar Archivo
                <input
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  className="hidden"
                  onChange={handleFileImport}
                />
              </label>
              <a
                href={`/templates/${config.templateName}`}
                download
                className="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-1.5 text-xs font-medium ring-offset-background hover:bg-accent hover:text-accent-foreground"
              >
                <FileSpreadsheet className="h-4 w-4 mr-1" /> Descargar Plantilla Excel
              </a>
              </>
              )}
              {/* S1: Print red label button — only for Jaula decision items */}
              {sStep === 1 && items.length > 0 && (() => {
                // Helper: compute revision date = entry date + diasCuarentena (default 40)
                const withRevision = (i: InventoryItemData) => {
                  let fechaRevision: string | null = null;
                  const dias = Number(i.extra?.diasCuarentena ?? 40);
                  if (i.jaulaFechaEntrada) {
                    try {
                      const d = new Date(i.jaulaFechaEntrada);
                      d.setDate(d.getDate() + dias);
                      fechaRevision = d.toISOString();
                    } catch {}
                  }
                  return fechaRevision;
                };
                // v2.50: red tag only for items going to Jaula (Retirar; legacy 'Jaula').
                const rojaItems = items
                  .filter(i => i.category === 'innecesario' && isJaulaDecision(i.extra?.decision))
                  .map(i => ({
                    nombre: i.name,
                    ubicacion: i.location,
                    cantidad: i.quantityUnneeded || i.quantity,
                    estado: String(i.extra?.estado ?? ''),
                    frecuenciaUso: String(i.extra?.frecuenciaUso ?? ''),
                    decision: 'Retirar' as string,
                    categoria: String(i.category ?? 'Innecesario'),
                    fechaEntrada: i.jaulaFechaEntrada,
                    fechaRevision: withRevision(i),
                    diasCuarentena: Number(i.extra?.diasCuarentena ?? 40),
                    zonaOrigen: i.zonaOrigen || i.jaulaOrigen,
                  }));
                // v2.48: pasamos los itemIds alineados con rojaItems para que
                // TagPrinter pueda persistir el snapshot de la etiqueta.
                const rojaItemIds = items
                  .filter(i => i.category === 'innecesario' && isJaulaDecision(i.extra?.decision))
                  .map(i => i.id);
                return (
                  <div className="flex items-center gap-2 ml-2 pl-2 border-l border-red-300">
                    <span className="text-[10px] text-muted-foreground font-medium">Etiquetas:</span>
                    {rojaItems.length > 0 && (
                      <TagPrinter
                        items={rojaItems}
                        itemIds={rojaItemIds}
                        onAfterPrint={() => { /* recargar items para reflejar etiquetaGenerada */ loadInventory(); }}
                      />
                    )}
                  </div>
                );
              })()}
            </div>

            {/* TASK 7: CSV Import Preview */}
            {csvPreview && csvPreview.length > 0 && (
              <Card className="border-2 border-blue-200 bg-blue-50/30">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <FileUp className="h-5 w-5 text-blue-600" />
                      <h4 className="font-semibold text-blue-800">Vista Previa de Importación</h4>
                      <Badge className="bg-blue-200 text-blue-900">{csvPreview.length} elementos</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs"
                        onClick={() => setCsvPreview(null)}
                      >
                        Cancelar
                      </Button>
                      <Button
                        size="sm"
                        className="text-xs bg-blue-600 hover:bg-blue-700"
                        onClick={handleConfirmCsvImport}
                        disabled={isImporting}
                      >
                        {isImporting ? 'Importando...' : `Confirmar Importación (${csvPreview.length})`}
                      </Button>
                    </div>
                  </div>
                  <div className="max-h-48 overflow-y-auto rounded-lg border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-xs">Elemento</TableHead>
                          <TableHead className="text-xs">Ubicación</TableHead>
                          <TableHead className="text-xs">Categoría</TableHead>
                          <TableHead className="text-xs">Cant.</TableHead>
                          <TableHead className="text-xs">Precio</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {csvPreview.map((item, idx) => (
                          <TableRow key={idx}>
                            <TableCell className="text-xs font-medium">{item.name}</TableCell>
                            <TableCell className="text-xs">{item.location}</TableCell>
                            <TableCell className="text-xs">{item.category}</TableCell>
                            <TableCell className="text-xs text-center">{item.quantity}</TableCell>
                            <TableCell className="text-xs text-right">{item.price ? `${item.price.toFixed(2)} €` : '—'}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            )}


            {/* ═══ S3: Plan de Limpieza e Inspección ═══ */}
            {sStep === 3 && (
              <div className="mt-2">
                <CleaningPlanPanel
                  sStep={sStep}
                  inventoryItems={items.map(i => ({
                    name: i.name,
                    location: i.location,
                    category: i.category,
                    extra: i.extra ? JSON.stringify(i.extra) : null,
                  }))}
                  isReadOnly={isReadOnly}
                />
              </div>
            )}

            {/* ═══ S4: Biblioteca de Estándares ═══ */}
            {sStep === 4 && (
              <div className="mt-2">
                <BibliotecaEstandaresView />
              </div>
            )}

            {/* Items table */}
            {isLoading ? (
              <div className="space-y-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-10 bg-muted rounded animate-pulse" />
                ))}
              </div>
            ) : items.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Camera className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No hay elementos en el inventario</p>
                <p className="text-xs mt-1">
                  Toma fotos en el Paso 2 (S{sStep} · {sStepData?.japaneseName} · Fotos) y se crearán aquí automáticamente.
                </p>
              </div>
            ) : (
              <div className="max-h-80 overflow-y-auto rounded-lg border">
                <table className="w-full text-xs border-collapse">
                  <thead className="sticky top-0 z-10">
                    {/* ── Row 1: Group headers (colored bands like Plan de Acción) ── */}
                    {sStep === 1 ? (
                      <>
                        <tr>
                          <th colSpan={3} className="bg-sky-500 text-white px-2 py-1.5 text-center text-xs font-bold border border-sky-600">IDENTIFICACIÓN</th>
                          <th colSpan={2} className="bg-emerald-500 text-white px-2 py-1.5 text-center text-xs font-bold border border-emerald-600">CANTIDAD / VALOR</th>
                          <th colSpan={5} className="bg-red-500 text-white px-2 py-1.5 text-center text-xs font-bold border border-red-600">CLASIFICACIÓN INNECESARIO</th>
                          <th colSpan={2} className="bg-amber-500 text-white px-2 py-1.5 text-center text-xs font-bold border border-amber-600">UBICACIÓN</th>
                          <th colSpan={2} className="bg-gray-500 text-white px-2 py-1.5 text-center text-xs font-bold border border-gray-600"></th>
                        </tr>
                        <tr>
                          {/* IDENTIFICACIÓN */}
                          <th className="bg-sky-400 text-white px-1 py-1 text-center font-semibold border border-sky-400 whitespace-nowrap">Elemento</th>
                          <th className="bg-sky-400 text-white px-1 py-1 text-center font-semibold border border-sky-400 whitespace-nowrap">Ubicación</th>
                          <th className="bg-sky-400 text-white px-1 py-1 text-center font-semibold border border-sky-400 whitespace-nowrap">Categoría</th>
                          {/* CANTIDAD / VALOR */}
                          <th className="bg-emerald-400 text-white px-1 py-1 text-center font-semibold border border-emerald-400 whitespace-nowrap">Cantidad</th>
                          <th className="bg-emerald-400 text-white px-1 py-1 text-center font-semibold border border-emerald-400 whitespace-nowrap">Precio (€)</th>
                          {/* CLASIFICACIÓN INNECESARIO */}
                          <th className="bg-red-400 text-white px-1 py-1 text-center font-semibold border border-red-400 whitespace-nowrap">Estado</th>
                          <th className="bg-red-400 text-white px-1 py-1 text-center font-semibold border border-red-400 whitespace-nowrap">Frec. uso</th>
                          <th className="bg-red-400 text-white px-1 py-1 text-center font-semibold border border-red-400 whitespace-nowrap">Decisión</th>
                          <th className="bg-orange-400 text-white px-1 py-1 text-center font-semibold border border-orange-400 whitespace-nowrap">Días cuar.</th>
                          <th className="bg-rose-500 text-white px-1 py-1 text-center font-semibold border border-rose-500 whitespace-nowrap">Etiquetas</th>
                          {/* UBICACIÓN */}
                          <th className="bg-amber-400 text-white px-1 py-1 text-center font-semibold border border-amber-400 whitespace-nowrap">Z. Origen</th>
                          <th className="bg-amber-400 text-white px-1 py-1 text-center font-semibold border border-amber-400 whitespace-nowrap">Z. Destino</th>
                          {/* ACCIONES */}
                          <th className="bg-gray-400 text-white px-1 py-1 text-center font-semibold border border-gray-400 whitespace-nowrap">Fotos</th>
                          <th className="bg-gray-400 text-white px-1 py-1 text-center font-semibold border border-gray-400 w-8"></th>
                        </tr>
                      </>
                    ) : sStep === 2 ? (
                      <>
                        <tr>
                          <th colSpan={3} className="bg-sky-500 text-white px-2 py-1.5 text-center text-xs font-bold border border-sky-600">IDENTIFICACIÓN</th>
                          <th colSpan={2} className="bg-emerald-500 text-white px-2 py-1.5 text-center text-xs font-bold border border-emerald-600">CANTIDAD / VALOR</th>
                          <th colSpan={2} className="bg-blue-500 text-white px-2 py-1.5 text-center text-xs font-bold border border-blue-600">ORGANIZACIÓN</th>
                          <th colSpan={2} className="bg-amber-500 text-white px-2 py-1.5 text-center text-xs font-bold border border-amber-600">UBICACIÓN</th>
                          <th colSpan={2} className="bg-gray-500 text-white px-2 py-1.5 text-center text-xs font-bold border border-gray-600"></th>
                        </tr>
                        <tr>
                          <th className="bg-sky-400 text-white px-1 py-1 text-center font-semibold border border-sky-400 whitespace-nowrap">Elemento</th>
                          <th className="bg-sky-400 text-white px-1 py-1 text-center font-semibold border border-sky-400 whitespace-nowrap">Ubicación</th>
                          <th className="bg-sky-400 text-white px-1 py-1 text-center font-semibold border border-sky-400 whitespace-nowrap">Categoría</th>
                          <th className="bg-emerald-400 text-white px-1 py-1 text-center font-semibold border border-emerald-400 whitespace-nowrap">Total</th>
                          <th className="bg-emerald-400 text-white px-1 py-1 text-center font-semibold border border-emerald-400 whitespace-nowrap">Precio (€)</th>
                          {config.extraFields.slice(0, 2).map(f => (
                            <th key={f.key} className="bg-blue-400 text-white px-1 py-1 text-center font-semibold border border-blue-400 whitespace-nowrap">{f.label}</th>
                          ))}
                          <th className="bg-amber-400 text-white px-1 py-1 text-center font-semibold border border-amber-400 whitespace-nowrap">Z. Origen</th>
                          <th className="bg-amber-400 text-white px-1 py-1 text-center font-semibold border border-amber-400 whitespace-nowrap">Z. Destino</th>
                          <th className="bg-gray-400 text-white px-1 py-1 text-center font-semibold border border-gray-400 whitespace-nowrap">Fotos</th>
                          <th className="bg-gray-400 text-white px-1 py-1 text-center font-semibold border border-gray-400 w-8"></th>
                        </tr>
                      </>
                    ) : sStep === 3 ? (
                      <>
                        <tr>
                          <th colSpan={3} className="bg-sky-500 text-white px-2 py-1.5 text-center text-xs font-bold border border-sky-600">IDENTIFICACIÓN</th>
                          <th colSpan={2} className="bg-emerald-500 text-white px-2 py-1.5 text-center text-xs font-bold border border-emerald-600">CANTIDAD / VALOR</th>
                          <th colSpan={2} className="bg-violet-500 text-white px-2 py-1.5 text-center text-xs font-bold border border-violet-600">ANÁLISIS DE SUCIEDAD</th>
                          <th colSpan={2} className="bg-amber-500 text-white px-2 py-1.5 text-center text-xs font-bold border border-amber-600">UBICACIÓN</th>
                          <th colSpan={2} className="bg-gray-500 text-white px-2 py-1.5 text-center text-xs font-bold border border-gray-600"></th>
                        </tr>
                        <tr>
                          <th className="bg-sky-400 text-white px-1 py-1 text-center font-semibold border border-sky-400 whitespace-nowrap">Punto</th>
                          <th className="bg-sky-400 text-white px-1 py-1 text-center font-semibold border border-sky-400 whitespace-nowrap">Ubicación</th>
                          <th className="bg-sky-400 text-white px-1 py-1 text-center font-semibold border border-sky-400 whitespace-nowrap">Tipo suciedad</th>
                          <th className="bg-emerald-400 text-white px-1 py-1 text-center font-semibold border border-emerald-400 whitespace-nowrap">Total</th>
                          <th className="bg-emerald-400 text-white px-1 py-1 text-center font-semibold border border-emerald-400 whitespace-nowrap">Precio (€)</th>
                          {config.extraFields.slice(0, 2).map(f => (
                            <th key={f.key} className="bg-violet-400 text-white px-1 py-1 text-center font-semibold border border-violet-400 whitespace-nowrap">{f.label}</th>
                          ))}
                          <th className="bg-amber-400 text-white px-1 py-1 text-center font-semibold border border-amber-400 whitespace-nowrap">Z. Origen</th>
                          <th className="bg-amber-400 text-white px-1 py-1 text-center font-semibold border border-amber-400 whitespace-nowrap">Z. Destino</th>
                          <th className="bg-gray-400 text-white px-1 py-1 text-center font-semibold border border-gray-400 whitespace-nowrap">Fotos</th>
                          <th className="bg-gray-400 text-white px-1 py-1 text-center font-semibold border border-gray-400 w-8"></th>
                        </tr>
                      </>
                    ) : sStep === 4 ? (
                      <>
                        <tr>
                          <th colSpan={3} className="bg-sky-500 text-white px-2 py-1.5 text-center text-xs font-bold border border-sky-600">IDENTIFICACIÓN</th>
                          <th colSpan={2} className="bg-emerald-500 text-white px-2 py-1.5 text-center text-xs font-bold border border-emerald-600">CANTIDAD / VALOR</th>
                          <th colSpan={2} className="bg-teal-500 text-white px-2 py-1.5 text-center text-xs font-bold border border-teal-600">ESTADO DEL ESTÁNDAR</th>
                          <th colSpan={2} className="bg-amber-500 text-white px-2 py-1.5 text-center text-xs font-bold border border-amber-600">UBICACIÓN</th>
                          <th colSpan={2} className="bg-gray-500 text-white px-2 py-1.5 text-center text-xs font-bold border border-gray-600"></th>
                        </tr>
                        <tr>
                          <th className="bg-sky-400 text-white px-1 py-1 text-center font-semibold border border-sky-400 whitespace-nowrap">Estándar</th>
                          <th className="bg-sky-400 text-white px-1 py-1 text-center font-semibold border border-sky-400 whitespace-nowrap">Ubicación</th>
                          <th className="bg-sky-400 text-white px-1 py-1 text-center font-semibold border border-sky-400 whitespace-nowrap">Tipo</th>
                          <th className="bg-emerald-400 text-white px-1 py-1 text-center font-semibold border border-emerald-400 whitespace-nowrap">Total</th>
                          <th className="bg-emerald-400 text-white px-1 py-1 text-center font-semibold border border-emerald-400 whitespace-nowrap">Precio (€)</th>
                          {config.extraFields.slice(0, 2).map(f => (
                            <th key={f.key} className="bg-teal-400 text-white px-1 py-1 text-center font-semibold border border-teal-400 whitespace-nowrap">{f.label}</th>
                          ))}
                          <th className="bg-amber-400 text-white px-1 py-1 text-center font-semibold border border-amber-400 whitespace-nowrap">Z. Origen</th>
                          <th className="bg-amber-400 text-white px-1 py-1 text-center font-semibold border border-amber-400 whitespace-nowrap">Z. Destino</th>
                          <th className="bg-gray-400 text-white px-1 py-1 text-center font-semibold border border-gray-400 whitespace-nowrap">Fotos</th>
                          <th className="bg-gray-400 text-white px-1 py-1 text-center font-semibold border border-gray-400 w-8"></th>
                        </tr>
                      </>
                    ) : (
                      <>
                        <tr>
                          <th colSpan={3} className="bg-sky-500 text-white px-2 py-1.5 text-center text-xs font-bold border border-sky-600">IDENTIFICACIÓN</th>
                          <th colSpan={2} className="bg-emerald-500 text-white px-2 py-1.5 text-center text-xs font-bold border border-emerald-600">CANTIDAD / VALOR</th>
                          <th colSpan={2} className="bg-indigo-500 text-white px-2 py-1.5 text-center text-xs font-bold border border-indigo-600">DISCIPLINA</th>
                          <th colSpan={2} className="bg-amber-500 text-white px-2 py-1.5 text-center text-xs font-bold border border-amber-600">UBICACIÓN</th>
                          <th colSpan={2} className="bg-gray-500 text-white px-2 py-1.5 text-center text-xs font-bold border border-gray-600"></th>
                        </tr>
                        <tr>
                          <th className="bg-sky-400 text-white px-1 py-1 text-center font-semibold border border-sky-400 whitespace-nowrap">Práctica</th>
                          <th className="bg-sky-400 text-white px-1 py-1 text-center font-semibold border border-sky-400 whitespace-nowrap">Ubicación</th>
                          <th className="bg-sky-400 text-white px-1 py-1 text-center font-semibold border border-sky-400 whitespace-nowrap">Cumplimiento</th>
                          <th className="bg-emerald-400 text-white px-1 py-1 text-center font-semibold border border-emerald-400 whitespace-nowrap">Total</th>
                          <th className="bg-emerald-400 text-white px-1 py-1 text-center font-semibold border border-emerald-400 whitespace-nowrap">Precio (€)</th>
                          {config.extraFields.slice(0, 2).map(f => (
                            <th key={f.key} className="bg-indigo-400 text-white px-1 py-1 text-center font-semibold border border-indigo-400 whitespace-nowrap">{f.label}</th>
                          ))}
                          <th className="bg-amber-400 text-white px-1 py-1 text-center font-semibold border border-amber-400 whitespace-nowrap">Z. Origen</th>
                          <th className="bg-amber-400 text-white px-1 py-1 text-center font-semibold border border-amber-400 whitespace-nowrap">Z. Destino</th>
                          <th className="bg-gray-400 text-white px-1 py-1 text-center font-semibold border border-gray-400 whitespace-nowrap">Fotos</th>
                          <th className="bg-gray-400 text-white px-1 py-1 text-center font-semibold border border-gray-400 w-8"></th>
                        </tr>
                      </>
                    )}
                  </thead>
                  <tbody>
                    {items.map(item => {
                      const isInnecesario = item.category === 'innecesario';
                      const isNecesario = item.category === 'necesario';
                      const canEdit = !isReadOnly && item.id;
                      const inlineInput = "h-6 text-[10px] border-0 p-0 px-1 bg-transparent";
                      const inlineSelect = "h-6 text-[10px] border-0 p-0 bg-transparent";
                      // Section colors matching header groups
                      const idBg = sStep === 1 ? 'bg-sky-50' : sStep === 3 ? 'bg-sky-50' : sStep === 4 ? 'bg-sky-50' : sStep === 5 ? 'bg-sky-50' : 'bg-sky-50';
                      const qtyBg = 'bg-emerald-50';
                      const specBg = sStep === 1 ? 'bg-red-50' : sStep === 2 ? 'bg-blue-50' : sStep === 3 ? 'bg-violet-50' : sStep === 4 ? 'bg-teal-50' : 'bg-indigo-50';
                      const locBg = 'bg-amber-50';
                      // v2.40: items borrador (pendientes de clasificar) se resaltan
                      const isDraft = (item.extra as any)?.isDraft === true;
                      return (
                      <tr key={item.id} className={`border-b hover:bg-gray-50 ${isDraft ? 'bg-red-50/40 ring-1 ring-red-200' : isInnecesario ? 'bg-red-50/30' : isNecesario ? 'bg-green-50/20' : ''}`}>
                        {/* IDENTIFICACIÓN: Elemento */}
                        <td className={`px-1 py-1 border ${idBg} font-medium`}>
                          <div className="flex items-center gap-1">
                            {isDraft && (
                              <Badge className="text-[8px] px-1 py-0 bg-red-500 text-white whitespace-nowrap shrink-0" title="Elemento creado automáticamente al tomar la foto en el Paso 2. Edita el nombre, categoría y decisión para clasificarlo.">
                                Pendiente
                              </Badge>
                            )}
                            {canEdit ? (
                              <Input value={item.name} className={`${inlineInput} ${isDraft ? 'ring-1 ring-red-300' : ''}`}
                                onChange={e => setItems(prev => prev.map(it => it.id === item.id ? { ...it, name: e.target.value } : it))}
                                onKeyDown={e => commitOnEnter(e, () => handleUpdateField(item.id!, 'name', (e.target as HTMLInputElement).value))}
                                onBlur={e => handleUpdateField(item.id!, 'name', e.target.value)} />
                            ) : <span className="text-[11px]">{item.name}</span>}
                          </div>
                        </td>
                        {/* IDENTIFICACIÓN: Ubicación — v2.50: en S1 auto-fill desde la zona actual (read-only); S2-S5 editable */}
                        <td className={`px-1 py-1 border ${idBg}`}>
                          {sStep === 1 ? (
                            <span className="text-[11px] text-muted-foreground" title="Ubicación automática: derivada de la zona actual">
                              {currentZone?.name || currentProject?.name || item.location || '—'}
                            </span>
                          ) : canEdit ? (
                            <Input value={item.location || ''} className={inlineInput}
                              onChange={e => setItems(prev => prev.map(it => it.id === item.id ? { ...it, location: e.target.value } : it))}
                              onKeyDown={e => commitOnEnter(e, () => handleUpdateField(item.id!, 'location', (e.target as HTMLInputElement).value))}
                              onBlur={e => handleUpdateField(item.id!, 'location', e.target.value)} />
                          ) : <span className="text-[11px]">{item.location || '—'}</span>}
                        </td>
                        {/* IDENTIFICACIÓN: Categoría — v2.50: auto-default 'Innecesario' en S1, read-only */}
                        <td className={`px-1 py-1 border ${idBg} text-center`}>
                          {sStep === 1 ? (
                            <Badge className="text-[9px] px-1 py-0 bg-red-100 text-red-800 whitespace-nowrap" title="En S1 (Seiri) todos los elementos inventariados son innecesarios por definición">
                              Innecesario
                            </Badge>
                          ) : canEdit ? (
                            <Select value={item.category || undefined}
                              onValueChange={val => {
                                const isInn = val === 'innecesario';
                                const isNec = val === 'necesario';
                                const qty = item.quantity || 1;
                                const updates: any = { category: val, quantityNeeded: isNec ? qty : 0, quantityUnneeded: isInn ? qty : 0 };
                                const wasDraft = (item.extra as any)?.isDraft === true;
                                if (wasDraft) {
                                  const newExtra = { ...(item.extra || {}) };
                                  delete (newExtra as any).isDraft;
                                  updates.extra = newExtra;
                                  setItems(prev => prev.map(it => it.id === item.id ? { ...it, ...updates } : it));
                                } else {
                                  setItems(prev => prev.map(it => it.id === item.id ? { ...it, ...updates } : it));
                                }
                                fetch(`/api/inventory?id=${item.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(updates) });
                              }}>
                              <SelectTrigger className={inlineSelect}><SelectValue /></SelectTrigger>
                              <SelectContent>
                                {config.categories.filter(c => c.value && c.value.trim() !== '').map(c => (
                                  <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          ) : getCategoryBadge(item.category)}
                        </td>
                        {/* CANTIDAD/VALOR: Cantidad */}
                        <td className={`px-1 py-1 border ${qtyBg} text-center`}>
                          {canEdit ? (
                            <Input type="number" min="1" value={item.quantity || 1} className={`${inlineInput} w-12 text-center`}
                              onChange={e => { const val = parseInt(e.target.value) || 1; setItems(prev => prev.map(it => it.id === item.id ? { ...it, quantity: val } : it)); }}
                              onKeyDown={e => commitOnEnter(e, () => handleUpdateField(item.id!, 'quantity', parseInt((e.target as HTMLInputElement).value) || 1))}
                              onBlur={e => handleUpdateField(item.id!, 'quantity', parseInt(e.target.value) || 1)} />
                          ) : <span className="text-[11px]">{sStep === 1 ? (isInnecesario ? (item.quantityUnneeded || item.quantity) : isNecesario ? (item.quantityNeeded || item.quantity) : item.quantity) : item.quantity}</span>}
                        </td>
                        {/* CANTIDAD/VALOR: Precio */}
                        <td className={`px-1 py-1 border ${qtyBg} text-right`}>
                          {canEdit ? (
                            <Input type="number" min="0" step="0.01" value={item.price ?? ''} className={`${inlineInput} w-16 text-right`}
                              onChange={e => { const val = e.target.value ? parseFloat(e.target.value) : null; setItems(prev => prev.map(it => it.id === item.id ? { ...it, price: val } : it)); }}
                              onKeyDown={e => commitOnEnter(e, () => handleUpdateField(item.id!, 'price', (e.target as HTMLInputElement).value ? parseFloat((e.target as HTMLInputElement).value) : null))}
                              onBlur={e => handleUpdateField(item.id!, 'price', e.target.value ? parseFloat(e.target.value) : null)} />
                          ) : <span className="text-[11px]">{item.price != null ? `${item.price.toFixed(2)} €` : '—'}</span>}
                        </td>
                        {sStep === 1 ? (
                          <>
                            {/* CLASIFICACIÓN: Estado */}
                            <td className={`px-1 py-1 border ${specBg} text-center`}>
                              {canEdit ? (
                                <Select value={item.extra?.estado ? String(item.extra.estado) : undefined} onValueChange={val => handleUpdateExtra(item.id!, 'estado', val)}>
                                  <SelectTrigger className={inlineSelect}><SelectValue placeholder="—" /></SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="_clear_">—</SelectItem>
                                    {['Bueno', 'Regular', 'Malo'].map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                                  </SelectContent>
                                </Select>
                              ) : <span className="text-[11px]">{String(item.extra?.estado ?? '—')}</span>}
                            </td>
                            {/* CLASIFICACIÓN: Frecuencia uso — v2.50: 'No aplica' para innecesarios (S1) */}
                            <td className={`px-1 py-1 border ${specBg} text-center`}>
                              <span className="text-[11px] text-muted-foreground" title="No aplica: el elemento es innecesario y se retirará">
                                No aplica
                              </span>
                            </td>
                            {/* CLASIFICACIÓN: Decisión — v2.50: Retirar (→Jaula) o Eliminar (→Residuo) */}
                            <td className={`px-1 py-1 border ${specBg} text-center`}>
                              {canEdit ? (
                                <Select value={displayDecision(item.extra?.decision)}
                                  onValueChange={val => {
                                    handleUpdateExtra(item.id!, 'decision', val);
                                    const isInn = item.category === 'innecesario';
                                    if (isInn) {
                                      handleUpdateField(item.id!, 'action', val);
                                      const newDestino = val === 'Eliminar' ? 'Residuo' : 'Jaula';
                                      handleUpdateField(item.id!, 'zonaDestino', newDestino);
                                      if (val === 'Eliminar') {
                                        handleUpdateField(item.id!, 'jaulaStatus', '');
                                        handleUpdateField(item.id!, 'jaulaFechaEntrada', null);
                                        handleUpdateExtra(item.id!, 'diasCuarentena', '_clear_');
                                        // v2.52: limpiar snapshot de etiqueta si existía
                                        const extra = { ...(item.extra || {}) };
                                        delete (extra as any).etiquetaGenerada;
                                        delete (extra as any).etiquetaFecha;
                                        delete (extra as any).etiquetaData;
                                      } else if (val === 'Retirar') {
                                        // v2.52: asegurar jaulaStatus + fecha entrada
                                        const updatedItem: InventoryItemData = {
                                          ...item,
                                          jaulaStatus: 'en_jaula',
                                          jaulaFechaEntrada: item.jaulaFechaEntrada || new Date().toISOString(),
                                          extra: { ...(item.extra || {}), decision: 'Retirar', diasCuarentena: item.extra?.diasCuarentena ?? 40 },
                                        };
                                        handleUpdateField(item.id!, 'jaulaStatus', 'en_jaula');
                                        if (!item.jaulaFechaEntrada) handleUpdateField(item.id!, 'jaulaFechaEntrada', new Date().toISOString());
                                        if (!item.extra?.diasCuarentena) handleUpdateExtra(item.id!, 'diasCuarentena', 40);
                                        // v2.52: generar snapshot de etiqueta automáticamente
                                        setTimeout(() => handleAutoGenerateEtiqueta(updatedItem), 50);
                                      }
                                    }
                                  }}>
                                  <SelectTrigger className={inlineSelect}><SelectValue placeholder="—" /></SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Retirar">Retirar</SelectItem>
                                    <SelectItem value="Eliminar">Eliminar</SelectItem>
                                  </SelectContent>
                                </Select>
                              ) : item.extra?.decision ? (
                                <Badge className={`text-[9px] px-1 ${isJaulaDecision(item.extra.decision) ? 'bg-orange-100 text-orange-800' : 'bg-red-100 text-red-800'}`}>{displayDecision(item.extra.decision)}</Badge>
                              ) : <span className="text-[11px] text-muted-foreground">—</span>}
                            </td>
                            {/* ETIQUETA: Días cuarentena — v2.50: solo si decisión = Retirar (va a jaula) */}
                            <td className="px-1 py-1 border bg-orange-50 text-center">
                              {isEliminarDecision(item.extra?.decision) ? (
                                <span className="text-muted-foreground">—</span>
                              ) : canEdit ? (
                                <Select value={String(item.extra?.diasCuarentena ?? 40)} onValueChange={val => handleUpdateExtra(item.id!, 'diasCuarentena', parseInt(val) || 40)}>
                                  <SelectTrigger className={inlineSelect}><SelectValue /></SelectTrigger>
                                  <SelectContent>
                                    {[7, 15, 20, 30, 40, 60, 90].map(d => <SelectItem key={d} value={String(d)}>{d}d</SelectItem>)}
                                  </SelectContent>
                                </Select>
                              ) : <span className="text-[11px]">{item.extra?.diasCuarentena ?? 40}d</span>}
                            </td>
                            {/* ETIQUETA ROJA — v2.52: botón impresión individual al seleccionar Retirar */}
                            <td className="px-1 py-1 border bg-rose-50 text-center">
                              {isEliminarDecision(item.extra?.decision) ? (
                                <span className="text-muted-foreground text-[10px]" title="No aplica: el elemento va a residuo">—</span>
                              ) : isJaulaDecision(item.extra?.decision) ? (
                                <div className="flex flex-col items-center gap-0.5">
                                  {item.extra?.etiquetaGenerada ? (
                                    <>
                                      {getEtiquetaBadge(item)}
                                      {item.id && (
                                        <TagPrinter
                                          items={[{
                                            nombre: item.name,
                                            ubicacion: item.location || currentZone?.name || currentProject?.name || '',
                                            cantidad: item.quantityUnneeded || item.quantity || 1,
                                            estado: String(item.extra?.estado ?? ''),
                                            frecuenciaUso: String(item.extra?.frecuenciaUso ?? ''),
                                            decision: 'Retirar',
                                            categoria: String(item.category ?? 'Innecesario'),
                                            fechaEntrada: item.jaulaFechaEntrada,
                                            fechaRevision: (() => {
                                              const dias = Number(item.extra?.diasCuarentena ?? 40);
                                              if (!item.jaulaFechaEntrada) return null;
                                              try {
                                                const d = new Date(item.jaulaFechaEntrada);
                                                d.setDate(d.getDate() + dias);
                                                return d.toISOString();
                                              } catch { return null; }
                                            })(),
                                            diasCuarentena: Number(item.extra?.diasCuarentena ?? 40),
                                            zonaOrigen: item.zonaOrigen || item.jaulaOrigen || currentZone?.name || '',
                                          }]}
                                          itemIds={[item.id]}
                                          onAfterPrint={() => loadInventory()}
                                        />
                                      )}
                                    </>
                                  ) : (
                                    <Badge className="bg-rose-100 text-rose-800 text-[8px] px-1 py-0 whitespace-nowrap" title="La etiqueta se generará automáticamente al guardar">
                                      Pendiente
                                    </Badge>
                                  )}
                                </div>
                              ) : <span className="text-[11px] text-muted-foreground">—</span>}
                            </td>
                          </>
                        ) : (
                          config.extraFields.slice(0, 2).map(f => (
                            <td key={f.key} className={`px-1 py-1 border ${specBg} text-center text-[11px]`}>
                              {getExtraValue(item, f.key)}
                            </td>
                          ))
                        )}
                        {/* UBICACIÓN: Z. Origen — v2.50: en S1 auto-fill desde la zona actual (read-only); S2-S5 editable */}
                        <td className={`px-1 py-1 border ${locBg} text-center`}>
                          {sStep === 1 ? (
                            <span className="text-[11px] text-muted-foreground" title="Zona de origen automática: derivada de la zona actual">
                              {item.zonaOrigen || currentZone?.name || currentProject?.name || '—'}
                            </span>
                          ) : canEdit ? (
                            currentProject?.zones && currentProject.zones.length > 0 ? (
                              <Select value={item.zonaOrigen || undefined} onValueChange={val => handleUpdateField(item.id!, 'zonaOrigen', val)}>
                                <SelectTrigger className={inlineSelect}><SelectValue placeholder="—" /></SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="_clear_">—</SelectItem>
                                  {currentProject.zones.map(z => <SelectItem key={z.id} value={z.name}>{z.name}</SelectItem>)}
                                </SelectContent>
                              </Select>
                            ) : (
                              <Input value={item.zonaOrigen || ''} className={inlineInput} placeholder="—"
                                onKeyDown={e => commitOnEnter(e, () => handleUpdateField(item.id!, 'zonaOrigen', (e.target as HTMLInputElement).value))}
                                onBlur={e => handleUpdateField(item.id!, 'zonaOrigen', e.target.value)} />
                            )
                          ) : <span className="text-[11px] text-muted-foreground">{item.zonaOrigen || '—'}</span>}
                        </td>
                        {/* UBICACIÓN: Z. Destino — v2.50: en S1 auto-determinada por decisión (Jaula/Residuo, read-only); S2-S5 editable */}
                        <td className={`px-1 py-1 border ${locBg} text-center`}>
                          {sStep === 1 && item.category === 'innecesario' ? (
                            <span className={`text-[11px] font-medium ${isEliminarDecision(item.extra?.decision) ? 'text-yellow-700' : 'text-red-600'}`}>
                              {isEliminarDecision(item.extra?.decision) ? 'Residuo' : 'Jaula'}
                            </span>
                          ) : canEdit ? (
                            <Select value={item.zonaDestino || undefined}
                              onValueChange={val => {
                                const targetZone = currentProject?.zones?.find(z => z.name === val);
                                const updates: any = { zonaDestino: val };
                                if (targetZone) updates.zoneId = targetZone.id;
                                handleUpdateJaula(item.id!, updates);
                              }}>
                              <SelectTrigger className={inlineSelect}><SelectValue placeholder="—" /></SelectTrigger>
                              <SelectContent>
                                <SelectItem value="_clear_">—</SelectItem>
                                {currentProject?.zones?.map(z => <SelectItem key={z.id} value={z.name}>{z.name}</SelectItem>) || []}
                              </SelectContent>
                            </Select>
                          ) : <span className="text-[11px] text-muted-foreground">{item.zonaDestino || '—'}</span>}
                        </td>
                        {/* Fotos — v2.50: sin botón "añadir más fotos", click en la miniatura abre lightbox negro */}
                        <td className="px-1 py-1 border bg-gray-50">
                          <div className="flex items-center gap-1 flex-wrap">
                            {(itemPhotos[item.id!] || item.photos || []).map(photo => (
                              <div key={photo.id} className="relative group">
                                <img src={photo.photoUrl} alt={photo.title}
                                  className="w-8 h-8 object-cover rounded border cursor-pointer hover:opacity-80 transition-opacity"
                                  onClick={() => setShowPhotoLightbox(photo)}
                                  title={`${photo.photoType === 'antes' ? 'Antes' : photo.photoType === 'despues' ? 'Después' : photo.photoType} — ${photo.title}`} />
                                <Badge className={`absolute -top-1 -left-1 text-[7px] px-0.5 py-0 min-w-0 ${photo.photoType === 'antes' ? 'bg-amber-100 text-amber-800' : photo.photoType === 'despues' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                  {photo.photoType === 'antes' ? 'A' : photo.photoType === 'despues' ? 'D' : 'R'}
                                </Badge>
                                {!isReadOnly && (photo as any).miniStep !== 2 && (
                                  <button className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-3.5 h-3.5 flex items-center justify-center text-[8px] opacity-0 group-hover:opacity-100 transition-opacity"
                                    onClick={(e) => { e.stopPropagation(); handleDeletePhoto(photo.id, item.id!); }} title="Eliminar foto">×</button>
                                )}
                              </div>
                            ))}
                          </div>
                        </td>
                        {/* Delete — v2.52: candado eliminado; cualquier item se puede borrar */}
                        <td className="px-1 py-1 border bg-gray-50">
                          {isReadOnly ? (
                            <span className="text-[10px] text-muted-foreground">—</span>
                          ) : (
                            <Button variant="ghost" size="sm" className="h-7 text-destructive"
                              onClick={() => item.id && handleDeleteItem(item.id)} title="Eliminar elemento">×</Button>
                          )}
                        </td>
                      </tr>
                    );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {/* Submit button */}
            <div className="flex justify-end items-center gap-3 flex-wrap">
              {unclassifiedPhotosCount > 0 && (
                <span className="text-xs text-red-600 font-medium">
                  ⚠ {unclassifiedPhotosCount} foto(s) del Paso 2 sin clasificar
                </span>
              )}
              {pendingDraftsCount > 0 && (
                <span className="text-xs text-red-600 font-medium" title="Elementos creados automáticamente al tomar fotos en el Paso 2. Edita su nombre o categoría para clasificarlos.">
                  ⚠ {pendingDraftsCount} elemento(s) pendiente(s) de clasificar
                </span>
              )}
              <Button
                onClick={handleComplete}
                disabled={!canComplete || items.length === 0 || isReadOnly}
                style={canComplete ? { backgroundColor: sStepData?.color } : undefined}
              >
                Completar Inventario{sStep === 1 ? '' : ` (${classifyPercent}% clasificado)`}
              </Button>
            </div>
          </div>
        )}
        </div>
      </DialogContent>
    </Dialog>

      {/* Layout Editor — rendered OUTSIDE the InventarioModal Dialog to avoid nested Dialog issues */}
      <LayoutEditor
        open={showLayoutEditor}
        onClose={() => setShowLayoutEditor(false)}
        onSave={() => { setShowLayoutEditor(false); loadLayouts() }}
        sStep={sStep}
      />

      {/* Color Code Table for S2 */}
      {sStep === 2 && (
        <ColorCodeTable
          open={showColorCodeTable}
          onClose={() => setShowColorCodeTable(false)}
        />
      )}

      {/* Photo Lightbox — Full-size photo preview */}
      {/* v2.50: Lightbox con fondo negro — al pulsar la foto sale sobre un overlay oscuro */}
      <Dialog open={!!showPhotoLightbox} onOpenChange={() => setShowPhotoLightbox(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0 bg-black border-0 [&>button]:text-white [&>button]:hover:bg-white/10">
          {showPhotoLightbox && (
            <div className="flex flex-col">
              <div className="relative">
                <img
                  src={showPhotoLightbox.photoUrl}
                  alt={showPhotoLightbox.title}
                  className="w-full max-h-[80vh] object-contain bg-black"
                />
                <Badge className={`absolute top-2 left-2 ${showPhotoLightbox.photoType === 'antes' ? 'bg-amber-100 text-amber-800' : showPhotoLightbox.photoType === 'despues' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                  {showPhotoLightbox.photoType === 'antes' ? 'Antes' : showPhotoLightbox.photoType === 'despues' ? 'Después' : showPhotoLightbox.photoType}
                </Badge>
              </div>
              <div className="px-3 py-2 bg-black text-white">
                <h4 className="text-sm font-medium">{showPhotoLightbox.title}</h4>
                {showPhotoLightbox.description && (
                  <p className="text-xs text-gray-300">{showPhotoLightbox.description}</p>
                )}
                <p className="text-[10px] text-gray-400 mt-1">
                  {new Date(showPhotoLightbox.createdAt).toLocaleString('es-ES')}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
