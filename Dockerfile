# pull official base image
FROM node:16.14.0-alpine

# set working directory
WORKDIR /app

ARG APP_MODULE

# copy files
COPY ./apps/${APP_MODULE}/ ./apps/${APP_MODULE}/
COPY ./packages/ ./packages/
COPY package.json ./
COPY yarn.lock ./
COPY ./apps/${APP_MODULE}/package.json ./apps/${APP_MODULE}/
COPY ./packages/utilities/package.json ./packages/utilities/
COPY ./packages/api/package.json ./packages/api/
COPY ./packages/components/package.json ./packages/components/

RUN yarn
RUN yarn build:packages

# add app
COPY . ./

# start app
CMD ["yarn", "start:admin"]