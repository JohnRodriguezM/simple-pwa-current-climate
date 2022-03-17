"use strict";

let CACHE_NAME = "v1_cache_aprende_web";

let urlToCache = [
  // se guarda la raiz del documento
  "./",
  // se guarda el documento index.html
  "./index.html",
  // se guarda el cdnjs de la libreria hamburger.css
  "https://cdnjs.cloudflare.com/ajax/libs/hamburgers/1.1.3/hamburgers.min.css",
  // se guarda el cnjs de la libreria bulma.css
  "https://cdnjs.cloudflare.com/ajax/libs/bulma/0.9.3/css/bulma.min.css",
  // se guarda el cnjs de la libreria font-awesome
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css",
  // se guarda el archivo de estilo
  "./css/styles.css",
  // archivo en donde se condiciona la existencia del serviceWorker
  "./index.js",
  // archivo en donde se manda a llamar firebase
  "./js/firebase/appFirebase.mjs",
  "./js/dinamico.js",
  // archivo donde se hace interactiva la navbar
  "./js/navBar.js",
  // imagenes del archivo
  "./assets/logo.webp",
  "./assets/images.png",
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlToCache).then(() => {
          self.skipWaiting();
        });
      })
      .catch((err) => {
        console.error(err);
      })
  );
});

self.addEventListener("activate", (e) => {
  const cacheWhiteList = [CACHE_NAME];

  e.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            //eliminamos lo que ya no se necesita en cache
            if (cacheName.indexOf(cacheName) === -1) {
              return caches.delete(cacheName);
            }
          })
        );
      })
      // le indica al serviceWorker activar la cache actual
      .then(() => self.clients.claim())
      .catch((err) => console.log(err))
  );
});

self.addEventListener("fetch", (e) => {
  // responder ya sea con el objeto en caché o continuar y buscar la url real
  e.respondWith(
    caches.match(e.request).then((res) => {
      if (res) {
        // recuperamos del caché
        return res;
      }
      // solicta nuevamente a la url
      return fetch(e.request);
    })
  );
});

/*
  1. asignar un nombre a la version de nuestro cache y una de las caracteristicas que tienen las pwa es que nos permiten guardar en cache todos los recurso estáticos que a lo mejor no van a cambiar en nuestra app y que los podemos guardar directamente en el disco duro del usuario
  
  adicionalmente la pwa tiene una caracteristicas un poco mas avanzadas
  como:
  - API DE SINCRONIZACION EN SEGUNDO PLANO
  - LANZAR NOTIFICACIONES PUS
  */

// entonces creo mi nombre de cache

// ahora, los serviceWorker van a tener 3 eventos muy importantes
// el self es para hacer referencia a si mismo
/*
 1.
 durante la fase de instalacion, generalmente se alamacena en cache los archivos estáticos
 */
/*
2.
una vez se instala el service Worker, se activa y busca los recursos para hacer que funcione sin conexión
*/

/*
      3. se va a encargar de recuperar todos los recursos del navegador, cuando si tenga conexion a internet, ya actualizar si hay algun cambio
      */
