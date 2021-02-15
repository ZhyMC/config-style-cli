const fs = require("fs");
const path = require("path");

function isArray(obj){
    return Object.prototype.toString.call(obj) == "[object Array]";
}

module.exports = class AppBootHelper{

    config_path;
    apps;

    constructor(target_config_path,apps){
        if(isArray(apps))
            this.apps = { default: apps };
        else
            this.apps = apps;

        this.config_path = target_config_path || "config.json";
    }
    writeAppDefaultConfig(appname){
        const config = this.getApp(appname)[1];
        fs.writeFileSync(this.config_path,JSON.stringify(config,"\t",2));
    }
    getConfig(){
        if(!fs.existsSync(this.config_path))
            throw new Error(`the config file doesn't exist : ${this.config_path}`)

        const config = JSON.parse(fs.readFileSync(this.config_path).toString());
        return config;
    }
    getApp(appname){
        let name = appname || "default";
        if(!this.apps[name])
            throw new Error(`App ${appname} doesn't exist`);
        if(!isArray(this.apps[name]) || this.apps[name].length != 2)
            throw new Error(`App ${appname} format not correct`);
        
        return this.apps[name];
    }
    startApp(appname){
        let App = this.getApp(appname)[0];
        let app = new App(this.getConfig());
        app.start();
    }

}