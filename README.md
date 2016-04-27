# api

[![Build Status](https://travis-ci.org/waiterio/api.svg?branch=master)](https://travis-ci.org/waiterio/api)
[![Code Climate](https://codeclimate.com/github/waiterio/api/badges/gpa.svg)](https://codeclimate.com/github/waiterio/api)
[![Issue Count](https://codeclimate.com/github/waiterio/api/badges/issue_count.svg)](https://codeclimate.com/github/waiterio/api)

testing url currently live at heroku
https://fathomless-crag-87118.herokuapp.com/api/


##Getting your Token
All Endpoints at `/api/*` are protected by checking the token that you send as one of the *HEADERS* named `access-token`. You can get your token by executing a POST request to the `/authenticate` endpoint. Two fields are mandatory: `username` and `password`. I already created a basic guest account. The procedure should look a little bit like the following:

```
POST http://https://fathomless-crag-87118.herokuapp.com/authenticate
Body of the request

{
  "username": "guest",
  "password": "guest"
}
```

Which results in an answer similar to this one:

```
Status: 200 OK

{
  "access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHBpcmVzIjoxNDYxMTg4Mzc3ODc1LCJ1c2VybmFtZSI6ImpvbmFoIiwicm9sZSI6ImFkbWluIn0.daW-SRPv8pBuMdSiadSBB8xroAIoq-D_MxJ4LiHfQCo",
  "expires":1461188377875,
  "user":{
    "id":18,
    "username":"guest",
    "password":"$2a$10$s0m0I9aQWTqFpZqLpvt7p.wsOFnmcVsSrSfsddfEIcxffrdNAaPhfHvWNr2",
    "role":"admin",
    "email":"guest@waiter.io"
  }
}
```
