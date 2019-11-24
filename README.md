# Session based authorization from Nest.js

This is a code sample for my [article](https://trejgun.github.io/articles/session-based-authorization-for-nestjs)

## Optional

This example shows how to setup Nest.js authorization various 3rd party providers

 - google
 - facebood
 - onelogin
 
you have to have then configured in advance
only local provider works out of the box


## Manual installation

I assume you have node, yarn/npm, postgres, redis
 
First of all you have to download dependencies

```bash
npm i
```

Then check config in
```bash
nano .env
```

and start in watch mode
```bash
npm run start
```

or in production mode
```bash
npm run build
npm run prod
```

## Docker

Otherwise you can use docker 

```shell script
docker-compose up --build
```

## Usage

Navigate to http://localhost:3000/auth/login 

log in using **trejgun@gmail.com/My5up3r5tr0ngP@55w0rd**

or picking provider name from list

then navigate to http://localhost:3000/users/profile
