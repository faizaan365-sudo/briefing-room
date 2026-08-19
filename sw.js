const C="briefing-rooms-v1";
self.addEventListener("install",e=>{ self.skipWaiting(); e.waitUntil(caches.open(C).then(c=>c.addAll(["./","./index.html","./manifest.json"]).catch(()=>{}))); });
self.addEventListener("activate",e=>{ e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim())); });
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET") return;
  e.respondWith(
    fetch(e.request).then(r=>{
      if(e.request.url.startsWith(self.location.origin)){ const cp=r.clone(); caches.open(C).then(c=>c.put(e.request,cp)); }
      return r;
    }).catch(()=>caches.match(e.request,{ignoreSearch:true}).then(m=>m||caches.match("./index.html")))
  );
});