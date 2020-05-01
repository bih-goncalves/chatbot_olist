FROM node:12-alpine
# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
# Copy app
COPY . .

# start it
CMD [ "npm", "start" ]
