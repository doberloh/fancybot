FROM ubuntu:16.04

RUN apt-get update && apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt-get update && apt-get install -y nodejs

RUN mkdir \
    /opt/fancybot \
    /opt/fancybot/scripts
ADD fancybot.js /opt/fancybot/
ADD package.json /opt/fancybot/
ADD entrypoint.sh /opt/fancybot/scripts/
ADD auth.json /opt/fancybot/
RUN chmod -R 755 /opt/fancybot/
WORKDIR /opt/fancybot
RUN npm install --save ./

ENTRYPOINT /opt/fancybot/scripts/entrypoint.sh
