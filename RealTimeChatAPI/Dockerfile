FROM node
RUN npm install -g nodemon
WORKDIR /RealTimeChatAPI/
COPY . .
RUN npm install
EXPOSE 8000
CMD npm start