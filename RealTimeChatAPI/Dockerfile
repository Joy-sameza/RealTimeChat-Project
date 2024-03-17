FROM node:18.15
RUN npm install -g nodemon
WORKDIR /RealTimeChatAPI/
COPY . .
RUN npm install
EXPOSE 4000
CMD npm start