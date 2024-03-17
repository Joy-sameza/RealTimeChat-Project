import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Realtime Chat API Documentation 🚀",
      description: `
## Introduction 📚

Welcome to the documentation for our Realtime Chat API. This cutting-edge solution is designed to bring real-time communication capabilities to your applications. Whether you're developing a social media platform, a collaborative tool, or any application that requires live chat functionality, our API is the perfect fit. It facilitates instant, seamless interactions, making it an ideal choice for applications that require live chat functionality. 🗨️💬

## Key Features 🌟

Our API provides a comprehensive set of features that cater to various real-time communication needs:
      
1. **Instant Messaging 💬**: Enable one-on-one conversations between your users in real-time.
2. **Group Chats 👥**: Create chat rooms where multiple users can communicate with each other simultaneously.
3. **Message History 📜**: Retrieve past conversations to keep track of your communication.
4. **Read Receipts ✅**: Know when messages have been delivered and read by the recipient.      
5. **Typing Indicators 📝**: Show when a user is typing a message to enhance the real-time communication experience.
      
## Scalability and Performance 📈
      
Our API is designed with scalability in mind. It is capable of handling a high volume of concurrent connections, making it suitable for both small and large-scale applications. Whether you're just starting out or scaling up, our API grows with you.
      
## Security 🔒
      
Security is a top priority for us. Our API implements end-to-end encryption, ensuring that all messages exchanged between users remain private and secure. We are committed to protecting your data and providing a safe environment for your users.
      
## Getting Started 🛠️

We provide detailed documentation to guide you through the integration process. Whether you’re a seasoned developer or just getting started, our documentation is designed to provide you with the information you need to successfully integrate our API into your application. We cover everything from setting up your development environment to making your first API call.

## Conclusion 🎉

We’re excited for you to start using the Realtime Chat API and look forward to seeing the incredible applications you will build with it. If you have any questions or need further assistance, feel free to reach out to our support team. Happy coding! 🚀
      `,
      contact: {
        name: "Nguezet Kenfack Jordan Junior",
        email: "kenfackjordanjunior@gmail.com",
        url: "https://github.com/wintercodenkjj/RealTimeChat-Project",
      },
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:4000/",
        description: "Local Server",
      },
      {
        url: "http://localhost:4000/",
        description: "Live Server",
      },
    ],
  },
  apis: ["./src/routes/*ts"],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(server: Express) {
  server.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      customCss: `.swagger-ui * { font-family: 'Inter' !important; font-weight: 500}`,
    }),
  );
  server.get("/docs.json", (_, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
}

export default swaggerDocs;
