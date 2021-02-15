const AppBootHelper = require("./helper");
const meow = require("meow");

const cli = meow(`

    Options:
        --init : initialize a default json config file
        --config, -c : specify a config path
        --appname : specify app name you want to start
        --start : start the app

`,{
    flags:{
        init:{
            type:"boolean"
        },
        appname:{
            type:"string"
        },
        config:{
            type:"string",
            alias:"c"
        },
        start:{
            type:"boolean"
        }
    }
});

let helper;

function runCommand(){
    if(cli.flags.init){
        helper.writeAppDefaultConfig();
    }else if(cli.flags.start){
        helper.startApp(cli.flags.appname);
    }else{
        cli.showHelp();
    }
}

module.exports = function ImportAppImpls(impls){
    helper = new AppBootHelper(cli.flags.config,impls);
    runCommand();
}

module.exports(
[class {
    constructor(config){
        console.log(config)
    }
    start(){
        console.log("yes");
    }
},{
    abc:123
}])