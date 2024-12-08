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