FROM selenium/standalone-chrome
USER root
# Install node
RUN apt-get update && apt-get install -y gnupg2 &&\
    curl -sL https://deb.nodesource.com/setup_17.x | bash - &&\
    apt-get install -y nodejs build-essential &&\
    npm install -g npm@latest &&\
    npm install -g n  &&\
    n stable
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . /app
EXPOSE 8080
CMD ["npm", "start"]