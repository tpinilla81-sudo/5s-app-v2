'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { use5SStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardDescription } from '@/components/ui/card'
import { Loader2, Mail, Lock, Send, CheckCircle2, User, Phone, Building2 } from 'lucide-react'

export default function LoginPage() {
  const { login, isLoginLoading, authError, clearAuthError } = use5SStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [localError, setLocalError] = useState('')

  // Contact form state
  const [contactName, setContactName] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactPhone, setContactPhone] = useState('')
  const [contactCompany, setContactCompany] = useState('')
  const [contactMessage, setContactMessage] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [contactSent, setContactSent] = useState(false)
  const [contactError, setContactError] = useState('')

  const displayError = localError || authError

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLocalError('')
    clearAuthError()
    if (!email.trim() || !password.trim()) {
      setLocalError('Introduce email y contraseña')
      return
    }
    const success = await login(email.trim(), password)
    if (!success) {
      // Error is set in the store
    }
  }

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setContactError('')

    if (!contactName.trim() || !contactEmail.trim() || !contactMessage.trim()) {
      setContactError('Nombre, email y mensaje son obligatorios.')
      return
    }

    // Basic email format validation
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
        // Reset form
        setContactName('')
        setContactEmail('')
        setContactPhone('')
        setContactCompany('')
        setContactMessage('')
      } else {
        setContactError(data.error || 'No se pudo enviar el mensaje. Inténtalo más tarde.')
      }
    } catch (err) {
      setContactError('Error de conexión. Inténtalo más tarde.')
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-emerald-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-5xl grid lg:grid-cols-2 gap-8 items-center"
      >
        {/* Left: login form */}
        <div className="w-full max-w-md mx-auto lg:mx-0">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
              className="w-28 h-28 mb-2"
            >
              <img
                src="/5s-logo.png"
                alt="5S Logo"
                className="w-full h-full object-contain"
              />
            </motion.div>
            <h1 className="text-2xl font-bold text-green-600">Método</h1>
          </div>

          <Card className="border-0 shadow-xl shadow-green-100/50">
            <CardHeader className="text-center pb-2">
              <h2 className="text-xl font-semibold text-gray-900">
                Iniciar Sesión
              </h2>
              <CardDescription className="mt-1">
                Ingresa tus credenciales para continuar
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-4">
              {displayError && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-4"
                >
                  {displayError}
                </motion.div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="tu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                      disabled={isLoginLoading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="login-password">Contraseña</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="Tu contraseña"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                      required
                      disabled={isLoginLoading}
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-md"
                  disabled={isLoginLoading}
                >
                  {isLoginLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Iniciando...
                    </>
                  ) : (
                    'Iniciar Sesión'
                  )}
                </Button>
              </form>

              <p className="text-xs text-muted-foreground text-center mt-4">
                ¿No tienes cuenta? Solicita información con el formulario.
              </p>
            </CardContent>
          </Card>

          <p className="text-center text-xs text-green-500 mt-6">
            Método 5S · <span className="font-mono text-purple-600">v2.15</span>
          </p>
        </div>

        {/* Right: contact form — replaces the previous info panel */}
        <div className="w-full">
          <Card className="border-0 shadow-xl shadow-green-100/50">
            <CardHeader className="pb-3">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <Mail className="h-5 w-5 text-green-600" />
                Solicita Información
              </h2>
              <CardDescription className="mt-1">
                ¿Quieres implementar 5S en tu empresa o necesitas acceso?
                Envíanos tus datos y te contactaremos.
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-2">
              {contactSent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 border border-green-200 rounded-lg p-6 text-center"
                >
                  <CheckCircle2 className="h-12 w-12 text-green-600 mx-auto mb-3" />
                  <p className="font-semibold text-green-800 mb-1">
                    ¡Mensaje enviado!
                  </p>
                  <p className="text-sm text-green-700">
                    Hemos recibido tu solicitud. Te contactaremos lo antes posible.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4 text-green-700 border-green-300 hover:bg-green-100"
                    onClick={() => setContactSent(false)}
                  >
                    Enviar otro mensaje
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-3">
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
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  )
}
