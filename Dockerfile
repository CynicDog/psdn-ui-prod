# Stage 1: Build React App
FROM node:18 AS build

WORKDIR /app

# Accept the build argument for AZURE_CLIENT_ID
ARG REACT_APP_AZURE_CLIENT_ID
ENV REACT_APP_AZURE_CLIENT_ID=${REACT_APP_AZURE_CLIENT_ID}

# Accept the build argument for System API service url
ARG REACT_APP_BACKEND_SERVER_URL
ENV REACT_APP_BACKEND_SERVER_URL=${REACT_APP_BACKEND_SERVER_URL}

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy build files
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Create directory for SSL certificates
RUN mkdir -p /etc/nginx/ssl

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]
