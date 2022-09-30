FROM node
LABEL author="Magatsu"

RUN mkdir /app

WORKDIR /app

COPY package-lock.json /app/package-lock.json
COPY package.json /app/package.json
COPY index.html /app/index.html
COPY index.js /app/index.js

RUN cd /app && npm install

EXPOSE 443

CMD npm start