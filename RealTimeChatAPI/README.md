Create documentation for your API using Swagger. Include details about available
endpoints, request/response formats, and authentication requirements.
Include instructions on how to set up and run the Dockerized application.

# 📋 Table of Contents

- 📅 [What is this API ?](#what-is-this-api)
  - 🚀 [Demo](#demo)
- 🔨 [Installation](#installation)
  - ⚙ [Global setup](#global-setup)
  - 🍏 [Node.js](#nodejs)
  - 🐳 [Docker](#docker)
  - 🥕 [RabbitMQ](#rabbitmq)
  - 🐇 [Directus](#directus)
- 🗜 [How to use](#examples)
  - 🔀 [Api endpoints](#endpoints)
- 🔐 [Authentication Process](#authrequirments)
- 💯 [Tests](#tests)
  - 🧪 [Unit and E2E tests](#e2e-test)
  - 🥒 [Acceptance tests](#acc-test)
  - 👽 [Mutant testing](#mut-test)
- 🌿 [Env variables](#env-variables)
- 🃏 [Folder Structure](#folder-structure)
- ☑️ [Code analysis and consistency](#code-analysis-and-consistency)
- 📈 [Releases & Changelog](#versions)
- ❤️ [Contributors](#contributors)
- ©️ [License](#license)

# <a id="what-is-this-api">📅 What is this API ?</a>

This is a cutting-edge solution designed to bring real-time communication capabilities to your applications. Built with the aim of facilitating instant, seamless interactions, it’s an ideal choice for applications that require live chat functionality. 🗨️💬

- ## <a id="demo"> 🚀 Demo </a>

  In other to covey fully the potential uses of this api I have prepared a demo app making use of this api's fuctionalities. bellow is the overviews of the app and some of this features in action.

  ### Functionalities

  This API provides a comprehensive set of features including

  - Instant messaging 💬,
  - Group chats 👥,
  - message history 📜,
  - online indicators 📝.
  <!-- - read receipts ✅, -->

  - ## Authentication
    An authentication system is provide using **jwt** (Jason Web Token) to authenticat users and grant access to the resources. this is done by setting a cookie in the users browser upon registration or login and the token key can also be found in the response to the login or registration. after the registration, the users ar granted a certen level of freedom on the ressources accesed.
  - ## Intant messaging
    With the use of web sockets the server listens and emits the `newMessage` event alongside the `messageData` concerned always keepinp up to date all users in each **chatroom/chatgroup** respectivly
  - ## Chat rooms
    Here, the combination of `http endpoins` and `sockets` allows us to create chat rooms which are stored and can always be retrived even ofter logingout. which sends us to the next feature
  - ## chat history
    The chat history of every chatgroup can always be fetched as it is aveilable for you to use. with the possibelity of viewing them on the nice admin pannel provided by directus. `USERNAME` and `PASSWORD REQUIRED`
  - ## Online status
    the server emits the `getOnlineUsers` event alongside the list of users id currently connected to the server so you can always know who is connected or not.
  - ## notifications
    lastly, every action trigers an evet that you can use as you will, the following are the events currently emited and listened by the serve
    - online users `getOnlineUsers`
    - send a message `newMessage`
    - joining a chat room `joinRoom`
    - leaving a chat room `leaveRoom`
    - new chat group `newRoom`

  It’s designed with scalability in mind, capable of handling a high volume of concurrent connections, making it suitable for both small and large-scale applications.

  ### Documentation

  We provide detailed documentation 📚 to guide you through the integration process. Whether you’re a seasoned developer or just getting started, our documentation is designed to provide you with the information you need to successfully integrate our API into your application.

  We’re excited for you to start using the Realtime Chat API and look forward to seeing the incredible applications you will build with it. 🚀

  Nguezet Kenfack Jordan Junior - Website
  Send email to Nguezet Kenfack Jordan Junior

# <a id="installation"> 🔨 Installation</a>

To install this project, you will need to have on your machine :

![Node](https://img.shields.io/badge/-nodejs-black?style=for-the-badge&logoColor=white&logo=node.js&color=366A31)
![NPM](https://img.shields.io/badge/-npm-black?style=for-the-badge&logoColor=white&logo=npm&color=B42D22)
![Docker](https://img.shields.io/badge/-Docker-black?style=for-the-badge&logoColor=white&logo=docker&color=004EA2)

- More on the [docker installation](#docker) procedure
- More on the [node installation](#nodejs) procedure
- More on the [mongodb installation](#mongodb) procedure

We recommend to use node **`version 18.15.0`** as it is the vesion used for the development of the API.

> [!NOTE](#note)  
> Using any other package manager like `pnpm`, `bun` or `yarn` may still be okay, but the compatibility with this package managers has not been verified.

After [installing nodejs](#nodejs) you will need to [install docker](#docker) and run the following commands

- move to the project folder directory

```bash
# move to the project ditectory
cd ./Realtimechat project
```

- Create the docker image of the project

```bash
# create docker image
docker compose up -d --build
```

- Run the project with following command

```bash
# Run docker container
docker compose up --attache chatapp
```

you should now bw able to see the chat app server starting on your docker virtual mechine and on your terminal. follow the various links to get to know more about the api.

- ## <a id="global-setup"> ⚙ Global setup</a>

  This api is bundeled witha a set of default values for its environment an you need to make sure these variables are well set if you need to deploy this app on a live server. but befor that take a look at the demo by following the link provided by your running server

  ### Development mode

  |      Name       |               Description               | Required | Default value |                   Limitations                    |
  | :-------------: | :-------------------------------------: | :------: | :-----------: | :----------------------------------------------: |
  |   `API_HOST`    | Host on which the API will be available |    ❌    |  `127.0.0.1`  |          If set, can't be empty string           |
  |   `API_PORT`    | Port on which the API will be available |    ❌    |    `4000`     | If set, must be a number between `0` and `65535` |
  | `DIRECTUS_HOST` |            Directus host URL            |    ❌    |  `directus`   |  If set, must match the directus container name  |
  | `DIRECTUS_PORT` |           Directus host PORT            |    ❌    |  `undefined`  |  If set, must match the directus container port  |
  |  `CORS_ORIGIN`  |           CORS allowed origin           |    ❌    |      `*`      |          If set, can't be empty string           |

  ### Using mysql (set if you have a running MySQL Container)

  |        Name         |       Description       | Required | Default value |                 Limitations                 |
  | :-----------------: | :---------------------: | :------: | :-----------: | :-----------------------------------------: |
  |   `DATABASE_HOST`   |     MySQL HOST name     |    ✅    |      ❌       | If set, must match the MySQL container name |
  |   `DATABASE_PORT`   |    MySQL PORT number    |    ✅    |      ❌       | If set, must match the MySQL container port |
  |   `DATABASE_NAME`   |   MySQL database name   |    ✅    |      ❌       |            Can't be empty string            |
  | `DATABASE_USERNAME` |   MySQL database user   |    ✅    |      ❌       |            Can't be empty string            |
  | `DATABASE_PASSWORD` | MySQL database password |    ✅    |      ❌       |            Can't be empty string            |

  ### Set this if you have a running rabbit mq container only

  |      Name       |         Description         | Required | Default value |                  Limitations                   |
  | :-------------: | :-------------------------: | :------: | :-----------: | :--------------------------------------------: |
  | `RABBITMQ_CACH` |  Caching RabbitMQ enabled   |    ✅    |    `false`    |       If set, must be `true` or `false`        |
  | `RABBITMQ_HOST` |  RabbitMQ server host name  |    ✅    |      ❌       | If set, must match the RabbitMQ container name |
  | `RABBITMQ_PORT` | RabbitMQ server port number |    ✅    |      ❌       |  If set, must match the MySQL container port   |

- ## <a id="docker">🐳 Docker installation</a>

  This section describes how to install Docker Engine on Windows, macOS, and Linux also known as Docker CE. Depending on the operationg system you have installed on your computer, the installation process differs

  1.  Install docker on [Linux OS](https://docs.docker.com/desktop/install/linux-install/)

  - Download the correct package for your Linux distribution and install it with the corresponding package manager.

    - [installation on debian](https://docs.docker.com/desktop/install/debian/)
    - [installation on Fedora](https://docs.docker.com/desktop/install/fedora/)
    - [installation on Ubuntu](https://docs.docker.com/desktop/install/ubuntu/)
    - [installation on Arch](https://docs.docker.com/desktop/install/archlinux/)

  2.  Install docker on [Windows OS](https://docs.docker.com/desktop/install/windows-install/)
  3.  Install docker on [Mac OS](https://docs.docker.com/desktop/install/mac-install/)

  > **Note** that Docker Desktop will not run if you do not agree to the terms. You can choose to accept the terms at a later date by opening Docker Desktop.

- ## <a id="nodejs">🍏 Nodejs installation</a>

  1.  First, download the Windows installer from the [Node.js website](https://nodejs.org/). You will have the choice between the LTS (Long Term Support) or Current version.

  2.  Once you have selected a version meets your needs, run the installer. Follow the prompts to select an install path and ensure the npm package manager feature is included along with the `Node.js` runtime. This should be the default configuration.

  3.  Restart your computer after the installation is complete.

  If you installed under the default configuration, `Node.js` should now be added to your PATH. Run command prompt or powershell and input the following to test it out:

  > node -v

  The console should respond with a version string.

  ```bash
  # for example
  $ node -v
  v18.15.0
  ```

  Repeat the process for npm:

  > npm -v

  ```bash
  # for example
  $ npm -v
  9.5.0
  ```

  If both commands work, your installation was a success, and you can start using Node.js!

# <a id="examples"> 🗜 How to use </a>

The following steps will guide you on how to use the api to develop your application. we a going to make use of the endpoints provided to you in the **endpoint documentation**. so you should keep an eye on it while working with through this tutorial.

- ## <a id="endpoints"> 🔀 Api endpoints </a>
  As you may have noticed, the endpoints are grouped according to the verious resources they provide. which are as follows
  - Ad

# <a id="authrequirments"> 🔐 Authentication Process </a>

# <a id="tests"> 💯 Tests </a>

- ## <a id="e2e-test"> 🧪 Unit and E2E tests </a>
- ## <a id="acc-test"> 🥒 Acceptance tests </a>
- ## <a id="mut-test"> 👽 Mutant testing </a>

# <a id="env-variables"> 🌿 Env variables </a>

# <a id="folder-structure"> 🃏 Folder Structure </a>

# <a id="code-analysis-and-consistency"> ☑️ Code analysis and consistency </a>

# <a id="versions"> 📈 Releases & Changelog </a>

# <a id="contributors"> ❤️ Contributors </a>

# <a id="license"> ©️ License </a>

This is the **first** version of the API **[Event Planning API](http://localhost:8000/docs)**. It is still under development.

# <p id="folder-structure">🃏 Folder Structure</a>

```bash

    EventPlaning
    │
    ├── EventPlanerAPI
    │   │
    │   ├── .dockerignore
    │   ├── .env
    │   ├── .hintrc
    │   ├── Dockerfile
    │   ├── package-lock.json
    │   ├── package.json
    │   ├── README.md
    │   ├── server.ts
    │   ├── swagger.js
    │   ├── tsconfig.json
    │   ├── typedoc.json
    │   ├── vitest.config.ts
    │   ├── src
    │   │   ├── controllers
    │   │   │   ├── eventController.ts
    │   │   │   ├── registerController.ts
    │   │   │   └── userController.ts
    │   │   │
    │   │   ├── events
    │   │   │   └── eventEmiter.ts
    │   │   │
    │   │   ├── middlewares
    │   │   │    ├── validationSchema
    │   │   │    │   ├── eventSchema.ts
    │   │   │    │   ├── index.ts
    │   │   │    │   └── userSchema.ts
    │   │   │    ├── authMiddleware.ts
    │   │   │    ├── dataValidation.ts
    │   │   │    ├── index.ts
    │   │   │    └── verifySignUp.ts
    │   │   │
    │   │   ├── models
    │   │   │    ├── userModel.ts
    │   │   │    └── eventModel.ts
    │   │   │
    │   │   ├── routes
    │   │   │    ├── eventRegisteringRoutes.ts
    │   │   │    ├── eventRoutes.ts
    │   │   │    └── userRoutes.ts
    │   │   │
    │   │   ├── services
    │   │        ├── jobs
    │   │        │   ├── jobHandler.ts
    │   │        │   └── jobsConf.ts
    │   │        ├── emailService
    │   │        │   ├── mailConfig.ts
    │   │        │   └── mailSender.ts
    │   │        └── rabbitMQ
    │   │            └── rabbitMQjobs.ts
    │   │
    │   │
    │   │
    │   ├── config
    │   │   └── config.ts
    │   ├── docs
    │   │   ├── assets
    │   │   │    ├── styles.css
    │   │   │    .
    │   │   ├── .nojekyll
    │   │   ├── index.html
    │   │   .
    │   ├── node_modules
    │   │   ├── ...
    │   │   .
    │   ├── public
    │   ├── test
    │   │   ├── eventController.test.ts
    │
    ├── .gitignore
    ├── .hintrc
    └── docker-compose.yaml

```

# <a id="installation">🔨 Installation</a>

## <a id="rabbitmq">🐇 [RabbitMQ install](https://www.rabbitmq.com/docs/install-windows)</a>

Using chocolatey

```bash
choco install rabbitmq
```

# <a id="tests">💯 Tests</a>

## 🧪 Unit and E2E tests

## 🥒 Acceptance tests

## 👽 Mutant testing

## ▶️ Commands

# <a id="env-variables">🌿 Env variables</a>

## On Docker

|        Name         |               Description               | Required |   Default value   |                   Limitations                    |
| :-----------------: | :-------------------------------------: | :------: | :---------------: | :----------------------------------------------: |
|       `HOST`        | Host on which the API will be available |    ❌    |    `eventapi`     |          If set, can't be empty string           |
|       `PORT`        | Port on which the API will be available |    ❌    |      `8000`       | If set, must be a number between `0` and `65535` |
|   `ENVIRONNEMENT`   |  Environment in which the API will run  |    ✅    |   `production`    |  Must be `development`, `production` or `test`   |
|   `DATABASE_HOST`   |        MongoDB database host URL        |    ✅    | `mongodb_server`  |              Can't be empty string               |
|   `DATABASE_PORT`   |          MongoDB database port          |    ❌    |      `27017`      | If set, must be a number between `0` and `65535` |
|   `DATABASE_NAME`   |          MongoDB database name          |    ✅    | `eventManagement` |              Can't be empty string               |
| `DATABASE_USERNAME` |          MongoDB database user          |    ✅    |        ❌         |              Can't be empty string               |
| `DATABASE_PASSWORD` |        MongoDB database password        |    ✅    |        ❌         |              Can't be empty string               |
|   `RABBITMQ_HOST`   |       RabbitMQ server uri address       |    ✅    | `rabbitmq_server` |              Can't be empty string               |
|    `CORS_ORIGIN`    |           CORS allowed origin           |    ❌    |        `*`        |          If set, can't be empty string           |

# <a id="code-analysis-and-consistency">☑️ Code analysis and consistency</a>

## 🔍 Code linting & formatting

![ESLint](https://img.shields.io/badge/-ESLint-black?style=for-the-badge&logoColor=white&logo=eslint&color=341BAB)

In order to keep the code clean, consistent and free of bad TS practices, more than **300 ESLint rules are activated** !

Complete list of all enabled rules is available in the **[.eslintrc.js file](http://localhost:8000/.eslintrc.js)**.

## ▶️ Commands

Before linting, you must follow the [installation steps](#installation).

Then, run one of the following commands :

```bash
# Lint
npm run lint
```

lint and fix errors.

```bash
# Lint and fix
npm run lint:fix
```

lint and fix only staged files.

```bash
# Lint and fix only on staged files (runs on pre-commit)
npm run lint:staged:fix
```

## 🥇 Project quality scanner

Multiple tools are set up to maintain the best code quality and to prevent vulnerabilities :

![CodeQL](https://img.shields.io/badge/-CodeQL-black?style=for-the-badge&logoColor=white&logo=github&color=2781FE)

You can check the **[CodeQL analysis report here](https://github.com/antoinezanardi/werewolves-assistant-api-next/security/code-scanning)**.

![SonarCloud](https://img.shields.io/badge/-SonarCloud-black?style=for-the-badge&logoColor=white&logo=sonarcloud&color=F37A3A)

SonarCloud summary is available **[here](https://sonarcloud.io/summary/new_code?id=antoinezanardi_werewolves-assistant-api-next)**.

[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=antoinezanardi_werewolves-assistant-api-next&metric=coverage)](https://sonarcloud.io/summary/new_code?id=antoinezanardi_werewolves-assistant-api-next)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=antoinezanardi_werewolves-assistant-api-next&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=antoinezanardi_werewolves-assistant-api-next)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=antoinezanardi_werewolves-assistant-api-next&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=antoinezanardi_werewolves-assistant-api-next)

[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=antoinezanardi_werewolves-assistant-api-next&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=antoinezanardi_werewolves-assistant-api-next)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=antoinezanardi_werewolves-assistant-api-next&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=antoinezanardi_werewolves-assistant-api-next)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=antoinezanardi_werewolves-assistant-api-next&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=antoinezanardi_werewolves-assistant-api-next)

[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=antoinezanardi_werewolves-assistant-api-next&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=antoinezanardi_werewolves-assistant-api-next)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=antoinezanardi_werewolves-assistant-api-next&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=antoinezanardi_werewolves-assistant-api-next)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=antoinezanardi_werewolves-assistant-api-next&metric=bugs)](https://sonarcloud.io/summary/new_code?id=antoinezanardi_werewolves-assistant-api-next)

# <a id="packege-config">🗳 Packages and Configuration files</a>

Hier you have all the packages and configurations necessary to the projects deployment.

## Package.json file

```json
{
  "type": "module",
  "name": "eventplanerapi",
  "version": "1.0.0",
  "description": "Event planning api",
  "main": "index.js",
  "scripts": {
    "start": "set NODE_ENV=production && nodemon -L --no-warnings --exec node --loader ts-node/esm server.ts",
    "dev": "set NODE_ENV=development && nodemon -L --no-warnings --exec node --loader ts-node/esm server.ts",
    "test": "vitest",
    "watch-docs": "npx typedoc ./src",
    "lint": "npx eslint ."
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@types/express": "^4.17.21",
    "@types/node": "^20.11.21",
    "@typescript-eslint/eslint-plugin": "7.1.1",
    "@typescript-eslint/parser": "7.1.1",
    "eslint": "8.57.0",
    "eslint-config-prettier": "9.1.0",
    "eslint-plugin-prettier": "5.1.3",
    "jsdoc": "^4.0.2",
    "nodemon": "^3.1.0",
    "ts-node-dev": "^2.0.0",
    "typescript": "^5.3.3",
    "vitest": "^1.3.1"
  },
  "dependencies": {
    "@types/amqplib": "^0.10.5",
    "@types/bcrypt-nodejs": "^0.0.31",
    "@types/cors": "^2.8.17",
    "@types/jsonwebtoken": "^9.0.6",
    "@types/nodemailer": "^6.4.14",
    "amqplib": "^0.10.3",
    "bcrypt-nodejs": "^0.0.3",
    "bottleneck": "^2.19.5",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.18.2",
    "joi": "^17.12.2",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.2.0",
    "nodemailer": "^6.9.11",
    "swagger-jsdoc": "^6.2.8",
    "swagger-ui-express": "^5.0.0",
    "ts-node": "^10.9.2",
    "typedoc-material-theme": "^1.0.2"
  }
}
```

# <a id="misc-commands">✨ Misc commands</a>

## 🌳 Animated tree visualisation of the project's evolution with **[Gource](https://gource.io/)**

```shell
# Please ensure that `gource` is installed on your system.
npm run gource
```

## 🖼 Create docker image with docker compose

```shell
docker compose up -d --build
```

## 🔀 Create git branch with a conventional name

```shell
npm run script:create-branch
```

## ⤴️ Create pull request against the `develop` branch from current branch

```shell
npm run script:create-pull-request
```

## 📣 To all IntelliJ IDEs users (IntelliJ, Webstorm, PHPStorm, etc.)

All the above commands are available in the **.run directory** at the root of the project.

You can add them as **run configurations** in your IDE.

# <a id="contributors">❤️ Contributors</a>

There is no contributor yet. Want to be the first ?

If you want to contribute to this project, please read the [**contribution guide**](https://github.com/antoinezanardi/werewolves-assistant-api-next/blob/master/CONTRIBUTING.md).
