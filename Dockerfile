FROM node:12-alpine
# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
# Copy app
COPY . .

# Permite ao container ficar escutando apenas a porta 3333
EXPOSE 3333

# start it
CMD [ "npm", "start" ]
