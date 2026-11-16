# Landing de Pixeo Publish

Sitio estático independiente que se sirve en la raíz de
https://publish.pixeocreativestudio.com/ (la app sigue en `/auth/login` y demás rutas).

Estructura: esta carpeta ES la raíz del sitio, tal como la monta nginx.

```
index.html  robots.txt  sitemap.xml      -> /, /robots.txt, /sitemap.xml
landing/css  landing/js  landing/img  landing/fonts   -> /landing/...
```

Sin dependencias ni build: HTML, un CSS, un JS (parallax del hero, opcional) y fuentes
propias (DM Sans y Manrope, licencia OFL incluida). El CSP del contenedor solo permite
recursos propios; no añadir scripts inline ni recursos externos.

## Despliegue

1. Copiar esta carpeta a `/opt/pixeo-publish/landing` (junto al `docker-compose.yml`),
   junto con `pixeo/deploy/landing-nginx.conf`.
2. Opcional: `sh pixeo/deploy/sitemap-lastmod.sh` antes de copiar, para fechar el sitemap.
3. `docker compose up -d pp-landing`.
4. En Caddy, enrutar a `pixeo-publish-landing:80` solo `/`, `/landing/*`, `/robots.txt` y
   `/sitemap.xml`; el resto sigue yendo a la app.

Los activos no llevan hash: si cambian, nginx los cachea hasta 30 días (el HTML, 10 min).

## Origen

Derivada de la landing de la web de Pixeo (`/publish/`). El selector Mensual/Anual es CSS
puro (radios dentro de un `fieldset` y `:has()`).
