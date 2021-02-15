# config-style-cli

## Introduction

This is a config-style CLI Builder.

Usually, this library is used to build a CLI Tool to start the service app with config.

## Install

```
npm i config-style-cli
```

## Usage

```
const { App, AppDefaultConfig } =  require("./app");

const CLI = require("config-style-cli");

CLI([
    App,
    AppDefaultConfig    
]);

```
Then use the CLI Tool to start your service app:
```
  Options:
      --init : initialize a default json config file
      --config, -c : specify a config path
      --appname : specify app name you want to start
      --start : start the app

```
