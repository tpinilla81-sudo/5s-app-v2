module.exports=[89578,a=>{a.v({className:"geist_a71539c9-module__T19VSG__className",variable:"geist_a71539c9-module__T19VSG__variable"})},35214,a=>{a.v({className:"geist_mono_8d43a2aa-module__8Li5zG__className",variable:"geist_mono_8d43a2aa-module__8Li5zG__variable"})},24257,a=>{"use strict";a.s(["Toaster",()=>b]);let b=(0,a.i(11857).registerClientReference)(function(){throw Error("Attempted to call Toaster() from the server but Toaster is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/src/components/ui/sonner.tsx","Toaster")},6905,a=>{"use strict";var b=a.i(24257);a.n(b)},27572,a=>{"use strict";var b=a.i(7997),c=a.i(89578);let d={className:c.default.className,style:{fontFamily:"'Geist', 'Geist Fallback'",fontStyle:"normal"}};null!=c.default.variable&&(d.variable=c.default.variable);var e=a.i(35214);let f={className:e.default.className,style:{fontFamily:"'Geist Mono', 'Geist Mono Fallback'",fontStyle:"normal"}};null!=e.default.variable&&(f.variable=e.default.variable);var g=a.i(6905);a.s(["default",0,function({children:a}){return(0,b.jsxs)("html",{lang:"es",suppressHydrationWarning:!0,children:[(0,b.jsxs)("head",{children:[(0,b.jsx)("link",{rel:"dns-prefetch",href:"//fonts.googleapis.com"}),(0,b.jsx)("meta",{httpEquiv:"Cache-Control",content:"no-cache, no-store, must-revalidate"}),(0,b.jsx)("meta",{httpEquiv:"Pragma",content:"no-cache"}),(0,b.jsx)("meta",{httpEquiv:"Expires",content:"0"})]}),(0,b.jsxs)("body",{className:`${d.variable} ${f.variable} antialiased bg-background text-foreground`,children:[a,(0,b.jsx)(g.Toaster,{position:"top-right",richColors:!0,closeButton:!0}),(0,b.jsx)("script",{dangerouslySetInnerHTML:{__html:`
              (function() {
                // v3.0.27 - VER Y RESETEAR CONTRASE\xd1A ADMIN
                var CURRENT_VERSION = 'v3.0.32';
                
                // Check if we need to force reload
                var storedVersion = localStorage.getItem('_app_force_version');
                if (storedVersion !== CURRENT_VERSION) {
                  console.log('[App] Version mismatch:', storedVersion, '->', CURRENT_VERSION, '- forcing clear');
                  
                  // Clear ALL storage
                  try {
                    localStorage.clear();
                    sessionStorage.clear();
                  } catch(e) {}
                  
                  // Set new version
                  localStorage.setItem('_app_force_version', CURRENT_VERSION);
                  
                  // Force reload with cache bust
                  setTimeout(function() {
                    window.location.href = window.location.pathname + '?_v=' + CURRENT_VERSION + '&_t=' + Date.now();
                  }, 100);
                  return;
                }
                
                // STEP 1: Immediately clear ALL browser caches
                if ('caches' in window) {
                  caches.keys().then(function(names) {
                    console.log('[App] Clearing caches:', names);
                    names.forEach(function(name) { caches.delete(name); });
                  });
                }

                // STEP 2: Unregister ALL service workers immediately
                if ('serviceWorker' in navigator) {
                  navigator.serviceWorker.getRegistrations().then(function(registrations) {
                    console.log('[App] Found ' + registrations.length + ' service worker(s), unregistering...');
                    registrations.forEach(function(reg) {
                      reg.unregister();
                    });
                    // If we just unregistered a controlling SW, we need a hard reload
                    if (registrations.length > 0 && navigator.serviceWorker.controller) {
                      console.log('[App] Had active SW — hard reload needed');
                      // Small delay to let unregister complete, then reload
                      setTimeout(function() {
                        window.location.href = window.location.pathname + '?_nocache=' + Date.now();
                      }, 500);
                    }
                  });
                }

                // STEP 3: Version banner DISABLED.
                // v2.99.1: el banner "Actualizar" se mostraba constantemente debido a
                // combinaci\xf3n de: (a) SW viejo cacheando /version, (b) localStorage
                // con valores stale de versiones anteriores, (c) setInterval + visibilitychange
                // disparando checkVersion() repetidamente. Se elimina toda la l\xf3gica de
                // banner y se mantiene solo la limpieza de caches/SW.
                try {
                  localStorage.removeItem('app_version');
                  localStorage.removeItem('app_version_stable');
                } catch (e) {}
                // Limpiar cualquier banner residual que pudiera haber quedado en el DOM
                // (por si el usuario tiene una p\xe1gina antigua cargada).
                function removeStaleBanner() {
                  var b = document.getElementById('app-update-banner');
                  if (b) b.parentNode.removeChild(b);
                }
                removeStaleBanner();
                // Observar mutaciones del DOM por si un SW cacheado intentara inyectarlo.
                if (window.MutationObserver) {
                  var mo = new MutationObserver(function() { removeStaleBanner(); });
                  mo.observe(document.body, { childList: true, subtree: false });
                }

                // STEP 4: On visibility change, just clear caches. NO version check.
                document.addEventListener('visibilitychange', function() {
                  if (!document.hidden) {
                    if ('caches' in window) {
                      caches.keys().then(function(names) {
                        names.forEach(function(name) { caches.delete(name); });
                      });
                    }
                    removeStaleBanner();
                  }
                });
              })();
            `}})]})]})},"dynamic",0,"force-dynamic","metadata",0,{title:{default:"5S App — Metodología 5S Digital [v200.00-NEW]",template:"%s | 5S App"},description:"Plataforma digital para la implementación y seguimiento de la metodología 5S: Seiri, Seiton, Seiso, Seiketsu, Shitsuke. Mejora continua para tu empresa.",keywords:["5S","metodología 5S","lean manufacturing","mejora continua","Seiri","Seiton","Seiso","Seiketsu","Shitsuke","auditoría 5S","gestión visual","orden y limpieza"],authors:[{name:"5S App"}],creator:"5S App",publisher:"5S App",robots:{index:!0,follow:!0,googleBot:{index:!0,follow:!0,"max-video-preview":-1,"max-image-preview":"large","max-snippet":-1}},openGraph:{type:"website",locale:"es_ES",siteName:"5S App",title:"5S App — Metodología 5S Digital",description:"Plataforma digital para implementar y seguir la metodología 5S en tu empresa. Progreso, auditorías y mejora continua.",images:[{url:"/5s-logo.png",width:512,height:512,alt:"5S App"}]},twitter:{card:"summary",title:"5S App — Metodología 5S Digital",description:"Plataforma digital para implementar y seguir la metodología 5S en tu empresa.",images:["/5s-logo.png"]},manifest:"/manifest.json",icons:{icon:[{url:"/favicon.ico",sizes:"any"},{url:"/5s-logo.png",type:"image/png",sizes:"512x512"}],apple:[{url:"/5s-logo.png",sizes:"512x512"}]},appleWebApp:{capable:!0,statusBarStyle:"default",title:"5S App"}},"viewport",0,{width:"device-width",initialScale:1,maximumScale:5,themeColor:[{media:"(prefers-color-scheme: light)",color:"#ffffff"},{media:"(prefers-color-scheme: dark)",color:"#0a0a0a"}]}],27572)},50645,function(a){a.n(a.i(27572))}];

//# sourceMappingURL=%5Broot-of-the-server%5D__088531r._.js.map