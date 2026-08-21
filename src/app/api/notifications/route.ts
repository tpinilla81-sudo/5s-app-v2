import { NextRequest, NextResponse } from 'next/server'
import { db } from '../../../lib/db'

// GET /api/notifications?userId=xxx&projectId=xxx
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const projectId = searchParams.get('projectId')
    const unreadOnly = searchParams.get('unread') === 'true'

    const where: any = {}
    if (userId) where.userId = userId
    if (projectId) where.projectId = projectId
    if (unreadOnly) where.read = false

    const notifications = await db.notification.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: 50,
    })

    return NextResponse.json({ success: true, data: notifications })
  } catch (error) {
    console.error('Error fetching notifications:', error)
    return NextResponse.json({ success: false, error: 'Error fetching notifications' }, { status: 500 })
  }
}

// POST /api/notifications — Create a notification (e.g., notify auditor when step 4 is completed)
// v2.75: soporta `metadata` (JSON string) para datos contextuales de los nuevos tipos de aviso
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, type, title, message, sStep, zoneId, projectId, metadata } = body

    if (!userId || !type || !title || !message || !projectId) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 })
    }

    const notification = await db.notification.create({
      data: {
        userId,
        type,
        title,
        message,
        sStep: sStep || null,
        zoneId: zoneId || null,
        projectId,
        // v2.75: metadata opcional (JSON string)
        ...(metadata ? { metadata: typeof metadata === 'string' ? metadata : JSON.stringify(metadata) } : {}),
      },
    })

    return NextResponse.json({ success: true, data: notification })
  } catch (error) {
    console.error('Error creating notification:', error)
    return NextResponse.json({ success: false, error: 'Error creating notification' }, { status: 500 })
  }
}

// PUT /api/notifications — Mark as read (one or all)
// v2.75: soporta { markAll: true, userId, projectId } para marcar todas como leídas
//        (mantiene compat con { markAllRead, userId })
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, markAllRead, markAll, userId, projectId } = body

    // Marcar todas las del usuario (opcionalmente acotadas por projectId)
    if ((markAllRead || markAll) && userId) {
      const where: any = { userId, read: false }
      if (projectId) where.projectId = projectId
      await db.notification.updateMany({
        where,
        data: { read: true },
      })
      return NextResponse.json({ success: true })
    }

    if (!id) {
      return NextResponse.json({ success: false, error: 'id is required' }, { status: 400 })
    }

    const notification = await db.notification.update({
      where: { id },
      data: { read: true },
    })

    return NextResponse.json({ success: true, data: notification })
  } catch (error) {
    console.error('Error updating notification:', error)
    return NextResponse.json({ success: false, error: 'Error updating notification' }, { status: 500 })
  }
}
