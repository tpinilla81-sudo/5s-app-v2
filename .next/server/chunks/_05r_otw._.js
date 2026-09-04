module.exports=[46722,e=>{"use strict";var t=e.i(89171);async function a(a){try{let n,r,{imageUrl:o,sStep:i=1,zoneName:s}=await a.json();if(!o)return t.NextResponse.json({success:!1,error:"imageUrl es requerido"},{status:400});try{let t=(await e.A(85589)).default;n=await t.create()}catch(e){if(console.error("[ai-classify] Error loading ZAI SDK:",e?.message),e?.message?.includes("Configuration file")||e?.message?.includes(".z-ai-config"))return t.NextResponse.json({success:!1,error:"La función de IA no está configurada. Contacta al administrador.",configError:!0,details:"Se requiere archivo .z-ai-config en el servidor"},{status:503});throw e}let l={1:`Eres un experto en metodolog\xeda 5S analizando fotos de elementos en una zona${s?` llamada "${s}"`:""}.

Analiza esta foto y devuelve SOLO un JSON v\xe1lido (sin markdown, sin \`\`\`) con esta estructura exacta:
{
  "name": "nombre del elemento detectado",
  "category": "una de estas: [Herramienta|Maquinaria|Materia prima|Producto terminado|Mobiliario|Equipo de oficina|Material de limpieza|Residuo|Documento|Otro]",
  "estado": "uno de estos: [Nuevo|Bueno|Regular|Da\xf1ado|Obsoleto|Roto|Sucio|Descompuesto]",
  "action": "una de estas decisiones 5S: [Mantener|Retirar|Reparar|Reciclar|Reubicar]",
  "confidence": "Alta|Media|Baja",
  "reasoning": "breve explicaci\xf3n de 10-15 palabras"
}

Reglas:
- S\xe9 espec\xedfico con el nombre (ej: "Taladro percutor" no solo "Herramienta")
- La acci\xf3n debe seguir l\xf3gica 5S: si est\xe1 da\xf1ado/obsoleto → Retirar o Reparar
- Responde SOLO el JSON, nada m\xe1s.`,2:`Eres un experto en 5S (Seiton - Organizaci\xf3n) analizando elementos.

Analiza esta foto y devuelve SOLO un JSON v\xe1lido sin markdown:
{
  "name": "elemento u objeto visible",
  "category": "una de: [Herramienta|Contenedor|Estanter\xeda|Material|Equipo|Se\xf1alizaci\xf3n|Otro]",
  "estado": "uno de: [Bien organizado|Desordenado|Mal ubicado|Sin etiqueta|Correcto]",
  "action": "una de: [Mantener|Reubicar|Etiquetar|Organizar]",
  "confidence": "Alta|Media|Baja",
  "reasoning": "explicaci\xf3n breve"
}
Responde SOLO el JSON.`,3:`Eres un experto en 5S (Seiso - Limpieza) analizando suciedad.

Analiza esta foto y devuelve SOLO un JSON v\xe1lido sin markdown:
{
  "name": "elemento o \xe1rea afectada",
  "category": "una de: [Superficie|Equipo|Suelo|Pared|Herramienta|\xc1rea general|Otro]",
  "estado": "uno de: [Limpio|Ligero sucio|Sucio|Muy sucio|Con manchas|Con polvo|Con grasa|Con \xf3xido]",
  "action": "una de: [Limpiar|Limpiar a fondo|Desinfectar|Mantener]",
  "confidence": "Alta|Media|Baja",
  "reasoning": "explicaci\xf3n breve"
}
Responde SOLO el JSON.`,4:`Eres un experto en 5S (Seiketsu - Estandarizaci\xf3n) analizando est\xe1ndares.

Analiza esta foto y devuelve SOLO un JSON v\xe1lido sin markdown:
{
  "name": "est\xe1ndar o elemento visualizado",
  "category": "una de: [Etiqueta|Se\xf1al|Pictograma|Est\xe1ndar|Zona demarcada|Otro]",
  "estado": "uno de: [Cumple|No cumple|Parcialmente|Deteriorado|Ausente|Correcto]",
  "action": "una de: [Mantener|Actualizar|Rehacer|Crear]",
  "confidence": "Alta|Media|Baja",
  "reasoning": "explicaci\xf3n breve"
}
Responde SOLO el JSON.`,5:`Eres un experto en 5S (Shitsuke - Disciplina) analizando cumplimiento.

Analiza esta foto y devuelve SOLO un JSON v\xe1lido sin markdown:
{
  "name": "\xe1rea o pr\xe1ctica observada",
  "category": "una de: [Persona|\xc1rea de trabajo|Proceso|Equipo|General|Otro]",
  "estado": "uno de: [Cumpliendo|No cumpliendo|Mejorable|Correcto|Incorrecto]",
  "action": "una de: [Reforzar|Capacitar|Corregir|Mantener|Reconocer]",
  "confidence": "Alta|Media|Baja",
  "reasoning": "explicaci\xf3n breve"
}
Responde SOLO el JSON.`},c=l[i]||l[1],d=await n.chat.completions.createVision({messages:[{role:"user",content:[{type:"text",text:c},{type:"image_url",image_url:{url:o}}]}],thinking:{type:"disabled"}}),u=d.choices[0]?.message?.content?.trim()||"";if(!u)return t.NextResponse.json({success:!1,error:"No se pudo analizar la imagen"},{status:500});u=u.replace(/^```json\s*/i,"").replace(/```\s*$/,"").trim();try{r=JSON.parse(u)}catch(a){console.warn("[ai-classify] JSON parse failed, attempting extraction");let e=u.match(/\{[\s\S]*\}/);if(!e)return t.NextResponse.json({success:!1,error:"La IA no devolvió un formato válido",rawResponse:u.slice(0,200)},{status:500});r=JSON.parse(e[0])}let p=["name","category","estado","action"].filter(e=>!r[e]);return p.length>0&&(console.warn("[ai-classify] Missing fields:",p,"Result:",r),r.name||(r.name="Elemento identificado por IA"),r.category||(r.category="Otro"),r.estado||(r.estado="Por verificar"),r.action||(r.action="Mantener")),t.NextResponse.json({success:!0,data:{name:String(r.name).slice(0,100),category:String(r.category).slice(0,50),estado:String(r.estado).slice(0,50),action:String(r.action).slice(0,30),confidence:String(r.confidence||"Media").slice(0,20),reasoning:String(r.reasoning||"").slice(0,150)}})}catch(e){if(console.error("[ai-classify] Error:",e),e?.message?.includes("Configuration file")||e?.message?.includes(".z-ai-config"))return t.NextResponse.json({success:!1,error:"La función de IA no está configurada. Contacta al administrador.",configError:!0,details:e.message},{status:503});return t.NextResponse.json({success:!1,error:e?.message||"Error al analizar con IA"},{status:500})}}e.s(["POST",0,a])},71246,e=>{"use strict";var t=e.i(47909),a=e.i(74017),n=e.i(96250),r=e.i(59756),o=e.i(61916),i=e.i(74677),s=e.i(69741),l=e.i(16795),c=e.i(87718),d=e.i(95169),u=e.i(47587),p=e.i(66012),m=e.i(70101),f=e.i(26937),g=e.i(10372),R=e.i(93695);e.i(52474);var v=e.i(220);let x=new t.AppRouteRouteModule({definition:{kind:a.RouteKind.APP_ROUTE,page:"/api/inventory/ai-classify/route",pathname:"/api/inventory/ai-classify",filename:"route",bundlePath:""},distDir:".next",relativeProjectDir:"",resolvedPagePath:"[project]/src/app/api/inventory/ai-classify/route.ts",nextConfigOutput:"",userland:()=>e.r(46722),...{}}),{workAsyncStorage:h,workUnitAsyncStorage:S,serverHooks:E}=x;async function O(e,t,n){n.requestMeta&&(0,r.setRequestMeta)(e,n.requestMeta),x.isDev&&(0,r.addRequestMeta)(e,"devRequestTimingInternalsEnd",process.hrtime.bigint());let h="/api/inventory/ai-classify/route";h=h.replace(/\/index$/,"")||"/";let S=await x.prepare(e,t,{srcPage:h,multiZoneDraftMode:!1});if(!S)return t.statusCode=400,t.end("Bad Request"),null==n.waitUntil||n.waitUntil.call(n,Promise.resolve()),null;let{buildId:E,deploymentId:O,params:y,nextConfig:C,parsedUrl:w,isDraftMode:A,prerenderManifest:N,routerServerContext:b,isOnDemandRevalidate:M,revalidateOnlyGenerated:P,resolvedPathname:T,clientReferenceManifest:q,serverActionsManifest:z}=S,L=(0,s.normalizeAppPath)(h),j=!!(N.dynamicRoutes[L]||N.routes[T]),I=async()=>((null==b?void 0:b.render404)?await b.render404(e,t,w,!1):t.end("This page could not be found"),null);if(j&&!A){let e=!!N.routes[T],t=N.dynamicRoutes[L];if(t&&!1===t.fallback&&!e){if(C.adapterPath)return await I();throw new R.NoFallbackError}}let _=null;!j||x.isDev||A||(_="/index"===(_=T)?"/":_);let H=!0===x.isDev||!j,k=j&&!H;z&&q&&(0,i.setManifestsSingleton)({page:h,clientReferenceManifest:q,serverActionsManifest:z});let D=e.method||"GET",U=(0,o.getTracer)(),B=U.getActiveScopeSpan(),J=!!(null==b?void 0:b.isWrappedByNextServer),$=!!(0,r.getRequestMeta)(e,"minimalMode"),K=(0,r.getRequestMeta)(e,"incrementalCache")||await x.getIncrementalCache(e,C,N,$);null==K||K.resetRequestCache(),globalThis.__incrementalCache=K;let F={params:y,previewProps:N.preview,renderOpts:{experimental:{authInterrupts:!!C.experimental.authInterrupts,useCacheTimeout:C.experimental.useCacheTimeout},cacheComponents:!!C.cacheComponents,validationLevel:C.experimental.instantInsights.validationLevel,supportsDynamicResponse:H,incrementalCache:K,hmrRefreshHash:(0,r.getRequestMeta)(e,"hmrRefreshHash"),cacheLifeProfiles:C.cacheLife,staticPageGenerationTimeout:C.staticPageGenerationTimeout,waitUntil:n.waitUntil,onClose:e=>{t.on("close",e)},onAfterTaskError:void 0,onInstrumentationRequestError:(t,a,n,r)=>x.onRequestError(e,t,n,r,b)},sharedContext:{buildId:E,deploymentId:O}},G=new l.NodeNextRequest(e),V=new l.NodeNextResponse(t),X=c.NextRequestAdapter.fromNodeNextRequest(G,(0,c.signalFromNodeResponse)(t)),Z=async({previousCacheEntry:a})=>{try{if(!$&&M&&P&&!a)return t.statusCode=404,t.setHeader("x-nextjs-cache","REVALIDATED"),t.end("This page could not be found"),null;let r=await x.handle(X,F);e.fetchMetrics=F.renderOpts.fetchMetrics;let o=F.renderOpts.pendingWaitUntil;o&&n.waitUntil&&(n.waitUntil(o),o=void 0);let i=F.renderOpts.collectedTags;if(!j)return await (0,p.sendResponse)(G,V,r,o),null;{let e=await r.blob(),t=(0,m.toNodeOutgoingHttpHeaders)(r.headers);i&&(t[g.NEXT_CACHE_TAGS_HEADER]=i),!t["content-type"]&&e.type&&(t["content-type"]=e.type);let a=void 0!==F.renderOpts.collectedRevalidate&&!(F.renderOpts.collectedRevalidate>=g.INFINITE_CACHE)&&F.renderOpts.collectedRevalidate,n=void 0===F.renderOpts.collectedExpire||F.renderOpts.collectedExpire>=g.INFINITE_CACHE?!1!==a&&a>0?C.expireTime:void 0:F.renderOpts.collectedExpire;return{value:{kind:v.CachedRouteKind.APP_ROUTE,status:r.status,body:Buffer.from(await e.arrayBuffer()),headers:t},cacheControl:{revalidate:a,expire:n}}}}catch(t){throw(null==a?void 0:a.isStale)&&await x.onRequestError(e,t,{routerKind:"App Router",routePath:h,routeType:"route",revalidateReason:(0,u.getRevalidateReason)({isStaticGeneration:k,isOnDemandRevalidate:M})},!1,b),t}},W=async(r,i)=>{try{var s,l;let r=await x.handleResponse({req:e,nextConfig:C,cacheKey:_,routeKind:a.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:N,isRoutePPREnabled:!1,isOnDemandRevalidate:M,revalidateOnlyGenerated:P,responseGenerator:Z,waitUntil:n.waitUntil,isMinimalMode:$});if(!j)return;if((null==r||null==(s=r.value)?void 0:s.kind)!==v.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==r||null==(l=r.value)?void 0:l.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});$||t.setHeader("x-nextjs-cache",M?"REVALIDATED":r.isMiss?"MISS":r.isStale?"STALE":"HIT"),A&&t.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let o=(0,m.fromNodeOutgoingHttpHeaders)(r.value.headers);$&&j||o.delete(g.NEXT_CACHE_TAGS_HEADER),!r.cacheControl||t.getHeader("Cache-Control")||o.get("Cache-Control")||o.set("Cache-Control",(0,f.getCacheControlHeader)(r.cacheControl)),await (0,p.sendResponse)(G,V,new Response(r.value.body,{headers:o,status:r.value.status||200}));return}catch(t){if(t instanceof R.NoFallbackError||await x.onRequestError(e,t,{routerKind:"App Router",routePath:L,routeType:"route",revalidateReason:(0,u.getRevalidateReason)({isStaticGeneration:k,isOnDemandRevalidate:M})},!1,b),j)throw t;await (0,p.sendResponse)(G,V,new Response(null,{status:500}));return}finally{(()=>{if(!r)return;let e=t.statusCode;r.setAttributes({"http.status_code":e,"next.rsc":!1}),e&&e>=500&&(r.setStatus({code:o.SpanStatusCode.ERROR}),r.setAttribute("error.type",e.toString()));let a=U.getRootSpanAttributes();if(!a)return;if(a.get("next.span_type")!==d.BaseServerSpan.handleRequest)return console.warn(`Unexpected root span type '${a.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let n=a.get("next.route")||L,s=`${D} ${n}`;r.setAttributes({"next.route":n,"http.route":n,"next.span_name":s}),r.updateName(s),i&&i!==r&&(i.setAttribute("http.route",n),i.updateName(s))})()}};if(J&&B)await W(B,void 0);else{let t=U.getActiveScopeSpan();await U.withPropagatedContext(e.headers,()=>U.trace(d.BaseServerSpan.handleRequest,{spanName:`${D} ${h}`,kind:o.SpanKind.SERVER,attributes:{"http.method":D,"http.target":e.url}},e=>W(e,t)),void 0,!J)}}e.s(["handler",0,O,"patchFetch",0,function(){return(0,n.patchFetch)({workAsyncStorage:h,workUnitAsyncStorage:S})},"routeModule",0,x,"serverHooks",0,E,"workAsyncStorage",0,h,"workUnitAsyncStorage",0,S])}];

//# sourceMappingURL=_05r_otw._.js.map