From touchvie/tomcat8-jdk8:latest

ENV DEBIAN_FRONTEND noninteractive
RUN apt-get update && apt-get install -y --no-install-recommends apt-utils

# install maven

# preserve Java 8  from the maven install.
RUN mv /etc/alternatives/java /etc/alternatives/java8
RUN apt-get update -y && apt-get install maven -y

# Restore Java 8
RUN mv -f /etc/alternatives/java8 /etc/alternatives/java
RUN ls -l /usr/bin/java && java -version

# Install Node.js
RUN apt-get install --yes curl
RUN curl --silent --location https://deb.nodesource.com/setup_9.x | bash -
RUN apt-get install --yes nodejs
RUN apt-get install --yes build-essential

RUN npm -v

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app/

RUN cd /usr/src/app/src/main/webapp/fe && npm install
RUN cd /usr/src/app/src/main/webapp/fe && ./node_modules/.bin/webpack

RUN cd /usr/src/app && mvn clean install
RUN mv /usr/src/app/target/Recept-1.0-SNAPSHOT /usr/local/tomcat/webapps/ROOT

ENV DEBIAN_FRONTEND teletype