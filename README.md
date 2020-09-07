# drspoiler
The worst website on the internet.

![drspoiler-backend](https://github.com/rramiachraf/drspoiler/workflows/drspoiler-backend/badge.svg)
![founder: Achraf RRAMI](https://img.shields.io/badge/made%20by-Achraf%20RRAMI-blue)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

### Setup
* Node.js 
* NGINX
* Redis
* PostgreSQL database
* Valid AWS Account

### Environment Variables
#### Server:

CONNECTION_STRING: A valid postgreSQL connection string.

COOKIE_SECRET: A secret used by the session middleware to unsign the cookies.

AWS_ACCESS_KEY_ID: AWS Key.

AWS_SECRET_ACCESS_KEY: AWS Secret Key.

#### Client:
API_URL: The REST API URL.