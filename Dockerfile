FROM node:12.18.3

# INSTALL ALL DEPENDENCIES
WORKDIR /usr/local/lib

RUN mv ./node_modules ./node_modules.tmp \
    && mv ./node_modules.tmp ./node_modules \
    && npm install mobx@^5.15.4 \
    && npm install -g redoc-cli@0.10.0

RUN mv ./node_modules ./node_modules.tmp \
    && mv ./node_modules.tmp ./node_modules \
    && npm install -g @redocly/openapi-cli@1.0.0-beta.18

# COPY EXECUTABLE
WORKDIR /usr/src
COPY dist dist
RUN chmod 755 dist/bundle.js

# SET WORKING DIRECTORY
WORKDIR /usr/src/repo

CMD ["/usr/src/dist/bundle.js"]