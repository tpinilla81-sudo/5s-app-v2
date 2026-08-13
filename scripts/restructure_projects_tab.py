#!/usr/bin/env python3
"""
Restructure the Projects tab in AdminPanel.tsx so that:

  CAJA 1 — "Proyectos Activos"  →  contains the header AND the list of
  existing projects (each expandable with zones + members, all the
  existing editing capabilities preserved).

  CAJA 2 — "Abrir Nuevo Proyecto"  →  separate box BELOW caja 1, with
  the new-project form enhanced to also accept users (existing or new)
  per zone at creation time.

The script does the rewrite by:
  1. Locating the projects tab boundaries (line ranges).
  2. Splitting the tab body into three logical chunks:
       BOX1_BANNER  — header banner (currently with a "Nuevo Proyecto" button)
       BOX2_OLD     — old "Crear Nuevo" form (collapsed)
       LIST         — projects list (with expandable cards)
  3. Reassembling as:
       BOX1_OPEN + BOX1_BANNER (no button) + LIST + BOX1_CLOSE
       + NEW_BOX2 (renamed + enhanced with users section)
  4. Adding the necessary state declarations and updating handleCreateProject
     to also create the members after the project is created.
"""

import re
import sys
from pathlib import Path

PATH = Path('/home/z/my-project/src/components/admin/AdminPanel.tsx')
src = PATH.read_text()
lines = src.splitlines(keepends=True)

# ---------------------------------------------------------------------------
# 1. Locate key boundaries by content
# ---------------------------------------------------------------------------

def find_line(needle, start=0):
    for i in range(start, len(lines)):
        if needle in lines[i]:
            return i
    raise RuntimeError(f'not found: {needle!r}')

# Projects tab boundaries
TAB_OPEN      = find_line('{activeTab === \'projects\' && (')
MOTION_OPEN   = find_line('<motion.div key="projects"', TAB_OPEN)
SEC1_COMMENT  = find_line('SECCIÓN 1: PROYECTOS ACTIVOS', MOTION_OPEN)
BOX1_OPEN     = find_line('<div className="rounded-lg border border-blue-100', SEC1_COMMENT)

# Box1 banner closes at the line that contains "</div>" right after the
# "Nuevo Proyecto" button. We look for the button first.
BTN_NEWPROJ   = find_line('<Plus className="h-4 w-4 mr-1" /> Nuevo Proyecto', BOX1_OPEN)

# After the button line, we have:
#   </Button>
#   </div>          <- closes the flex header
#   </div>          <- closes BOX1_OPEN
# Find both closes.
HEADER_CLOSE  = find_line('</div>', BTN_NEWPROJ + 1)
BOX1_CLOSE    = find_line('</div>', HEADER_CLOSE + 1)

# Box 2 starts after box 1 closes
SEC2_COMMENT  = find_line('SECCIÓN 2: CREAR NUEVO', BOX1_CLOSE)
BOX2_OPEN     = find_line('<div id="crear-nuevo-proyecto"', SEC2_COMMENT)

# Box 2 closes just before the LIST comment
LIST_COMMENT  = find_line('LISTA DE PROYECTOS ACTIVOS', BOX2_OPEN)
# Walk back from LIST_COMMENT to find the box 2 closing </div>
# Pattern:
#   )}            <- closing of the ternary  (line X-3)
#   </div>        <- closes CardContent? no, actually the structure is:
#   </div>        <- closes the inner section
# Let me find by scanning back for the </motion.div>? No, motion.div is the outer.

# Actually let's just find the line BEFORE LIST_COMMENT that is the blank
# line, and the line BEFORE that which is the box-2 closing </div>.
# From earlier inspection:
#   1290: )}
#   1291: </div>      <- box 2 closes
#   1292: (blank)
#   1293: {comment LISTA}
# So BOX2_CLOSE is the line at LIST_COMMENT - 2 (the </div>),
# but only if line LIST_COMMENT - 1 is blank.
# Let's be more robust: scan backwards from LIST_COMMENT to find the
# last "</div>" line that is followed by a blank line and then the
# LIST_COMMENT line.
BOX2_CLOSE = None
for i in range(LIST_COMMENT - 1, BOX2_OPEN, -1):
    if lines[i].strip() == '</div>' and lines[i+1].strip() == '' and 'LISTA DE PROYECTOS ACTIVOS' in lines[i+2]:
        BOX2_CLOSE = i
        break
if BOX2_CLOSE is None:
    # Fallback: assume immediate structure
    BOX2_CLOSE = LIST_COMMENT - 2
print(f'BOX2_CLOSE candidate line {BOX2_CLOSE+1}: {lines[BOX2_CLOSE]!r}')

# The list block ends right before "</motion.div>" that closes the projects tab.
# Find the next "</motion.div>" after LIST_COMMENT.
MOTION_CLOSE = None
depth = 0
for i in range(LIST_COMMENT, len(lines)):
    if '<motion.div' in lines[i]:
        depth += 1
    if '</motion.div>' in lines[i]:
        if depth == 0:
            MOTION_CLOSE = i
            break
        depth -= 1
if MOTION_CLOSE is None:
    raise RuntimeError('could not find projects tab motion.div close')

# The list block is from LIST_COMMENT to MOTION_CLOSE - 1 (inclusive).
# Right before MOTION_CLOSE there's a closing:
#   )}              <- closes the list ternary
# So LIST_END is the line with )} right before MOTION_CLOSE.
LIST_END = MOTION_CLOSE - 1
# Walk back over blank lines
while LIST_END > LIST_COMMENT and lines[LIST_END].strip() == '':
    LIST_END -= 1
# Now LIST_END points to the last non-blank line of the list block (usually `)}`)
print(f'List block: lines {LIST_COMMENT+1} .. {LIST_END+1}')

# ---------------------------------------------------------------------------
# 2. Extract chunks
# ---------------------------------------------------------------------------

# BOX1_BANNER: from BOX1_OPEN+1 (after the box1 opening div) up to and
# including BOX1_CLOSE. We want the header banner (without the outer box
# div) so we can place it inside the new wrapper.
banner_lines = lines[BOX1_OPEN+1 : BOX1_CLOSE+1]
# Remove the "Nuevo Proyecto" button from the banner.
# The button block starts at the line containing `<Button` before BTN_NEWPROJ
# and ends at the line containing `</Button>` after.
btn_start = None
btn_end = None
for i in range(len(banner_lines)):
    if '<Button' in banner_lines[i] and btn_start is None:
        # Make sure it's the Nuevo Proyecto button (it's the only Button in the banner)
        btn_start = i
    if '</Button>' in banner_lines[i] and btn_start is not None:
        btn_end = i
        break
if btn_start is None or btn_end is None:
    raise RuntimeError('could not find Nuevo Proyecto button in banner')
# Remove button lines (btn_start .. btn_end inclusive)
del banner_lines[btn_start : btn_end + 1]

# List block lines (including the LIST_COMMENT line)
list_lines = lines[LIST_COMMENT : LIST_END + 1]

# Box 2 form lines (from BOX2_OPEN+1 to BOX2_CLOSE inclusive), but we will
# rewrite the header text and enhance the form. We keep the form body
# (Card, inputs, zones) but rename header to "Abrir Nuevo Proyecto".
# We'll just save the inner form content and rebuild the wrapper.
box2_inner = lines[BOX2_OPEN+1 : BOX2_CLOSE]

# ---------------------------------------------------------------------------
# 3. Build the new tab body
# ---------------------------------------------------------------------------

IND = '              '  # 14 spaces — matches the existing indentation

# Build new box 1 (Proyectos Activos wrapping the list)
new_box1 = []
new_box1.append(IND + '{/* ─────────── CAJA 1: PROYECTOS ACTIVOS (contiene la lista) ─────────── */}\n')
new_box1.append(IND + '<div className="rounded-lg border border-blue-100 bg-blue-50/30 p-3 space-y-3">\n')
# Header banner (without the button, already stripped)
new_box1.extend(banner_lines)
# Inside the box1, the list
new_box1.append(IND + '\n')
# Re-indent the list lines if necessary. They were already at IND level.
new_box1.extend(list_lines)
# Close box 1
new_box1.append(IND + '</div>\n')

# Build new box 2 (Abrir Nuevo Proyecto, enhanced with users section)
new_box2 = []
new_box2.append(IND + '\n')
new_box2.append(IND + '{/* ─────────── CAJA 2: ABRIR NUEVO PROYECTO ─────────── */}\n')
new_box2.append(IND + '<div id="crear-nuevo-proyecto" className="rounded-lg border border-purple-200 bg-purple-50/30 p-3">\n')
new_box2.append(IND + '  <div className="flex items-center justify-between mb-2">\n')
new_box2.append(IND + '    <div className="flex items-center gap-2">\n')
new_box2.append(IND + '      <div className="w-7 h-7 rounded-md bg-purple-500/15 flex items-center justify-center">\n')
new_box2.append(IND + '        <Plus className="h-4 w-4 text-purple-600" />\n')
new_box2.append(IND + '      </div>\n')
new_box2.append(IND + '      <div>\n')
new_box2.append(IND + '        <h3 className="text-sm font-semibold text-gray-900">Abrir Nuevo Proyecto</h3>\n')
new_box2.append(IND + '        <p className="text-[11px] text-muted-foreground">\n')
new_box2.append(IND + '          Da de alta un proyecto nuevo con sus zonas y usuarios (existentes o nuevos).\n')
new_box2.append(IND + '        </p>\n')
new_box2.append(IND + '      </div>\n')
new_box2.append(IND + '    </div>\n')
new_box2.append(IND + '    {showNewProject && (\n')
new_box2.append(IND + '      <Button variant="ghost" size="sm" onClick={() => setShowNewProject(false)} className="h-7 text-xs">\n')
new_box2.append(IND + '        <X className="h-3.5 w-3.5 mr-1" /> Cerrar formulario\n')
new_box2.append(IND + '      </Button>\n')
new_box2.append(IND + '    )}\n')
new_box2.append(IND + '  </div>\n')
new_box2.append(IND + '\n')
# Toggle: collapsed if there are existing projects
new_box2.append(IND + '  {!showNewProject && allProjects.length > 0 ? (\n')
new_box2.append(IND + '    <Button\n')
new_box2.append(IND + '      variant="outline"\n')
new_box2.append(IND + '      size="sm"\n')
new_box2.append(IND + '      onClick={() => setShowNewProject(true)}\n')
new_box2.append(IND + '      className="w-full border-dashed border-purple-300 text-purple-700 hover:bg-purple-100 bg-white/60"\n')
new_box2.append(IND + '    >\n')
new_box2.append(IND + '      <Plus className="h-4 w-4 mr-2" />\n')
new_box2.append(IND + '      Abrir formulario de creación\n')
new_box2.append(IND + '    </Button>\n')
new_box2.append(IND + '  ) : (\n')
new_box2.append(IND + '    <Card className="border-purple-200 bg-white/70">\n')
new_box2.append(IND + '      <CardHeader className="pb-3">\n')
new_box2.append(IND + '        <CardTitle className="text-sm flex items-center gap-2">\n')
new_box2.append(IND + '          <Plus className="h-4 w-4 text-purple-500" />\n')
new_box2.append(IND + '          Crear Nuevo Proyecto\n')
new_box2.append(IND + '        </CardTitle>\n')
new_box2.append(IND + '      </CardHeader>\n')
new_box2.append(IND + '      <CardContent className="space-y-3">\n')
# Project name + company row
new_box2.append(IND + '        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">\n')
new_box2.append(IND + '          <div className="space-y-1">\n')
new_box2.append(IND + '            <Label className="text-xs">Nombre del Proyecto *</Label>\n')
new_box2.append(IND + '            <Input placeholder="Nombre" value={newProjectName} onChange={e => setNewProjectName(e.target.value)} />\n')
new_box2.append(IND + '          </div>\n')
new_box2.append(IND + '          <div className="space-y-1">\n')
new_box2.append(IND + '            <Label className="text-xs">Empresa *</Label>\n')
new_box2.append(IND + '            {companies.length > 0 && !isNewCompanyCustom ? (\n')
new_box2.append(IND + '              <div className="space-y-1">\n')
new_box2.append(IND + '                <Select\n')
new_box2.append(IND + '                  value={newProjectCompany ? (companies.find(c => c.name === newProjectCompany)?.id || \'\') : undefined}\n')
new_box2.append(IND + '                  onValueChange={val => {\n')
new_box2.append(IND + '                    if (val === \'__custom__\') {\n')
new_box2.append(IND + '                      setNewProjectCompany(\'\')\n')
new_box2.append(IND + '                      setIsNewCompanyCustom(true)\n')
new_box2.append(IND + '                    } else {\n')
new_box2.append(IND + '                      const comp = companies.find(c => c.id === val)\n')
new_box2.append(IND + '                      if (comp) setNewProjectCompany(comp.name)\n')
new_box2.append(IND + '                    }\n')
new_box2.append(IND + '                  }}\n')
new_box2.append(IND + '                >\n')
new_box2.append(IND + '                  <SelectTrigger>\n')
new_box2.append(IND + '                    <SelectValue placeholder="Seleccionar empresa" />\n')
new_box2.append(IND + '                  </SelectTrigger>\n')
new_box2.append(IND + '                  <SelectContent>\n')
new_box2.append(IND + '                    {companies.map(c => (\n')
new_box2.append(IND + '                      <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>\n')
new_box2.append(IND + '                    ))}\n')
new_box2.append(IND + '                    <SelectItem value="__custom__">+ Otra empresa...</SelectItem>\n')
new_box2.append(IND + '                  </SelectContent>\n')
new_box2.append(IND + '                </Select>\n')
new_box2.append(IND + '              </div>\n')
new_box2.append(IND + '            ) : (\n')
new_box2.append(IND + '              <div className="space-y-1">\n')
new_box2.append(IND + '                <Input placeholder="Nombre de la nueva empresa" value={newProjectCompany} onChange={e => setNewProjectCompany(e.target.value)} />\n')
new_box2.append(IND + '                {companies.length > 0 && (\n')
new_box2.append(IND + '                  <Button variant="ghost" size="sm" onClick={() => { setIsNewCompanyCustom(false); setNewProjectCompany(\'\') }} className="h-6 text-xs text-purple-600 p-0">\n')
new_box2.append(IND + '                    ← Seleccionar empresa existente\n')
new_box2.append(IND + '                  </Button>\n')
new_box2.append(IND + '                )}\n')
new_box2.append(IND + '              </div>\n')
new_box2.append(IND + '            )}\n')
new_box2.append(IND + '          </div>\n')
new_box2.append(IND + '        </div>\n')
# Description
new_box2.append(IND + '        <div className="space-y-1">\n')
new_box2.append(IND + '          <Label className="text-xs">Descripción</Label>\n')
new_box2.append(IND + '          <Input placeholder="Descripción del proyecto (opcional)" value={newProjectDesc} onChange={e => setNewProjectDesc(e.target.value)} />\n')
new_box2.append(IND + '        </div>\n')
# Zones section
new_box2.append(IND + '        <div className="space-y-2">\n')
new_box2.append(IND + '          <div className="flex items-center justify-between">\n')
new_box2.append(IND + '            <Label className="text-xs">Zonas *</Label>\n')
new_box2.append(IND + '            <Button variant="ghost" size="sm" onClick={() => setNewProjectZones([...newProjectZones, { name: \'\', color: PRESET_COLORS[newProjectZones.length % PRESET_COLORS.length] }])} className="h-6 text-xs text-purple-600">\n')
new_box2.append(IND + '              <Plus className="h-3 w-3 mr-1" /> Agregar zona\n')
new_box2.append(IND + '            </Button>\n')
new_box2.append(IND + '          </div>\n')
new_box2.append(IND + '          {newProjectZones.map((zone, idx) => (\n')
new_box2.append(IND + '            <div key={idx} className="flex items-center gap-2">\n')
new_box2.append(IND + '              <button\n')
new_box2.append(IND + '                type="button"\n')
new_box2.append(IND + '                className="w-6 h-6 rounded-full border-2 flex-shrink-0"\n')
new_box2.append(IND + '                style={{ backgroundColor: zone.color, borderColor: zone.color }}\n')
new_box2.append(IND + '                onClick={() => {\n')
new_box2.append(IND + '                  const next = PRESET_COLORS[(PRESET_COLORS.indexOf(zone.color) + 1) % PRESET_COLORS.length]\n')
new_box2.append(IND + '                  const updated = [...newProjectZones]\n')
new_box2.append(IND + '                  updated[idx] = { ...updated[idx], color: next }\n')
new_box2.append(IND + '                  setNewProjectZones(updated)\n')
new_box2.append(IND + '                }}\n')
new_box2.append(IND + '              />\n')
new_box2.append(IND + '              <Input\n')
new_box2.append(IND + '                placeholder="Nombre de la zona"\n')
new_box2.append(IND + '                value={zone.name}\n')
new_box2.append(IND + '                onChange={e => {\n')
new_box2.append(IND + '                  const updated = [...newProjectZones]\n')
new_box2.append(IND + '                  updated[idx] = { ...updated[idx], name: e.target.value }\n')
new_box2.append(IND + '                  setNewProjectZones(updated)\n')
new_box2.append(IND + '                }}\n')
new_box2.append(IND + '                className="flex-1"\n')
new_box2.append(IND + '              />\n')
new_box2.append(IND + '              {newProjectZones.length > 1 && (\n')
new_box2.append(IND + '                <Button variant="ghost" size="sm" onClick={() => setNewProjectZones(newProjectZones.filter((_, i) => i !== idx))} className="h-8 w-8 p-0 text-red-400 hover:text-red-600">\n')
new_box2.append(IND + '                  <X className="h-4 w-4" />\n')
new_box2.append(IND + '                </Button>\n')
new_box2.append(IND + '              )}\n')
new_box2.append(IND + '            </div>\n')
new_box2.append(IND + '          ))}\n')
new_box2.append(IND + '        </div>\n')

# Users section (NEW): allow adding existing or new users to the new project
new_box2.append(IND + '        {/* ─── USUARIOS (existentes o nuevos) ─── */}\n')
new_box2.append(IND + '        <div className="space-y-2">\n')
new_box2.append(IND + '          <div className="flex items-center justify-between">\n')
new_box2.append(IND + '            <Label className="text-xs flex items-center gap-1">\n')
new_box2.append(IND + '              <Users className="h-3 w-3" /> Usuarios del proyecto (opcional)\n')
new_box2.append(IND + '            </Label>\n')
new_box2.append(IND + '            <span className="text-[10px] text-muted-foreground">\n')
new_box2.append(IND + '              {newProjectMembers.length === 0 ? \'Aún no hay usuarios añadidos\' : `${newProjectMembers.length} usuario(s) añadido(s)`}\n')
new_box2.append(IND + '            </span>\n')
new_box2.append(IND + '          </div>\n')
# List already-added members
new_box2.append(IND + '          {newProjectMembers.length > 0 && (\n')
new_box2.append(IND + '            <div className="space-y-1.5">\n')
new_box2.append(IND + '              {newProjectMembers.map((m, idx) => (\n')
new_box2.append(IND + '                <div key={idx} className="flex items-center gap-2 rounded-md border border-purple-200 bg-purple-50/40 p-2 text-xs">\n')
new_box2.append(IND + '                  {m.mode === \'existing\' ? (\n')
new_box2.append(IND + '                    <Badge className="bg-blue-100 text-blue-700 border-0 text-[9px]">Existente</Badge>\n')
new_box2.append(IND + '                  ) : (\n')
new_box2.append(IND + '                    <Badge className="bg-green-100 text-green-700 border-0 text-[9px]">Nuevo</Badge>\n')
new_box2.append(IND + '                  )}\n')
new_box2.append(IND + '                  <span className="font-medium">{m.name}</span>\n')
new_box2.append(IND + '                  <span className="text-muted-foreground">({m.email})</span>\n')
new_box2.append(IND + '                  <Badge className={`${ROLE_COLORS[m.role] || \'bg-gray-100 text-gray-700 border-0\`} border-0 text-[9px]`}>{ROLE_LABELS[m.role] || m.role}</Badge>\n')
new_box2.append(IND + '                  <span className="text-muted-foreground text-[10px] ml-auto">\n')
new_box2.append(IND + '                    {m.zoneIdxs.length === 0\n')
new_box2.append(IND + '                      ? \'sin zona\'\n')
new_box2.append(IND + '                      : m.zoneIdxs.length === newProjectZones.length\n')
new_box2.append(IND + '                        ? \'todas las zonas\'\n')
new_box2.append(IND + '                        : `${m.zoneIdxs.length} zona(s)`}\n')
new_box2.append(IND + '                  </span>\n')
new_box2.append(IND + '                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-red-400 hover:text-red-600" onClick={() => setNewProjectMembers(newProjectMembers.filter((_, i) => i !== idx))} title="Quitar">\n')
new_box2.append(IND + '                    <X className="h-3 w-3" />\n')
new_box2.append(IND + '                  </Button>\n')
new_box2.append(IND + '                </div>\n')
new_box2.append(IND + '              ))}\n')
new_box2.append(IND + '            </div>\n')
new_box2.append(IND + '          )}\n')
# Add-member form (existing or new)
new_box2.append(IND + '          <Card className="border-purple-200 bg-white/60">\n')
new_box2.append(IND + '            <CardContent className="p-3 space-y-2">\n')
new_box2.append(IND + '              <div className="flex gap-1 bg-gray-100 p-1 rounded-md">\n')
new_box2.append(IND + '                <button type="button" onClick={() => setNpMemberMode(\'existing\')} className={`flex-1 h-7 text-xs font-medium rounded transition-colors ${npMemberMode === \'existing\' ? \'bg-white text-purple-700 shadow-sm\' : \'text-gray-600 hover:text-gray-800\'}`}>Asignar existente</button>\n')
new_box2.append(IND + '                <button type="button" onClick={() => setNpMemberMode(\'new\')} className={`flex-1 h-7 text-xs font-medium rounded transition-colors ${npMemberMode === \'new\' ? \'bg-white text-purple-700 shadow-sm\' : \'text-gray-600 hover:text-gray-800\'}`}><UserPlus className="h-3 w-3 inline mr-1" />Crear nuevo</button>\n')
new_box2.append(IND + '              </div>\n')
# Existing mode
new_box2.append(IND + '              {npMemberMode === \'existing\' ? (\n')
new_box2.append(IND + '                <Select value={npMemberExistingId} onValueChange={setNpMemberExistingId}>\n')
new_box2.append(IND + '                  <SelectTrigger className="h-8 text-xs"><SelectValue placeholder="Seleccionar usuario existente..." /></SelectTrigger>\n')
new_box2.append(IND + '                  <SelectContent>\n')
new_box2.append(IND + '                    {users.filter(u => u.active && !newProjectMembers.some(m => m.mode === \'existing\' && m.userId === u.id)).map(u => (\n')
new_box2.append(IND + '                      <SelectItem key={u.id} value={u.id}>\n')
new_box2.append(IND + '                        <div className="flex items-center gap-2">\n')
new_box2.append(IND + '                          <span>{u.name}</span>\n')
new_box2.append(IND + '                          <span className="text-muted-foreground">({u.email})</span>\n')
new_box2.append(IND + '                          <Badge className={`${ROLE_COLORS[u.role] || \'\'} border text-[9px] py-0`}>{ROLE_LABELS[u.role] || u.role}</Badge>\n')
new_box2.append(IND + '                        </div>\n')
new_box2.append(IND + '                      </SelectItem>\n')
new_box2.append(IND + '                    ))}\n')
new_box2.append(IND + '                  </SelectContent>\n')
new_box2.append(IND + '                </Select>\n')
new_box2.append(IND + '              ) : (\n')
new_box2.append(IND + '                <div className="space-y-2">\n')
new_box2.append(IND + '                  <div className="grid grid-cols-2 gap-2">\n')
new_box2.append(IND + '                    <Input placeholder="Nombre completo *" value={npMemberName} onChange={e => setNpMemberName(e.target.value)} className="h-8 text-xs" />\n')
new_box2.append(IND + '                    <Input type="email" placeholder="Email *" value={npMemberEmail} onChange={e => setNpMemberEmail(e.target.value)} className="h-8 text-xs" />\n')
new_box2.append(IND + '                  </div>\n')
new_box2.append(IND + '                  <Input type="password" placeholder="Contraseña (mín. 6 car.; vacío = auto-generada)" value={npMemberPassword} onChange={e => setNpMemberPassword(e.target.value)} className="h-8 text-xs" />\n')
new_box2.append(IND + '                </div>\n')
new_box2.append(IND + '              )}\n')
# Role + zones (shared)
new_box2.append(IND + '              <div className="grid grid-cols-2 gap-2">\n')
new_box2.append(IND + '                <Select value={npMemberRole} onValueChange={setNpMemberRole}>\n')
new_box2.append(IND + '                  <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>\n')
new_box2.append(IND + '                  <SelectContent>\n')
new_box2.append(IND + '                    <SelectItem value="admin">Administrador</SelectItem>\n')
new_box2.append(IND + '                    <SelectItem value="gerente">Gerente</SelectItem>\n')
new_box2.append(IND + '                    <SelectItem value="responsable">Responsable</SelectItem>\n')
new_box2.append(IND + '                    <SelectItem value="empleado">Empleado</SelectItem>\n')
new_box2.append(IND + '                    <SelectItem value="auditor">Auditor</SelectItem>\n')
new_box2.append(IND + '                  </SelectContent>\n')
new_box2.append(IND + '                </Select>\n')
new_box2.append(IND + '                <div className="space-y-1">\n')
new_box2.append(IND + '                  <p className="text-[10px] text-muted-foreground font-medium">Zonas (todas por defecto)</p>\n')
new_box2.append(IND + '                  <div className="space-y-0.5 max-h-32 overflow-y-auto">\n')
new_box2.append(IND + '                    {newProjectZones.length === 0 ? (\n')
new_box2.append(IND + '                      <p className="text-[10px] text-muted-foreground italic">Crea al menos una zona arriba.</p>\n')
new_box2.append(IND + '                    ) : newProjectZones.map((z, zi) => (\n')
new_box2.append(IND + '                      <label key={zi} className="flex items-center gap-1.5 text-xs cursor-pointer hover:bg-gray-50 rounded px-1 py-0.5">\n')
new_box2.append(IND + '                        <Checkbox checked={npMemberZoneIdxs.includes(zi)} onCheckedChange={(checked) => { if (checked) setNpMemberZoneIdxs([...npMemberZoneIdxs, zi]); else setNpMemberZoneIdxs(npMemberZoneIdxs.filter(i => i !== zi)) }} className="h-3.5 w-3.5" />\n')
new_box2.append(IND + '                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: z.color }} />\n')
new_box2.append(IND + '                        <span>{z.name || `(zona ${zi+1})`}</span>\n')
new_box2.append(IND + '                      </label>\n')
new_box2.append(IND + '                    ))}\n')
new_box2.append(IND + '                  </div>\n')
new_box2.append(IND + '                </div>\n')
new_box2.append(IND + '              </div>\n')
new_box2.append(IND + '              <Button size="sm" variant="outline" className="w-full h-8 text-xs border-purple-300 text-purple-700 hover:bg-purple-50" onClick={handleAddNewProjectMember} disabled={npMemberMode === \'existing\' ? !npMemberExistingId : !npMemberName.trim() || !npMemberEmail.trim()}>\n')
new_box2.append(IND + '                <UserPlus className="h-3 w-3 mr-1" /> Añadir a la lista\n')
new_box2.append(IND + '              </Button>\n')
new_box2.append(IND + '            </CardContent>\n')
new_box2.append(IND + '          </Card>\n')
new_box2.append(IND + '        </div>\n')

# Submit buttons
new_box2.append(IND + '        <div className="flex gap-2 justify-end">\n')
new_box2.append(IND + '          <Button variant="outline" size="sm" onClick={() => setShowNewProject(false)}>Cancelar</Button>\n')
new_box2.append(IND + '          <Button\n')
new_box2.append(IND + '            size="sm"\n')
new_box2.append(IND + '            onClick={handleCreateProject}\n')
new_box2.append(IND + '            disabled={!newProjectName.trim() || !newProjectCompany.trim() || newProjectZones.filter(z => z.name.trim()).length === 0}\n')
new_box2.append(IND + '            className="bg-gradient-to-r from-purple-500 to-purple-600 text-white"\n')
new_box2.append(IND + '          >\n')
new_box2.append(IND + '            Crear Proyecto\n')
new_box2.append(IND + '          </Button>\n')
new_box2.append(IND + '        </div>\n')
new_box2.append(IND + '      </CardContent>\n')
new_box2.append(IND + '    </Card>\n')
new_box2.append(IND + '  )}\n')
new_box2.append(IND + '</div>\n')

# ---------------------------------------------------------------------------
# 4. Reassemble the file
# ---------------------------------------------------------------------------

# Build new lines: everything before SEC1_COMMENT, then new box1, then new box2, then everything from MOTION_CLOSE onwards.
new_lines = []
new_lines.extend(lines[:SEC1_COMMENT])    # everything before section 1 comment
new_lines.extend(new_box1)                # caja 1 (with list inside)
new_lines.extend(new_box2)                # caja 2 (Abrir Nuevo Proyecto, enhanced)
new_lines.extend(lines[MOTION_CLOSE:])    # closing of projects motion.div + rest of file

new_src = ''.join(new_lines)
PATH.write_text(new_src)
print(f'OK: rewrote {PATH}')
print(f'  old size: {len(src)} bytes / {len(lines)} lines')
print(f'  new size: {len(new_src)} bytes / {len(new_lines)} lines')
