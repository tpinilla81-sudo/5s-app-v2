'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { use5SStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardDescription } from '@/components/ui/card'
import { Loader2, Mail, Lock, ArrowLeft } from 'lucide-react'
import SolicitarInfoDialog from './SolicitarInfoDialog'

export default function LoginPage() {
  const { login, isLoginLoading, authError, clearAuthError, setAuthView } = use5SStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [localError, setLocalError] = useState('')

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-emerald-50 p-4">
      {/* Top-left "back to landing" button */}
      <button
        type="button"
        onClick={() => setAuthView('landing')}
        className="absolute top-4 left-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-green-700 transition-colors"
        aria-label="Volver al inicio"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver al inicio
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
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

            {/* Access button — opens the contact dialog in the background */}
            <div className="mt-5 pt-5 border-t border-gray-100">
              <p className="text-xs text-muted-foreground text-center mb-3">
                ¿No tienes cuenta todavía?
              </p>
              <SolicitarInfoDialog
                label="Solicitar Acceso"
                variant="outline"
                size="default"
                className="w-full border-green-300 text-green-700 hover:bg-green-50"
              />
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-green-500 mt-6">
          Método 5S · <span className="font-mono text-purple-600">v2.18</span>
        </p>
      </motion.div>
    </div>
  )
}
