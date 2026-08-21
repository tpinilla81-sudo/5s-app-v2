'use client';

/**
 * v2.106 — NokInventarioRow
 * ─────────────────────────────────────────────────────────────
 * Tabla MULTI-FILA idéntica a la del InventarioModal (Paso 3 · S1 — Seiri)
 * que se renderiza dentro de cada NOK de Autoevaluación (Paso 4) y
 * Auditoría (Paso 5).
 *
 * Replica EXACTAMENTE:
 *   • Las bandas de color del header (sky / emerald / red / orange / rose / amber / gray)
 *   • El orden y los nombres de columnas (Elemento, Ubicación, Categoría, Cantidad,
 *     Precio, Estado, Frec. uso, Decisión, Días cuar., Etiquetas, Z. Origen, Z. Destino,
 *     Fotos, ×)
 *   • Los colores pastel de cada celda (bg-sky-50, bg-emerald-50, bg-red-50, etc.)
 *   • El estilo de inputs inline (h-6, text-[10px], border-0, bg-transparent)
 *   • La columna Fotos con miniaturas + botón × (eliminar foto) + botón "+" (añadir foto)
 *   • El botón "+ Añadir línea" al final de la tabla para crear otra fila
 *
 * Diferencias con el Paso 3:
 *   • NO persiste cada cambio con PUT inmediato (no hay items en DB hasta que
 *     se haga submit del modal y se cree el ActionItem).
 *   • Las fotos se guardan en memoria (File[]) y se suben al guardar el modal.
 *   • El state lo gestiona el modal padre via `value: NokInventoryData[]` /
 *     `onChange: (next: NokInventoryData[]) => void` y
 *     `photosByRow: Record<string, File[]>` / `onPhotosChange`.
 */
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, X, Camera } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export interface NokInventoryData {
  rowId: string;            // ID único de la fila (para gestionar fotos por fila)
  elemento: string;
  ubicacion: string;
  cantidad: number;
  precio: number | null;   // v2.106: precio editable (igual que Paso 3)
  estado: string;           // 'Bueno' | 'Regular' | 'Malo' | ''
  decision: 'Retirar' | 'Eliminar' | '';
  diasCuarentena: number;
  zonaOrigen: string;
}

export const DEFAULT_NOK_INVENTORY_DATA: NokInventoryData = {
  rowId: '',
  elemento: '',
  ubicacion: '',
  cantidad: 1,
  precio: null,
  estado: '',
  decision: '',
  diasCuarentena: 40,
  zonaOrigen: '',
};

export const DEFAULT_NOK_INVENTORY_ROWS: NokInventoryData[] = [
  { ...DEFAULT_NOK_INVENTORY_DATA, rowId: 'nok-row-' + Date.now() },
];

interface NokInventarioRowProps {
  value: NokInventoryData[];                     // array de filas
  onChange: (next: NokInventoryData[]) => void;  // setter del array
  photosByRow: Record<string, File[]>;           // fotos en memoria por rowId
  onPhotosChange: (rowId: string, photos: File[]) => void;
  defaultElemento: string; // title del ítem del checklist
  defaultZonaName: string; // zona actual
}

// Mismas clases inline que InventarioModal.tsx línea 2149-2150
const inlineInput = 'h-6 text-[10px] border-0 p-0 px-1 bg-transparent';
const inlineSelect = 'h-6 text-[10px] border-0 p-0 bg-transparent';

// Generador de IDs únicos para nuevas filas
const genRowId = () => 'nok-row-' + Date.now() + '-' + Math.random().toString(36).slice(2, 8);

export default function NokInventarioRow({
  value,
  onChange,
  photosByRow,
  onPhotosChange,
  defaultElemento,
  defaultZonaName,
}: NokInventarioRowProps) {
  // Si no hay filas, inicializar con una fila vacía
  const rows = value.length > 0 ? value : [{ ...DEFAULT_NOK_INVENTORY_DATA, rowId: 'nok-row-init' }];

  const patchRow = (rowId: string, patch: Partial<NokInventoryData>) => {
    onChange(rows.map(r => r.rowId === rowId ? { ...r, ...patch } : r));
  };

  const addRow = () => {
    onChange([
      ...rows,
      { ...DEFAULT_NOK_INVENTORY_DATA, rowId: genRowId(), elemento: defaultElemento },
    ]);
  };

  const removeRow = (rowId: string) => {
    onChange(rows.filter(r => r.rowId !== rowId));
    onPhotosChange(rowId, []); // limpiar fotos de la fila eliminada
  };

  const handlePhotoSelect = (rowId: string, files: FileList | null) => {
    if (!files || files.length === 0) return;
    const existing = photosByRow[rowId] || [];
    onPhotosChange(rowId, [...existing, ...Array.from(files)]);
  };

  const removePhoto = (rowId: string, idx: number) => {
    const existing = photosByRow[rowId] || [];
    onPhotosChange(rowId, existing.filter((_, i) => i !== idx));
  };

  return (
    <div className="rounded-md border border-sky-200 overflow-x-auto">
      {/* Título — pequeño banner para contexto */}
      <div className="flex items-center gap-1.5 text-[10px] font-semibold text-sky-700 uppercase tracking-wide bg-sky-50 px-2 py-1 border-b border-sky-200">
        <span className="inline-block w-1.5 h-1.5 bg-sky-500 rounded-full" />
        Datos para el Plan de Acción (igual que Paso 3 · Inventario)
      </div>

      <table className="w-full text-xs border-collapse">
        <thead className="sticky top-0 z-10">
          {/* ── Row 1: Group headers (colored bands like Plan de Acción / Inventario) ── */}
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
        </thead>
        <tbody>
          {rows.map((row, idx) => {
            const elemento = row.elemento || defaultElemento;
            const zonaOrigen = row.zonaOrigen || defaultZonaName;
            const ubicacion = row.ubicacion || defaultZonaName;
            const zonaDestino =
              row.decision === 'Retirar' ? 'Jaula'
              : row.decision === 'Eliminar' ? 'Residuo'
              : '';
            const rowPhotos = photosByRow[row.rowId] || [];

            // Etiqueta: igual que S1 (Pendiente si Retirar sin generar, — si Eliminar)
            const etiquetaCell = !row.decision ? (
              <span className="text-[11px] text-muted-foreground">—</span>
            ) : row.decision === 'Eliminar' ? (
              <span className="text-muted-foreground text-[10px]" title="No aplica: el elemento va a residuo">—</span>
            ) : (
              <Badge className="bg-rose-100 text-rose-800 text-[8px] px-1 py-0 whitespace-nowrap" title="La etiqueta se generará al cerrar la acción en el Plan">
                Pendiente
              </Badge>
            );

            return (
              <tr key={row.rowId} className="border-b bg-red-50/30">
                {/* IDENTIFICACIÓN: Elemento */}
                <td className="px-1 py-1 border bg-sky-50 font-medium">
                  <Input
                    value={elemento}
                    onChange={e => patchRow(row.rowId, { elemento: e.target.value })}
                    placeholder={defaultElemento}
                    className={`${inlineInput} w-full`}
                  />
                </td>
                {/* IDENTIFICACIÓN: Ubicación — auto-fill zona actual (igual que S1) */}
                <td className="px-1 py-1 border bg-sky-50">
                  <span className="text-[11px] text-muted-foreground" title="Ubicación automática: derivada de la zona actual">
                    {ubicacion || '—'}
                  </span>
                </td>
                {/* IDENTIFICACIÓN: Categoría — S1 siempre 'Innecesario' (badge rojo) */}
                <td className="px-1 py-1 border bg-sky-50 text-center">
                  <Badge className="text-[9px] px-1 py-0 bg-red-100 text-red-800 whitespace-nowrap" title="En S1 (Seiri) todos los elementos inventariados son innecesarios por definición">
                    Innecesario
                  </Badge>
                </td>
                {/* CANTIDAD/VALOR: Cantidad */}
                <td className="px-1 py-1 border bg-emerald-50 text-center">
                  <Input
                    type="number"
                    min={1}
                    value={row.cantidad || 1}
                    onChange={e => patchRow(row.rowId, { cantidad: parseInt(e.target.value) || 1 })}
                    className={`${inlineInput} w-12 text-center`}
                  />
                </td>
                {/* CANTIDAD/VALOR: Precio — v2.106 editable (igual que Paso 3) */}
                <td className="px-1 py-1 border bg-emerald-50 text-right">
                  <Input
                    type="number"
                    min={0}
                    step="0.01"
                    value={row.precio ?? ''}
                    placeholder="—"
                    onChange={e => {
                      const val = e.target.value ? parseFloat(e.target.value) : null;
                      patchRow(row.rowId, { precio: val });
                    }}
                    className={`${inlineInput} w-16 text-right`}
                  />
                </td>
                {/* CLASIFICACIÓN: Estado */}
                <td className="px-1 py-1 border bg-red-50 text-center">
                  <Select
                    value={row.estado || '_clear_'}
                    onValueChange={v => patchRow(row.rowId, { estado: v === '_clear_' ? '' : v })}
                  >
                    <SelectTrigger className={inlineSelect}>
                      <SelectValue placeholder="—" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="_clear_">—</SelectItem>
                      <SelectItem value="Bueno">Bueno</SelectItem>
                      <SelectItem value="Regular">Regular</SelectItem>
                      <SelectItem value="Malo">Malo</SelectItem>
                    </SelectContent>
                  </Select>
                </td>
                {/* CLASIFICACIÓN: Frec. uso — No aplica (innecesario) */}
                <td className="px-1 py-1 border bg-red-50 text-center">
                  <span className="text-[11px] text-muted-foreground" title="No aplica: el elemento es innecesario y se retirará">
                    No aplica
                  </span>
                </td>
                {/* CLASIFICACIÓN: Decisión */}
                <td className="px-1 py-1 border bg-red-50 text-center">
                  <Select
                    value={row.decision || '_clear_'}
                    onValueChange={v => {
                      const newDecision = v === '_clear_' ? '' : (v as 'Retirar' | 'Eliminar');
                      patchRow(row.rowId, {
                        decision: newDecision,
                        ...(v === 'Eliminar' ? { diasCuarentena: 40 } : v === 'Retirar' ? { diasCuarentena: row.diasCuarentena || 40 } : {}),
                      });
                    }}
                  >
                    <SelectTrigger className={inlineSelect}>
                      <SelectValue placeholder="—" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Retirar">Retirar</SelectItem>
                      <SelectItem value="Eliminar">Eliminar</SelectItem>
                    </SelectContent>
                  </Select>
                </td>
                {/* ETIQUETA: Días cuarentena — solo si Retirar */}
                <td className="px-1 py-1 border bg-orange-50 text-center">
                  {!row.decision ? (
                    <span className="text-muted-foreground">—</span>
                  ) : row.decision === 'Eliminar' ? (
                    <span className="text-muted-foreground">—</span>
                  ) : (
                    <Select
                      value={String(row.diasCuarentena || 40)}
                      onValueChange={val => patchRow(row.rowId, { diasCuarentena: parseInt(val) || 40 })}
                    >
                      <SelectTrigger className={inlineSelect}><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {[7, 15, 20, 30, 40, 60, 90].map(d => (
                          <SelectItem key={d} value={String(d)}>{d}d</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </td>
                {/* ETIQUETA ROJA — Pendiente / — */}
                <td className="px-1 py-1 border bg-rose-50 text-center">
                  <div className="flex flex-col items-center gap-0.5">
                    {etiquetaCell}
                  </div>
                </td>
                {/* UBICACIÓN: Z. Origen — auto-fill zona actual */}
                <td className="px-1 py-1 border bg-amber-50 text-center">
                  <span className="text-[11px] text-muted-foreground" title="Zona de origen automática: derivada de la zona actual">
                    {zonaOrigen || '—'}
                  </span>
                </td>
                {/* UBICACIÓN: Z. Destino — Jaula / Residuo según decisión */}
                <td className="px-1 py-1 border bg-amber-50 text-center">
                  {row.decision ? (
                    <span className={`text-[11px] font-medium ${row.decision === 'Eliminar' ? 'text-yellow-700' : 'text-red-600'}`}>
                      {zonaDestino}
                    </span>
                  ) : (
                    <span className="text-[11px] text-muted-foreground">—</span>
                  )}
                </td>
                {/* FOTOS — v2.106: miniaturas + × + "+" para añadir (igual que Paso 3) */}
                <td className="px-1 py-1 border bg-gray-50">
                  <div className="flex items-center gap-1 flex-wrap">
                    {rowPhotos.map((photo, pIdx) => {
                      const preview = URL.createObjectURL(photo);
                      return (
                        <div key={pIdx} className="relative group">
                          <img
                            src={preview}
                            alt={`Foto ${pIdx + 1}`}
                            className="w-8 h-8 object-cover rounded border border-gray-300 bg-gray-100"
                          />
                          <button
                            className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 hover:scale-110 shadow-sm z-10"
                            onClick={() => removePhoto(row.rowId, pIdx)}
                            title="Eliminar foto"
                          >
                            <X className="h-2.5 w-2.5" />
                          </button>
                        </div>
                      );
                    })}
                    {/* Botón "+" para añadir foto a esta fila */}
                    <label
                      className="w-8 h-8 flex items-center justify-center rounded border border-dashed border-gray-400 bg-gray-50 hover:bg-gray-100 hover:border-gray-500 text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
                      title="Adjuntar foto a este elemento"
                    >
                      <span className="text-lg leading-none">+</span>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={e => {
                          handlePhotoSelect(row.rowId, e.target.files);
                          e.target.value = '';
                        }}
                      />
                    </label>
                  </div>
                </td>
                {/* Delete — × para eliminar la fila */}
                <td className="px-1 py-1 border bg-gray-50 text-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 text-destructive"
                    onClick={() => removeRow(row.rowId)}
                    title="Eliminar fila"
                    disabled={rows.length === 1}
                  >
                    ×
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Botón "+ Añadir línea" — al final de la tabla */}
      <div className="px-2 py-1.5 border-t border-sky-200 bg-sky-50/40">
        <Button
          variant="default"
          size="sm"
          onClick={addRow}
          className="bg-blue-600 hover:bg-blue-700 text-white text-xs h-7"
        >
          <Plus className="h-3 w-3 mr-1" /> Añadir línea
        </Button>
      </div>

      <p className="text-[9px] text-muted-foreground leading-tight px-2 py-1.5 bg-sky-50/40 border-t border-sky-200">
        Estos datos se traspasan automáticamente al Plan de Acción como filas
        del Inventario. Si eliges <strong>Retirar</strong>, el item pasará a la
        Jaula al cerrarse la acción; si eliges <strong>Eliminar</strong>, pasará
        a Residuo. Puedes añadir varias líneas con el botón <strong>+ Añadir línea</strong>.
      </p>
    </div>
  );
}
