FROM node:latest

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
ADD ./ /usr/src/app/
RUN npm install --production

EXPOSE 3000
CMD [ "npm", "start" ]