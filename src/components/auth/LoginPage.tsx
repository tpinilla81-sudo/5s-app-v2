'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { use5SStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardDescription } from '@/components/ui/card'
import { Loader2, Mail, Lock, Info, ShieldCheck, UserCog } from 'lucide-react'

export default function LoginPage() {
  const { login, isLoginLoading, authError, clearAuthError } = use5SStore()
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
                ¿No tienes cuenta? Contacta con tu gestor.
              </p>
            </CardContent>
          </Card>

          <p className="text-center text-xs text-green-500 mt-6">
            Método 5S · <span className="font-mono text-purple-600">v2.14</span>
          </p>
        </div>

        {/* Right: info panel — replaces the previous "Crear Cuenta" button */}
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <UserCog className="h-6 w-6 text-green-600" />
              ¿Cómo obtener acceso?
            </h3>
            <p className="text-gray-600">
              La creación de cuentas la realiza <strong>únicamente el gestor</strong>,
              previa comunicación del cliente. No es posible registrarse directamente.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-semibold text-sm shrink-0">
                1
              </div>
              <div>
                <p className="font-medium text-gray-900">El cliente contacta con el gestor</p>
                <p className="text-sm text-gray-600">
                  El cliente solicita el alta de usuarios para un proyecto 5S concreto,
                  indicando los roles que necesitará cada persona.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-semibold text-sm shrink-0">
                2
              </div>
              <div>
                <p className="font-medium text-gray-900">El gestor crea las cuentas</p>
                <p className="text-sm text-gray-600">
                  El gestor da de alta cada usuario con su email, nombre, rol y contraseña,
                  y lo asigna a las zonas del proyecto correspondiente.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-semibold text-sm shrink-0">
                3
              </div>
              <div>
                <p className="font-medium text-gray-900">El usuario recibe sus credenciales</p>
                <p className="text-sm text-gray-600">
                  El gestor comunica las credenciales de acceso por el canal acordado.
                  El usuario entra con su email y contraseña en este formulario.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
            <Info className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold text-green-800">Solo el gestor puede crear cuentas</p>
              <p className="text-green-700 mt-0.5">
                Si eres empleado/a, gerente, responsable o auditor, solicita tu acceso
                a través de tu gestor o del administrador de tu empresa.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-500">
            <ShieldCheck className="h-3.5 w-3.5" />
            Conexión segura · Las credenciales se comunican por canal privado
          </div>
        </div>
      </motion.div>
    </div>
  )
}
