# Typescript debugger in VSCode attached to existing Docker Compose session

This repo details how to configure a localdev for learning typescript. 

It details how to do things like configure a typescript debugger in vscode, how to add in tooling to your containerized localdev, and how to reduce bloat in your Docker image. 

## How to use

```
# in a terminal window, build and start your docker compose session as a background process
docker compose up --build -d
```

node node_modules/eslint/bin/eslint --fix --parser typescript-eslint --rule 'indent: [1,4,{SwitchCase: 1}]' src/

Now start vscode.

The required extensions should auto-install. 

To debug:

- open `src/greeters.ts` file (or any file in `src/`) and be on that tab in your editor
- add breakpoints by clicking on the left side of the line number in the script
- from the left side menu, hit `Run and Debug (Ctrl+Shift+D)` 
- in the top menu in the newly presented sidebar, run `tsx debug`. 

The debugger will run on the file you have open (see `.vscode/launch.json` and [here](https://tsx.is/vscode#setup) for more info). 

## Requirements

**For most people, you just need `vscode` and `docker desktop`.**

But if you're on **linux** and stubbornly not using `docker desktop`:

1. You'll need the [Proprietary Microsoft-branded release of Visual Studio Code](https://wiki.archlinux.org/title/Visual_Studio_Code)

2. You'll need these packages at minimum:
- docker 
- docker-compose 
- docker-buildx

## Linting, Formatting, and VSCode Integration

Linting and formatting are two different things in [javascript](https://prettier.io/docs/en/comparison). Linting serves to bug catch bugs by insisting on certain things about codde quality. Formatting is your syntax enforcement, e.g. tabs vs spaces for indentation.

This codebase assumes:

- [typescript-eslint](https://typescript-eslint.io/) for linting your typescript-only files
- [prettier](https://prettier.io) for formatting
- [.editorconfig](https://editorconfig.org/) to actually hold all of the formatting checks for all files in this codebase
- `prettier` [falls back](https://prettier.io/docs/en/configuration#editorconfig) to `.editorconfig` with overrides available in `.prettierrc`

This setup, along with the following vscode settings, allows all the plugin configurations to work together inside vscode:

```
{
    "customizations": {
        "vscode": {
            "extensions": [
                "dbaeumer.vscode-eslint",
                "EditorConfig.EditorConfig"
            ],
            "settings": {
                "typescript.format.enable": true,
                "editor.formatOnSave": true,
                "editor.codeActionsOnSave": {
                "source.fixAll.eslint": "explicit"
                },
            }
        }
    }
}
```

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
