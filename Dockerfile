FROM node:8

COPY package.json package.json

RUN npm --loglevel warn install --production --no-optional

COPY . .

USER node

CMD [ "npm", "start" ]

EXPOSE 3001

