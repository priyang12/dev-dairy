---
TechName: FULL-STACK-MonoRepo
Title: Dev Dairy
Technologies:
  [React, Serverless, Node.js, Express, MongoDB, GCloud, Turborepo, Workbox]
---

## Description

Dev dairy is a web app that let's the user create project and create posts and work sessions to keep track of their projects. the user can also share the progress of the work where they have done with a link to show to other people.

It's a Full-stack web appliaction.The user can craete project and create posts and worksession to keep track of their projects. the user can also share the progress of the work where they have done with a link to show to other people. there are other feature that can be explored.

it consists of a FrontEnd and a BackEnd. it's also uses Serverless Functions for doing the Small tasks like resetPassword, SendGrettingmails, others which is deployed in Gcloud.it uses other services of Gcloud Services.

## Usage Video

https://user-images.githubusercontent.com/72823974/209571885-10a71ad2-4551-4012-a664-2c2036679c63.mp4

## Technologies

1. Client
   - React
   - Chakra UI
   - @reduxjs/toolkit
   - workbox
   - @testing-library
   - idb
   - msw
2. Backend
   - Node.js
   - Express.js
   - @google-cloud
   - mongoose
3. Serverless
   - @google-cloud/functions-framework
   - @sendgrid/mail
4. Monorepo
   - Turborepo
   - Docker

## Client Features

- PWA
- CRUD User
- CRUD Project
- CRUD Posts
- CRUD WorkSession
- Share Project and Work Sessions
- Test User

## Server Features

- Client APIs
- Cache Response
- Rate Limiter
- Google Cloud Services
- Tasks
- Cors
- Seeder
- Others

## Setup Project

Clone the repo first and than follow the steps.

### Install

```bash
npm i # yarn
```

This will install all the depedency of projects due to Turborepo.

### Gcloud setup

for running the backend you are going need the keys.json file that we can that can access the Gcloud Services using Service acount key.

Refrence Link :

- https://cloud.google.com/sdk/docs/install
- https://cloud.google.com/sdk/gcloud/reference/iam/service-accounts/list
- https://cloud.google.com/iam/docs/creating-managing-service-accounts

### Env Variables

Create a .env file in then root and add the following

```
NODE_ENV=
URI=
Test_URI=
jwtSecre=
PORT=
AGENDA_DB_COLLECTION=
pooltime=
maxConcurrency=
ResetPasswordURL=
GreetingURL=
GoogleProjectId=
location=
ServerLessMongo=
ServerLessMongoTest=
GOOGLE_APPLICATION_CREDENTIALS= // .json key
```

### Run

You can run backend and frontend toghther or use frontend seperatly for testing or just building UI using MSW.

#### Client Run

```bash
cd Client
npm run msw
```

add the code in Client/src/index.ts

```ts
import worker from "./mock/browser";

if (proccess.env.REACT_APP_ENVIRONMENT === "test") {
  worker.start();
}
```

```bash
npm start:test
```

### Server Run

now before you run the code it will work but as you can see in the .ENV file `ResetPasswordURL` and `GreetingURL` which is a serverless application so when you run the application the server will start but you will not able to use some features.

in order to use those feature you need to deploy the Serverless Functions and get the URL and set the ENV

```bash
cd Server
npm run server
```

### Run Client and Server

```bash
npm run dev
```

Note : if you have use MSW make sure to remove the msw by runing, so the the frontend can mak api call to backend.

```bash
cd Client
npm run msw:cleanup
```

### Build

```bash
npm run build # build everything
```

you can also build the indduvial in package.josn

### Build Docker

This will build the Frontend and backend Docker image that will serve the Frontend React applicaiton.

```bash
npm run deploy
```

### Run Docker

```bash
docker run -p 5001:5001 dairy
```
