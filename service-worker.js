/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-20b2733d'], (function (workbox) { 'use strict';

  /**
  * Welcome to your Workbox-powered service worker!
  *
  * You'll need to register this file in your web app.
  * See https://goo.gl/nhQhGp
  *
  * The rest of the code is auto-generated. Please don't update this file
  * directly; instead, make changes to your Workbox build configuration
  * and re-run your build process.
  * See https://goo.gl/2aRDsh
  */

  self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
      self.skipWaiting();
    }
  });
  workbox.clientsClaim();
  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */

  workbox.precacheAndRoute([{
    "url": "/css/font.css",
    "revision": "7e1c7ed5af4fc76fdcd7cc742e07cbbc"
  }, {
    "url": "/css/materialdesignicons.css.map",
    "revision": "87530aa149983d86938767da363b0160"
  }, {
    "url": "/css/materialdesignicons.min.css",
    "revision": "cb2c44628bcb13ea49acc793cafe535e"
  }, {
    "url": "/css/swiper.min.css",
    "revision": "05d695a64f857f25b1fdecb323bda515"
  }, {
    "url": "/css/vuetify.min.css",
    "revision": "1c24fb8517a6bd5afae276aaf4476365"
  }, {
    "url": "/favicon.ico",
    "revision": "158bf426a6f7ed10cf39525a0a98e47a"
  }, {
    "url": "/font/materialdesignicons-webfont-ie.eot",
    "revision": "a1a0ed860f50ffd42ba46d7c10f30255"
  }, {
    "url": "/font/materialdesignicons-webfont.eot",
    "revision": "a1a0ed860f50ffd42ba46d7c10f30255"
  }, {
    "url": "/font/materialdesignicons-webfont.ttf",
    "revision": "fe1545ef4dd1eef2f1e25528898fc0b3"
  }, {
    "url": "/font/materialdesignicons-webfont.woff",
    "revision": "63d2a5950fc212096c3612f71ae66f64"
  }, {
    "url": "/font/materialdesignicons-webfont.woff2",
    "revision": "7fb0e3780372f10f804513e2e0c39e78"
  }, {
    "url": "/font/roboto-v20-cyrillic_latin_latin-ext_cyrillic-ext-100.woff",
    "revision": "8e77447a5e0644cfa4f5ce82d2e51bcb"
  }, {
    "url": "/font/roboto-v20-cyrillic_latin_latin-ext_cyrillic-ext-100.woff2",
    "revision": "54ec0d616a940f11d7d8c14c7c5e7186"
  }, {
    "url": "/font/roboto-v20-cyrillic_latin_latin-ext_cyrillic-ext-100italic.woff",
    "revision": "0c3b709cdb7c5cd61d42baa79d75a8a1"
  }, {
    "url": "/font/roboto-v20-cyrillic_latin_latin-ext_cyrillic-ext-100italic.woff2",
    "revision": "b618bc43b59b7b1cd894921686195737"
  }, {
    "url": "/font/roboto-v20-cyrillic_latin_latin-ext_cyrillic-ext-300.woff",
    "revision": "c46434d46a72919eb141228dd0144b6c"
  }, {
    "url": "/font/roboto-v20-cyrillic_latin_latin-ext_cyrillic-ext-300.woff2",
    "revision": "390b76012235541ede113bd336282b26"
  }, {
    "url": "/font/roboto-v20-cyrillic_latin_latin-ext_cyrillic-ext-300italic.woff",
    "revision": "cf6e2d8c73bd32ecb3a47759f73b45e2"
  }, {
    "url": "/font/roboto-v20-cyrillic_latin_latin-ext_cyrillic-ext-300italic.woff2",
    "revision": "806989f337b8d4609fd705284b861e69"
  }, {
    "url": "/font/roboto-v20-cyrillic_latin_latin-ext_cyrillic-ext-500.woff",
    "revision": "851a2b5a8394eb1b868678bfd31a1a8a"
  }, {
    "url": "/font/roboto-v20-cyrillic_latin_latin-ext_cyrillic-ext-500.woff2",
    "revision": "6f69d99b9b0706a2a955ed42d64742a1"
  }, {
    "url": "/font/roboto-v20-cyrillic_latin_latin-ext_cyrillic-ext-500italic.woff",
    "revision": "23683e7bde61547ba7fd5020736c3097"
  }, {
    "url": "/font/roboto-v20-cyrillic_latin_latin-ext_cyrillic-ext-500italic.woff2",
    "revision": "cb047247abba3b00b6eef136ac59903b"
  }, {
    "url": "/font/roboto-v20-cyrillic_latin_latin-ext_cyrillic-ext-700.woff",
    "revision": "cf654de4c5d988526828f731f299d30a"
  }, {
    "url": "/font/roboto-v20-cyrillic_latin_latin-ext_cyrillic-ext-700.woff2",
    "revision": "f3501dc6e4b56028379328ddd8f0129f"
  }, {
    "url": "/font/roboto-v20-cyrillic_latin_latin-ext_cyrillic-ext-700italic.woff",
    "revision": "b637cf3c25928c417ca5d3959418e208"
  }, {
    "url": "/font/roboto-v20-cyrillic_latin_latin-ext_cyrillic-ext-700italic.woff2",
    "revision": "658033002d0658ce75d2b8ef43f1a2cd"
  }, {
    "url": "/font/roboto-v20-cyrillic_latin_latin-ext_cyrillic-ext-900.woff",
    "revision": "c5ae9c612d139adbc7b55ff5f4a14784"
  }, {
    "url": "/font/roboto-v20-cyrillic_latin_latin-ext_cyrillic-ext-900.woff2",
    "revision": "4d9c46cd7c9207fd005c033832be30cd"
  }, {
    "url": "/font/roboto-v20-cyrillic_latin_latin-ext_cyrillic-ext-900italic.woff",
    "revision": "b41a81104faae44352df200139cf0851"
  }, {
    "url": "/font/roboto-v20-cyrillic_latin_latin-ext_cyrillic-ext-900italic.woff2",
    "revision": "e6cbd387224600e352c6d999e33b3c80"
  }, {
    "url": "/font/roboto-v20-cyrillic_latin_latin-ext_cyrillic-ext-italic.woff",
    "revision": "c762d850e2e8d0e29047608715196736"
  }, {
    "url": "/font/roboto-v20-cyrillic_latin_latin-ext_cyrillic-ext-italic.woff2",
    "revision": "d1f23769ca583437f310764146ec7fbc"
  }, {
    "url": "/font/roboto-v20-cyrillic_latin_latin-ext_cyrillic-ext-regular.woff",
    "revision": "a91ad097d24828af724d4fee36a063ed"
  }, {
    "url": "/font/roboto-v20-cyrillic_latin_latin-ext_cyrillic-ext-regular.woff2",
    "revision": "9549360090baf2eb8b25d3a9708fc19d"
  }, {
    "url": "/img/icons/icon-144x144.png",
    "revision": "1c7b01cd5342c0458e8a7782c3a9ed09"
  }, {
    "url": "/img/icons/icon-192x192.png",
    "revision": "f6605b0e7da18df5f65f5f8cac5b75c5"
  }, {
    "url": "/img/icons/icon-512x512.png",
    "revision": "4d2e509d63bd7dd19bf4d59bb06c7c12"
  }, {
    "url": "/index.html",
    "revision": "d7d5e719404983372b49fcc8f4ee09de"
  }, {
    "url": "/js/index.js",
    "revision": "b747da32635920252830a8bff233dd67"
  }, {
    "url": "/js/vue.min.js",
    "revision": "b21b8531847604ab5f2f5caaef51ba31"
  }, {
    "url": "/js/vuetify.min.js",
    "revision": "2ffd6542712273106c7e9e9f90e64025"
  }, {
    "url": "/manifest.json",
    "revision": "342271cf1741c54a0eeb6010ca9f19ed"
  }], {
    "directoryIndex": "/index.html"
  });
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("/index.html")));

}));
