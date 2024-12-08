# syntax=docker/dockerfile:1
ARG  LOCAL_PYTHON_VERSION=3.13
# NOTE: this could be anything, but I personally am using this as a template for a python/ts project
FROM python:${LOCAL_PYTHON_VERSION}-bookworm AS base

FROM base AS dev

# grab all the executables from node's image. 
# this is faster than downloading and installing everything.
COPY --from=node:23-slim /usr/local/bin /usr/local/bin
COPY --from=node:23-slim /usr/local/lib/node_modules /usr/local/lib/node_modules
COPY --from=node:23-slim /opt /opt

# copy over anything else we might need
# NOTE: this is not needed for this image, but is an example on how to do it
COPY --from=busybox /bin/vi /bin/vi
COPY --from=busybox /bin/tee /bin/tee

# add in any packages we can't just COPY from an image
# NOTE: this is not needed for this image, but is an example on how to do it
RUN --mount=type=cache,target=/var/cache/apt,sharing=locked \
    --mount=type=cache,target=/var/lib/apt,sharing=locked \
    apt-get --no-install-recommends install -y gpg; \
    mkdir -p /etc/apt/keyrings; \
    wget -qO- https://raw.githubusercontent.com/eza-community/eza/main/deb.asc | gpg --dearmor -o /etc/apt/keyrings/gierens.gpg; \
    echo "deb [signed-by=/etc/apt/keyrings/gierens.gpg] http://deb.gierens.de stable main" | tee /etc/apt/sources.list.d/gierens.list; \
    chmod 644 /etc/apt/keyrings/gierens.gpg /etc/apt/sources.list.d/gierens.list; \
    apt-get update && apt-get --no-install-recommends install -y eza

# this makes it so the containers and local machine can all play nice with each other.
# this exists since if you're not running Docker Desktop, certain folders will change to something like 1033:1033 on your local machine,
# rendering them unwritable to the local machine user.
ENV LOCAL_MACHINE_GID=1000
ENV LOCAL_MACHINE_UID=1000
RUN groupadd --gid ${LOCAL_MACHINE_GID} local; \
    useradd --gid ${LOCAL_MACHINE_GID} --uid ${LOCAL_MACHINE_UID} local; \
    mkdir -p /home/local; \
    chown -R local:local /home/local; \
    chown -R local:local /usr/local;

USER ${LOCAL_MACHINE_UID}:${LOCAL_MACHINE_GID}

WORKDIR /workspaces

# install npm packages as fast as possible, with a cache for future rebuilds
ENV NPM_CONFIG_CACHE=/home/local/.npm
COPY --chown=local:local package*.json ./
RUN mkdir -p /home/local/.npm && chown -R local:local /home/local/.npm
RUN --mount=type=cache,target=/home/local/.npm,uid=${LOCAL_MACHINE_UID},gid=${LOCAL_MACHINE_GID} \
    npm i

RUN <<"BASHRC" cat >> /home/local/.bashrc 

export TERM=xterm-color
export GREP_OPTIONS='--color=auto' 
export GREP_COLORS='ms=01;35;48;5;235:mc=01;31:sl=:cx=:fn=35:ln=32:bn=32:se=36'
export CLICOLOR=1

export COLOR_NC='\e[0m' # No Color
export COLOR_BLACK='\e[0;30m'
export COLOR_GRAY='\e[1;30m'
export COLOR_RED='\e[0;31m'
export COLOR_LIGHT_RED='\e[1;31m'
export COLOR_GREEN='\e[0;32m'
export COLOR_LIGHT_GREEN='\e[1;32m'
export COLOR_BROWN='\e[0;33m'
export COLOR_YELLOW='\e[1;33m'
export COLOR_BLUE='\e[0;34m'
export COLOR_LIGHT_BLUE='\e[1;34m'
export COLOR_PURPLE='\e[0;35m'
export COLOR_LIGHT_PURPLE='\e[1;35m'
export COLOR_CYAN='\e[0;36m'
export COLOR_LIGHT_CYAN='\e[1;36m'
export COLOR_LIGHT_GRAY='\e[0;37m'
export COLOR_WHITE='\e[1;37m'

# setup certain colors and symbols in PS1 based off UID
USER_COLOR=$COLOR_CYAN              
USER_SYMBOL="$"
if [ $UID -eq "0" ]; then
    USER_COLOR=$COLOR_RED              
    USER_SYMBOL="#"
fi

parse_git_branch() {
    git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/(\1)/'
}

PS1="\[${USER_COLOR}\]\u\[${COLOR_BLUE}\]@docker:\[${COLOR_LIGHT_PURPLE}\]\w\[${COLOR_YELLOW}\] $(parse_git_branch)\[${COLOR_NC}\] ${USER_SYMBOL} "

alias vim="vi"

export PATH="${PATH}:/workspaces/node_modules/.bin"
BASHRC

RUN <<"BASHRC" cat >> /home/local/.bash_profile 
if [ -f ~/.bashrc ]; then
    . ~/.bashrc
fi
BASHRC

EXPOSE 9229
