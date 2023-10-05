# Base Node image
FROM node:16
WORKDIR /usr/src/app
# Copy package.json and yarn.lock
COPY package.json yarn.lock ./
# Change ownership of the WORKDIR to node user
RUN chown -R node:node /usr/src/app

USER node
RUN yarn install
COPY --chown=node:node . .
CMD ["yarn", "run", "dev"]