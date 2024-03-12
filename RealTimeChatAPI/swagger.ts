import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Real-Time Chat API",
      description: `#### **Description** \n\nThis is a cutting-edge solution designed to bring real-time communication capabilities to your applications. Built with the aim of facilitating instant, seamless interactions, it’s an ideal choice for applications that require live chat functionality. 🗨️💬
      \n\n#### **Functionalities**
      \n\nOur API provides a comprehensive set of features including \n - **Instant messaging** 💬, 
      \n - **Group chats** 👥, 
      \n - **message history** 📜, 
      \n - **read receipts** ✅, 
      \n - **and typing indicators** 📝.
      \n It’s designed with scalability in mind, capable of handling a high volume of concurrent connections, making it suitable for both small and large-scale applications.
      \n\nSecurity is a top priority for us 🔒. Our API implements end-to-end encryption, ensuring that all messages exchanged between users remain private and secure.
      \n\n#### [**Documentation**](http://localhost:4000/maintainance)
      \n\nWe provide detailed documentation 📚 to guide you through the integration process. Whether you’re a seasoned developer or just getting started, our [documentation](http://localhost:4000/maintainance) is designed to provide you with the information you need to successfully integrate our API into your application.
      \n\nWe’re excited for you to start using the Realtime Chat API and look forward to seeing the incredible applications you will build with it. 🚀`,
      contact: {
        name: "Nguezet Kenfack Jordan Junior",
        email: "kenfackjordanjunior@gmail.com",
        url: "https://github.com/wintercodenkjj/RealTimeChat-Project",
      },
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:8000/",
        description: "Local Server",
      },
      {
        url: "http://localhost:8000/",
        description: "Live Server",
      },
    ],
  },
  apis: ["./src/routes/*ts"],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(server: Express) {
  server.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  server.get("/docs.json", (_, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
}

export default swaggerDocs;
