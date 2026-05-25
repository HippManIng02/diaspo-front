# Stage 1 — Build
FROM node:lts-alpine3.23 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2 — Serve
FROM nginx:stable-alpine
COPY --from=build /app/dist/diaspo-front/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]