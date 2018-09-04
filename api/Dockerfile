FROM node:7-alpine

ENV NODE_ENV=production

WORKDIR /opt/app

COPY package.json .
COPY yarn.lock .

RUN NODE_ENV=development yarn

COPY . .

RUN NODE_ENV=development yarn build && yarn --production

EXPOSE 3017

ENTRYPOINT ["yarn"]

CMD ["start"]
