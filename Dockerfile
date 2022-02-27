# pull official base image
FROM node:16.14.0-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY ./apps/ ./apps/
COPY ./packages/ ./packages/

RUN yarn i
RUN yarn build:packages

# add app
COPY . ./

# start app
CMD ["yarn", "start:admin"]