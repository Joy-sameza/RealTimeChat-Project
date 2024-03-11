import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Real-Time Chat API",
      description:
        "🎉 Welcome to the Realtime Chat API! 🎉 This is a cutting-edge solution designed to bring real-time communication capabilities to your applications. Built with the aim of facilitating instant, seamless interactions, it’s an ideal choice for applications that require live chat functionality. 🗨️💬 \
    Our API provides a comprehensive set of features including instant messaging 💬, group chats 👥, message history 📜, read receipts ✅, and typing indicators 📝. It’s designed with scalability in mind, capable of handling a high volume of concurrent connections, making it suitable for both small and large-scale applications. \
    Security is a top priority for us 🔒. Our API implements end-to-end encryption, ensuring that all messages exchanged between users remain private and secure. \
    We provide detailed documentation 📚 to guide you through the integration process. Whether you’re a seasoned developer or just getting started, our documentation is designed to provide you with the information you need to successfully integrate our API into your application. \
    We’re excited for you to start using the Realtime Chat API and look forward to seeing the incredible applications you will build with it. 🚀",
      contact: {
        name: "Nguezet Kenfack Jordan Junior",
        email: "kenfackjordanjunior@gmail.com",
        url: "https://github.com/wintercodenkjj/",
      },
    },
    version: "1.0.0",
  },
};
