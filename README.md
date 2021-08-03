# Google Authentication API

NodeJs Rest api using passportJs to build Google auth api

#### Configuration (/config/config.env)

you should add this three informations

- MONGO_URL
- GOOGLE_CLIENT_ID
- GOOGLE_SECRET

#### Routers

Authentication (Login)

     GET /auth/google

Logout

     GET /auth/logout

#### Features

     Whene new login detected it will disconnect the old sessions
