# Step 1
FROM node:14.13.0-alpine as build-step
RUN mkdir /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
ENV JOJO="hello_from_dockerfile"
RUN npm run build
ENTRYPOINT yarn react-env --env APP_ENV

# Stage 2
FROM nginx:1.19.10-alpine
COPY --from=build-step /app/build /usr/share/nginx/html