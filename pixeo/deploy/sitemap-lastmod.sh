#!/bin/sh
# Estampa en landing/sitemap.xml el día de hoy (UTC) como lastmod. Se corre al copiar la
# carpeta landing al servidor, para que la fecha sea la del despliegue y no un literal viejo.
set -eu
dir="$(dirname "$0")/../landing"
dia="$(date -u +%F)"
sed -i "s|<lastmod>[^<]*</lastmod>|<lastmod>${dia}</lastmod>|" "$dir/sitemap.xml"
echo "sitemap.xml lastmod = ${dia}"
