'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button, ButtonProps } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Loader2, Mail, Send, CheckCircle2, User, Phone, Building2, Info,
} from 'lucide-react'

type Variant = ButtonProps['variant']
type Size = ButtonProps['size']

interface SolicitarInfoDialogProps {
  /** Trigger label */
  label?: string
  /** Visual variant of the trigger button */
  variant?: Variant
  /** Size of the trigger button */
  size?: Size
  /** Extra className for the trigger button */
  className?: string
  /** Show icon on the trigger button */
  withIcon?: boolean
  /** Controlled open state (optional) */
  open?: boolean
  onOpenChange?: (open: boolean) => void
  /** Render trigger as a child element (compose) */
  asChild?: boolean
}

/**
 * Reusable "Solicita Información" dialog.
 *
 * - Renders a trigger button by default.
 * - Opens a dialog with a contact form that posts to /api/contact.
 * - Keeps the contact form OUT of the main layout — it lives in the background
 *   and only appears when the user clicks the access button.
 */
export default function SolicitarInfoDialog({
  label = 'Solicitar Información',
  variant = 'outline',
  size = 'default',
  className = '',
  withIcon = true,
  open: controlledOpen,
  onOpenChange,
  asChild = false,
}: SolicitarInfoDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false)
  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : internalOpen
  const setOpen = (v: boolean) => {
    if (!isControlled) setInternalOpen(v)
    onOpenChange?.(v)
  }

  // Form state
  const [contactName, setContactName] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactPhone, setContactPhone] = useState('')
  const [contactCompany, setContactCompany] = useState('')
  const [contactMessage, setContactMessage] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [contactSent, setContactSent] = useState(false)
  const [contactError, setContactError] = useState('')

  const resetForm = () => {
    setContactName('')
    setContactEmail('')
    setContactPhone('')
    setContactCompany('')
    setContactMessage('')
    setContactError('')
    setContactSent(false)
  }

  const handleOpenChange = (v: boolean) => {
    if (!v) {
      // small delay so the close animation doesn't show stale state
      setTimeout(() => {
        if (!contactSent) setContactError('')
      }, 200)
    }
    setOpen(v)
  }

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setContactError('')

    if (!contactName.trim() || !contactEmail.trim() || !contactMessage.trim()) {
      setContactError('Nombre, email y mensaje son obligatorios.')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(contactEmail.trim())) {
      setContactError('Introduce un email válido.')
      return
    }

    setIsSending(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: contactName.trim(),
          email: contactEmail.trim(),
          phone: contactPhone.trim(),
          company: contactCompany.trim(),
          message: contactMessage.trim(),
        }),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setContactSent(true)
        setContactName('')
        setContactEmail('')
        setContactPhone('')
        setContactCompany('')
        setContactMessage('')
      } else {
        setContactError(data.error || 'No se pudo enviar el mensaje. Inténtalo más tarde.')
      }
    } catch {
      setContactError('Error de conexión. Inténtalo más tarde.')
    } finally {
      setIsSending(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {asChild ? (
          <span className="inline-block cursor-pointer">{label}</span>
        ) : (
          <Button
            type="button"
            variant={variant}
            size={size}
            className={className}
            onClick={() => setOpen(true)}
          >
            {withIcon && <Info className="h-4 w-4 mr-2" />}
            {label}
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[480px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Mail className="h-5 w-5 text-green-600" />
            Solicita Información
          </DialogTitle>
          <DialogDescription>
            ¿Quieres implementar 5S en tu empresa o necesitas acceso?
            Envíanos tus datos y te contactaremos.
          </DialogDescription>
        </DialogHeader>

        {contactSent ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-green-50 border border-green-200 rounded-lg p-6 text-center"
          >
            <CheckCircle2 className="h-12 w-12 text-green-600 mx-auto mb-3" />
            <p className="font-semibold text-green-800 mb-1">¡Mensaje enviado!</p>
            <p className="text-sm text-green-700">
              Hemos recibido tu solicitud. Te contactaremos lo antes posible.
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-4 text-green-700 border-green-300 hover:bg-green-100"
              onClick={() => {
                resetForm()
                setOpen(false)
              }}
            >
              Cerrar
            </Button>
          </motion.div>
        ) : (
          <form onSubmit={handleContactSubmit} className="space-y-3 pt-2">
            {contactError && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-3 py-2">
                {contactError}
              </div>
            )}

            <div className="space-y-1.5">
              <Label htmlFor="contact-name" className="text-xs">
                Nombre completo *
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="contact-name"
                  type="text"
                  placeholder="Tu nombre"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="pl-10 h-10"
                  required
                  disabled={isSending}
                  autoFocus
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="contact-email" className="text-xs">
                Email *
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="contact-email"
                  type="email"
                  placeholder="tu@empresa.com"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="pl-10 h-10"
                  required
                  disabled={isSending}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="contact-phone" className="text-xs">
                  Teléfono
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="contact-phone"
                    type="tel"
                    placeholder="600 000 000"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="pl-10 h-10"
                    disabled={isSending}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="contact-company" className="text-xs">
                  Empresa
                </Label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="contact-company"
                    type="text"
                    placeholder="Tu empresa"
                    value={contactCompany}
                    onChange={(e) => setContactCompany(e.target.value)}
                    className="pl-10 h-10"
                    disabled={isSending}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="contact-message" className="text-xs">
                Mensaje *
              </Label>
              <Textarea
                id="contact-message"
                placeholder="Cuéntanos qué necesitas: nº de usuarios, zonas, proyecto 5S..."
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                className="min-h-[100px] resize-y"
                required
                disabled={isSending}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-md"
              disabled={isSending}
            >
              {isSending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Enviar Solicitud
                </>
              )}
            </Button>

            <p className="text-[10px] text-muted-foreground text-center">
              Tus datos solo se usan para responder a tu solicitud.
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
