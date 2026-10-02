# ---- Stage 1: build the static site with Node ----
FROM node:24-slim AS build
WORKDIR /app
COPY package.json package-lock.json* ./
# Second install makes sure sharp's native binary matches this Linux image,
# even if the lockfile was created on Windows.
RUN npm install --no-audit --no-fund \
 && npm install --no-save --no-audit --no-fund --os=linux --cpu="$(node -p process.arch)" sharp@0.35.5
COPY . .
RUN npm run build

# ---- Stage 2: serve the built files with nginx (no Node at runtime) ----
FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK --interval=60s --timeout=3s CMD wget -q -O /dev/null http://127.0.0.1/ || exit 1
