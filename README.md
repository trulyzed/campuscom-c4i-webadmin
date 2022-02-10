# hir-webadmin

### Compatible node version for this project

```
node v16.13.0
```

### How to install node

1.  via [nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
2.  [directly](https://nodejs.dev/download/)

### To install the node packages for the first time

```
git clone git@github.com:jxntm/hir-webadmin.git
cd hir-webadmin
yarn install --pure-lockfile
```

### To run the application in development mode

```
cd hir-webadmin/app
cp .env.example .env
```

change only the following variable in `.env` file

```
REACT_APP_API_ROOT=https://localhost:8443
```

herer `https://localhost:8443` is the api url of `dev-hir`

After changing the `.env` file, do the following

```
cd hir-webadmin/app
yarn start
```

### To build the project and update the snapshot

```
cd hir-webadmin/script
./snap.sh
```

during the build process, in windows machine, there might be an error regarding `Node Error: resolve-url-loader: CSS error`. Do the following to resolve the issue

```
node_modules/resolve-url-loader

open

index.js

and under var options change removeCR from "false" to "true".
```

To install packages from `@packages` folder,
```
yarn workspace instructor add -W @packages/utilities@1.0.0
```