# Session based authorization from Nest.js

This is a code sample for my [article](https://trejgun.github.io/articles/session-based-authorization-for-nestjs)

## Optional

This example shows how to setup Nest.js authorization various 3rd party providers

 - google
 - facebood
 - onelogin

you have to have them configured in advance
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

You can log in to the application using **trejgun@gmail.com/My5up3r5tr0ngP@55w0rd** by executing this CURL request

```shell script
curl -v \
-X POST http://localhost:3000/auth/login \
-d '{"email": "trejgun@gmail.com", "password": "My5up3r5tr0ngP@55w0rd"}' \
-H "Content-Type: application/json"
```

Or asymmetric key

```shell script
curl -v \
-X POST http://localhost:3000/auth/biometric \
-d '{"email": "trejgun@gmail.com", "signature": "lHBr/oUxp8LYUojNLbTWQ3z3T5Lb2J2fAbgcfyD0PGzlE8Wm3ZQaMyzA3AHgMlHEqnqUKOaRCXGLi6DJkERL2PKDJh3SIWxZujR0gP28rTX+kUJaKAysLRZVqWESXBsnkszSIVYeQH7Y9y9aocGOgye+8HsIgFRz8d5ttF579YUIqs26vhPKLgYiWKUQ4kqAhUhbNQgsuUaBEm9APYDdtb8872mPWX06k52Ig4IAM3dSKi5HGXutY9Ks88Gp69HV0zBHvjrIqHqxF1gUn0GMqDdZQHw/YwVPJAPNo8fPVEpjrasp2pLO5f5g5a2GG/nvDUJPmbuB0TNrcGS4pLwfAA=="}' \
-H "Content-Type: application/json"
```

Also you can login with provider of your choice on
http://localhost:3000/auth/login

This will return your profile
```json
{"id":1,"email":"trejgun@gmail.com","roles":["admin"]}
```

This will return a list of users
```json
{"list":[{"id":1,"email":"trejgun@gmail.com","roles":["admin"]}],"count":1}
```

## Contribution

RPs, especially with new providers, are welcome
