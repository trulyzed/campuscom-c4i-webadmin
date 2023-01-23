# pull official base image
FROM node:16.14.0-alpine

# set working directory
WORKDIR /app

ARG APP_MODULE
ARG REACT_APP_API_ROOT
ARG REACT_APP_CDN_URL
ARG REACT_APP_STOREFRONT_URL
ARG REACT_APP_ENROLLMENT_URL
ARG REACT_APP_OPEN_REPLAY_PRIVATE_KEY

# copy files
COPY ./apps/${APP_MODULE}/ ./apps/${APP_MODULE}/
COPY ./packages/ ./packages/
COPY package.json ./
COPY yarn.lock ./
COPY ./apps/${APP_MODULE}/package.json ./apps/${APP_MODULE}/
COPY ./packages/utilities/package.json ./packages/utilities/
COPY ./packages/services/package.json ./packages/services/
COPY ./packages/components/package.json ./packages/components/

RUN yarn
RUN yarn build:packages

# add app
COPY . ./

# start app
CMD ["yarn", "start:admin"]