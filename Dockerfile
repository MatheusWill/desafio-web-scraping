# BUILD STAGE
FROM node:16.14.2-slim as builder

WORKDIR /home/node/app

COPY package.json .
RUN npx handpick@3.2.1 --target=buildDependencies --manager=yarn

COPY --chown=node:node . .
RUN yarn build

# RUN STAGE
FROM node:16.14.2-slim
LABEL maintainer="Matheus <matheuswill6663@gmail.com>"

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

WORKDIR /home/node/app

RUN apt update && apt install curl gnupg -y
RUN curl --location --silent https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
RUN apt update 
RUN apt install google-chrome-stable -y --no-install-recommends 
RUN rm -rf /var/lib/apt/lists/*

RUN chown $user:$user /home/node/app

COPY package.json .
RUN yarn install --production=true

USER $user

COPY --from=builder /home/node/app/dist ./dist
RUN mkdir -p ./log/error

EXPOSE ${PORT}

CMD ["yarn", "server:start"] 
