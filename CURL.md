# CURL

## password login

```shell script
curl -v \
-X POST http://localhost:9001/auth/login \
-d '{"email": "trejgun@gmail.com", "password": "My5up3r5tr0ngP@55w0rd"}' \
-H "Content-Type: application/json"
```


## biometric login

```shell script
curl -v \
-X POST http://localhost:9001/auth/biometric \
-d '{"email": "trejgun@gmail.com", "signature": "lHBr/oUxp8LYUojNLbTWQ3z3T5Lb2J2fAbgcfyD0PGzlE8Wm3ZQaMyzA3AHgMlHEqnqUKOaRCXGLi6DJkERL2PKDJh3SIWxZujR0gP28rTX+kUJaKAysLRZVqWESXBsnkszSIVYeQH7Y9y9aocGOgye+8HsIgFRz8d5ttF579YUIqs26vhPKLgYiWKUQ4kqAhUhbNQgsuUaBEm9APYDdtb8872mPWX06k52Ig4IAM3dSKi5HGXutY9Ks88Gp69HV0zBHvjrIqHqxF1gUn0GMqDdZQHw/YwVPJAPNo8fPVEpjrasp2pLO5f5g5a2GG/nvDUJPmbuB0TNrcGS4pLwfAA=="}' \
-H "Content-Type: application/json"
```
