# Typescript debugger in VSCode attached to existing Docker Compose session

This repo details how to configure a localdev for learning typescript. 

It details how to do things like configure a typescript debugger in vscode, how to add in tooling to your containerized localdev, and how to reduce bloat in your Docker image. 

## How to use

```
# in a terminal window, build and start your docker compose session as a background process
docker compose up --build -d
```

Now start vscode.

The required extensions should auto-install. 

To debug, from the left side menu, hit `Run and Debug (Ctrl+Shift+D)` and in the top menu in the newly presented sidebar, run `Run npm debug`. 

There's a sample script you can add breakpoints to in `src/`. 

## Requirements

**For most people, you just need `vscode` and `docker desktop`.**

But if you're on **linux** and stubbornly not using `docker desktop`:

1. You'll need the [Proprietary Microsoft-branded release of Visual Studio Code](https://wiki.archlinux.org/title/Visual_Studio_Code)

2. You'll need these packages at minimum:
- docker 
- docker-compose 
- docker-buildx

## Last Tested Versions

```
# docker --version
Docker version 27.3.1, build ce1223035a

# docker compose version
Docker Compose version 2.31.0

# docker buildx version
github.com/docker/buildx 0.19.2 1fc5647dc281ca3c2ad5b451aeff2dce84f1dc49

# code --version (as https://aur.archlinux.org/packages/visual-studio-code-bin)
1.95.3
f1a4fb101478ce6ec82fe9627c43efbf9e98c813
x64
