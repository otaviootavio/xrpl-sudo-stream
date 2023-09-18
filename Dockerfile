# Base Node image
FROM node:16 as base
WORKDIR /usr/src/app
# Copy package.json and yarn.lock
COPY package.json yarn.lock ./
# Change ownership of the WORKDIR to node user
RUN chown -R node:node /usr/src/app

# Development Image
FROM base as development
USER node
RUN yarn install
COPY --chown=node:node . .
CMD ["yarn", "run", "dev"]

# Production Image
FROM base as production
USER node
# Use yarn with --frozen-lockfile for consistent installs
RUN yarn install --frozen-lockfile --production
COPY --chown=node:node . .
RUN yarn run build
CMD ["yarn", "start"]