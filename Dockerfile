# pull official base image
FROM node:16.14.0-alpine

# set working directory
WORKDIR /app

# copy files
COPY ./apps/ ./apps/
COPY ./packages/ ./packages/
COPY package.json ./
COPY yarn.lock ./
COPY ./apps/admin/package.json ./apps/admin/
COPY ./packages/utilities/package.json ./packages/utilities/
COPY ./packages/api/package.json ./packages/api/
COPY ./packages/components/package.json ./packages/components/

RUN yarn
RUN yarn build:packages

# add app
COPY . ./

# start app
CMD ["yarn", "start:admin"]