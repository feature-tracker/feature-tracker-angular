FROM node:24.9.0

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install -g @angular/cli@20

RUN npm install

CMD ["ng", "serve", "--host", "0.0.0.0"]
