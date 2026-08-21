import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// Helper: check if user has a specific permission via rolePermissionConfig
async function hasPermission(role: string, permission: string): Promise<boolean> {
  const config = await db.rolePermissionConfig.findUnique({
    where: { role_permission: { role, permission } }
  })
  return config?.allowed === true
}

// POST /api/progress/reset — Reset ALL progress for a project (testing purpose)
// Requires: reset_data or skip_steps permission
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { projectId, zoneId } = body

    if (!projectId) {
      return NextResponse.json({ success: false, error: 'projectId es obligatorio' }, { status: 400 })
    }

    // Verify authentication and permission
    const sessionRes = await fetch(new URL('/api/auth', request.url).toString(), {
      headers: { cookie: request.headers.get('cookie') || '' },
    })
    const sessionData = await sessionRes.json()
    const user = sessionData.user

    if (!user) {
      return NextResponse.json({ success: false, error: 'No autenticado' }, { status: 401 })
    }

    // Permission-driven: only users with reset_data or skip_steps can reset
    const canReset = await hasPermission(user.role, 'reset_data') || await hasPermission(user.role, 'skip_steps')
    if (!canReset) {
      return NextResponse.json({ success: false, error: 'No tienes permiso para restablecer datos' }, { status: 403 })
    }

    // Build where clause - optionally filter by zone
    const progressWhere: any = { projectId }
    const empProgressWhere: any = { projectId }
    const auditWhere: any = { projectId }
    const checklistWhere: any = { projectId }
    const examWhere: any = { projectId }
    const actionWhere: any = { projectId }
    const photoWhere: any = { projectId }
    const inventoryWhere: any = { projectId }
    const standardWhere: any = { projectId }
    const pdcaWhere: any = { projectId }
    const scheduleWhere: any = { projectId }
    const notificationWhere: any = { projectId }

    if (zoneId) {
      progressWhere.zoneId = zoneId
      empProgressWhere.zoneId = zoneId
      auditWhere.sStep = undefined  // audit results don't have zoneId
      checklistWhere.zoneId = undefined // checklists don't have zoneId
      actionWhere.zoneId = zoneId
      photoWhere.zoneId = zoneId
      inventoryWhere.zoneId = zoneId
      standardWhere.zoneId = zoneId
      pdcaWhere.zoneId = zoneId
      scheduleWhere.zoneId = zoneId
      notificationWhere.zoneId = zoneId
    }

    // Delete all progress-related data
    let deletedCount = 0

    // 1. Zone-level Progress
    const deletedProgress = await db.progress.deleteMany({ where: progressWhere })
    deletedCount += deletedProgress.count

    // 2. Employee Progress (individual steps)
    const deletedEmpProgress = await db.employeeProgress.deleteMany({ where: empProgressWhere })
    deletedCount += deletedEmpProgress.count

    // 3. Audit Results
    const deletedAudits = await db.auditResult.deleteMany({ where: auditWhere })
    deletedCount += deletedAudits.count

    // 4. Checklist Responses
    const deletedChecklists = await db.checklistResponse.deleteMany({ where: checklistWhere })
    deletedCount += deletedChecklists.count

    // 5. Exam Answers
    const deletedExams = await db.examAnswer.deleteMany({ where: examWhere })
    deletedCount += deletedExams.count

    // 6. Action Items
    const deletedActions = await db.actionItem.deleteMany({ where: actionWhere })
    deletedCount += deletedActions.count

    // 7. Photo Library
    const deletedPhotos = await db.photoLibrary.deleteMany({ where: photoWhere })
    deletedCount += deletedPhotos.count

    // 8. Inventory Items
    const deletedInventory = await db.inventoryItem.deleteMany({ where: inventoryWhere })
    deletedCount += deletedInventory.count

    // 9. Standards (keep templates, only delete project-level standards)
    const deletedStandards = await db.standard.deleteMany({ where: standardWhere })
    deletedCount += deletedStandards.count

    // 10. PDCA Items
    const deletedPDCA = await db.pdcaItem.deleteMany({ where: pdcaWhere })
    deletedCount += deletedPDCA.count

    // 11. Evaluation Schedules
    const deletedSchedules = await db.evaluationSchedule.deleteMany({ where: scheduleWhere })
    deletedCount += deletedSchedules.count

    // 12. Notifications
    const deletedNotifications = await db.notification.deleteMany({ where: notificationWhere })
    deletedCount += deletedNotifications.count

    return NextResponse.json({
      success: true,
      message: `Datos restablecidos correctamente. ${deletedCount} registros eliminados.`,
      deletedCount,
      details: {
        progress: deletedProgress.count,
        employeeProgress: deletedEmpProgress.count,
        auditResults: deletedAudits.count,
        checklistResponses: deletedChecklists.count,
        examAnswers: deletedExams.count,
        actionItems: deletedActions.count,
        photos: deletedPhotos.count,
        inventoryItems: deletedInventory.count,
        standards: deletedStandards.count,
        pdcaItems: deletedPDCA.count,
        evaluationSchedules: deletedSchedules.count,
        notifications: deletedNotifications.count,
      }
    })
  } catch (error) {
    console.error('Error resetting progress:', error)
    return NextResponse.json({ success: false, error: 'Error al restablecer los datos' }, { status: 500 })
  }
}
