FROM node:24.22.0-alpine3.23@sha256:e44c87c7dd212720eb00469aeac89504ca2be77b8f0d6dbffb30665d5fcc59e1
WORKDIR /app
COPY --chown=node:node package.json server.mjs ./
COPY --chown=node:node static ./static
RUN mkdir /data && chown node:node /data
ENV DATA_DIRECTORY=/data HOST=0.0.0.0 PORT=3000
USER node
EXPOSE 3000
CMD ["node", "server.mjs"]
