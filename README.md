<p align="center">
  <img src="https://github.com/wintercodeNKJJ/RealTimeChat-Project/blob/main/RealTimeChatAPI/public/assets/rtcapi/banner.jpeg?raw=true" width="100%"  alt="logo" style="" />
</p>
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

    <p align="center">
    <img src="https://github.com/wintercodeNKJJ/RealTimeChat-Project/blob/main/RealTimeChatAPI/public/assets/rtcapi/instant%20chat.JPG?raw=true"  alt="logo" style="" />
    </p>

  - ## Authentication

    An authentication system is provide using **jwt** (Jason Web Token) to authenticat users and grant access to the resources. this is done by setting a cookie in the users browser upon registration or login and the token key can also be found in the response to the login or registration. after the registration, the users ar granted a certen level of freedom on the ressources accesed.
    <p align="center">
    <img src="https://github.com/wintercodeNKJJ/RealTimeChat-Project/blob/main/RealTimeChatAPI/public/assets/rtcapi/login%20Screen.JPG?raw=true" width="100%"  alt="logo" style="" />
    </p>

    <p align="center">
    <img src="https://github.com/wintercodeNKJJ/RealTimeChat-Project/blob/main/RealTimeChatAPI/public/assets/rtcapi/register%20screen.JPG?raw=true" width="100%"  alt="logo" style="" />
    </p>

  - ## Intant messaging
    With the use of web sockets the server listens and emits the `newMessage` event alongside the `messageData` concerned always keepinp up to date all users in each **chatroom/chatgroup** respectivly
    <p align="center">
    <img src="https://github.com/wintercodeNKJJ/RealTimeChat-Project/blob/main/RealTimeChatAPI/public/assets/rtcapi/chat%20history.JPG?raw=true"  alt="logo" style="" />
    </p>
  - ## Chat rooms
    Here, the combination of `http endpoins` and `sockets` allows us to create chat rooms which are stored and can always be retrived even ofter logingout. which sends us to the next feature
    <p align="center">
    <img src="https://github.com/wintercodeNKJJ/RealTimeChat-Project/blob/main/RealTimeChatAPI/public/assets/rtcapi/chatrooms.JPG?raw=true" width="100%"  alt="logo" style="" />
    </p>
  - ## chat history
    The chat history of every chatgroup can always be fetched as it is aveilable for you to use. with the possibelity of viewing them on the nice admin pannel provided by directus. `USERNAME` and `PASSWORD REQUIRED`
    <p align="center">
    <img src="https://github.com/wintercodeNKJJ/RealTimeChat-Project/blob/main/RealTimeChatAPI/public/assets/rtcapi/chat%20history.JPG?raw=true" width="100%"  alt="logo" style="" />
    </p>
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
cd ./RealTimeChat Project
```

- Create the docker image of the project

```bash
# create docker image
docker compose up -d --build
```

- Run the project with following command

```bash
# Run docker container
docker compose up --attache chatapi
```

if you want to run the react project in the chat-app-demo run the following commands

- install the required packages locally

```bash
# Run docker container
npm run build
```

- move to the chat-app-demo file

```bash
# move to the chat-app-demo ditectory
cd ./chat-app-demo file
```

- run the react.js app

```bash
# Run the react app
npm run start
```

you should now bw able to see the chat app server starting on your docker virtual mechine and on your terminal. follow the various links to get to know more about the api.

- ## <a id="global-setup"> ⚙ Global setup</a>

  This api is bundeled witha a set of default values for its environment an you need to make sure these variables are well set if you need to deploy this app on a live server. but befor that take a look at the demo by following the link provided by your running server

  ### Development mode

  |           Name            |               Description               | Required |    Default value    |                                   Limitations                                   |
  | :-----------------------: | :-------------------------------------: | :------: | :-----------------: | :-----------------------------------------------------------------------------: |
  |       `SERVER_HOST`       | Host on which the API will be available |    ❌    |     `127.0.0.1`     |                          If set, can't be empty string                          |
  |       `SERVER_PORT`       | Port on which the API will be available |    ❌    |       `4000`        |                If set, must be a number between `0` and `65535`                 |
  |      `DIRECTUS_HOST`      |            Directus host URL            |    ❌    |     `directus`      |                 If set, must match the directus container name                  |
  |      `DIRECTUS_PORT`      |           Directus host PORT            |    ❌    |       `8055`        |                 If set, must match the directus container port                  |
  |  `DIRECTUS_ADMIN_EMAIL`   |           CORS allowed origin           |    ❌    | `admin@example.com` | If set, can't be empty string and must match the directus container admin email |
  | `DIRECTUS_ADMIN_PASWWORD` |           CORS allowed origin           |    ❌    |     `d1r3ctu5`      | If set, can't be empty string and must match the directus container admin email |

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

Be ware that befor any action you should signup and login. most of the routes are protected from on authenticated users.
visite the api endpoinds documentation.

# <a id="tests"> 💯 Tests </a>

All aveilables test are passing and my be add subsequently

- ## <a id="e2e-test"> 🧪 Unit and E2E tests </a>

# <a id="code-analysis-and-consistency">☑️ Code analysis and consistency</a>

- ## 🔍 Code linting & formatting

  ![ESLint](https://img.shields.io/badge/-ESLint-black?style=for-the-badge&logoColor=white&logo=eslint&color=341BAB)

  In order to keep the code clean, consistent and free of bad TS practices, more than **300 ESLint rules are activated**!

  Complete list of all enabled rules is available in the **[.eslintrc.json file](http://localhost:8000/.eslintrc.js)**.

- ## ▶️ Commands

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

# <a id="misc-commands">✨ Misc command</a>

🖼 Create docker image with docker compose

```shell
docker compose up -d --build
```

# <a id="contributors">❤️ Contributors</a>

There is no contributor yet. This is a technical interview project

# <a id="license"> ©️ License </a>

This is the **first** version of the API **[Event Planning API](http://localhost:8000/docs)**. It is still under development.
