FROM node:lts as builder

# WORKDIR /usr/src/app
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run dev

# FROM nginx:alpine as production-build

# COPY nginx.conf /etc/nginx/nginx.conf

# RUN rm -rf /usr/share/nginx/html/*

# COPY --from=builder /usr/src/app/dist /usr/share/nginx/html/

# EXPOSE 80

# ENTRYPOINT ["nginx", "-g", "daemon off;"]