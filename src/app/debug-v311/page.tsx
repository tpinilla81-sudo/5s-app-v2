'use client'

import { useEffect, useState } from 'react'

export default function DebugPage() {
  const [info, setInfo] = useState<any>({})

  useEffect(() => {
    // Gather debug info
    const data: any = {
      url: window.location.href,
      userAgent: navigator.userAgent,
      localStorage: {} as any,
      caches: [] as string[],
      serviceWorkers: null as number | null,
      timestamp: new Date().toISOString()
    }

    // Check localStorage
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key) data.localStorage[key] = localStorage.getItem(key)?.substring(0, 100)
      }
    } catch(e) {}

    // Check caches
    if ('caches' in window) {
      caches.keys().then(names => {
        data.caches = names
        setInfo({...data})
      })
    }

    // Check service workers
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then(regs => {
        data.serviceWorkers = regs.length
        setInfo({...data})
      })
    }

    setInfo(data)

    // Try to fetch version
    fetch('/api/version')
      .then(r => r.json())
      .then(v => {
        data.apiVersion = v
        setInfo({...data})
      })
  }, [])

  return (
    <div style={{ padding: 20, fontFamily: 'monospace', background: '#1a1a2e', color: '#fff', minHeight: '100vh' }}>
      <h1 style={{ color: '#00ff88' }}>🔍 Diagnóstico v3.0.11</h1>
      
      <div style={{ background: '#16213e', padding: 15, borderRadius: 8, margin: '10px 0' }}>
        <h2>📡 Información del Navegador</h2>
        <pre style={{ fontSize: 12, overflow: 'auto' }}>
          {JSON.stringify(info, null, 2)}
        </pre>
      </div>

      <div style={{ background: '#16213e', padding: 15, borderRadius: 8, margin: '10px 0' }}>
        <h2>🧪 Prueba: ¿Se cargó la página nueva?</h2>
        <p>Si ves esto, la versión v3.0.11 SÍ se está sirviendo.</p>
        <button 
          onClick={() => {
            // Force clear everything
            localStorage.clear()
            sessionStorage.clear()
            if ('caches' in window) {
              caches.keys().then((names: string[]) => names.forEach((name: string) => caches.delete(name)))
            }
            if ('serviceWorker' in navigator) {
              navigator.serviceWorker.getRegistrations().then((regs: any[]) => regs.forEach((reg: any) => reg.unregister()))
            }
            alert('¡Caché limpiada! Recargando...')
            window.location.href = '/'
          }}
          style={{
            background: '#e94560',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: 5,
            cursor: 'pointer',
            fontSize: 14
          }}
        >
          🗑️ LIMPIAR CACHÉ COMPLETA e IR AL INICIO
        </button>
      </div>

      <div style={{ background: '#0f3460', padding: 15, borderRadius: 8, margin: '10px 0' }}>
        <h2>📋 Campos que deberían estar en el formulario:</h2>
        <ul style={{ fontSize: 14 }}>
          <li>✅ CIF / NIF</li>
          <li>✅ Teléfono</li>
          <li>✅ Dirección completa</li>
          <li>✅ Contacto (email, persona, teléfono)</li>
          <li>✅ Facturación</li>
          <li>✅ IBAN</li>
        </ul>
      </div>

      <div style={{ marginTop: 20 }}>
        <a href="/" style={{ color: '#00ff88' }}>← Volver al inicio</a>
      </div>
    </div>
  )
}
