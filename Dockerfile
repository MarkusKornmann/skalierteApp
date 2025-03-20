FROM node:alpine

WORKDIR /app
COPY App.js .
CMD ["node", "App.js"]
