FROM node:alpine as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
RUN npm install axios
COPY . ./
RUN npm run build
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]