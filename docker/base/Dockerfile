FROM nginx:1.15.2

LABEL author="Erick <linfan0558@gmail.com>"

USER root

ENV HOME=/usr/src/
ENV ANGULAR=${HOME}/prof-rating/
ENV DEPLOY=/usr/share/nginx/html/

ENV BUILD_PACKAGES="curl python build-essential git ca-certificates"

ENV PATH $PATH:/nodejs/bin

WORKDIR ${HOME}

# Set proxy server
# ENV http_proxy http://156.132.20.149:80
# ENV https_proxy http://156.132.20.149:80

RUN apt-get update -y \
    && apt-get install --no-install-recommends -y -q ${BUILD_PACKAGES} \
    && apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* \
    # Install nodejs
    && mkdir /nodejs \
    # && curl http://nodejs.org/dist/v8.11.1/node-v8.11.1-linux-x64.tar.gz | tar xvzf - -C /nodejs --strip-components=1 \
    && curl https://nodejs.org/dist/v8.11.1/node-v8.11.1-linux-x64.tar.gz | tar xvzf - -C /nodejs --strip-components=1 \
    # Proxy setting
    # && npm config set strict-ssl false \
    # && npm config set registry "http://registry.npmjs.org/" \
    # && npm config set registry "http://registry.npmjs.org/" \
    # && npm config set proxy http://156.132.20.149:80 \
    # && npm config set https-proxy http://156.132.20.149:80 \
    # && export HTTP_PROXY=http://156.132.20.149:80 \
    # GIT pull
    # && git config --global http.sslVerify false \
    &&git clone https://github.com/fanlin8/prof-rating.git \
    # Cleaning
    && apt-get remove --purge -y ${BUILD_PACKAGES} && apt-get autoremove -y

# RUN git -C nextgen/ checkout feature/ATeam

WORKDIR ${ANGULAR}

# Build & Deploy
RUN rm -rf node_modules dist && npm install -g @angular/cli@6.0.3 --unsafe \
    && npm install && npm cache clean --force && rm -rf ~/.npm \
    && ng build --prod && cp -R dist/HU-PROF-RATING-APP/* ${DEPLOY} && rm -rf ${ANGULAR}

CMD ["nginx", "-g", "daemon off;"]