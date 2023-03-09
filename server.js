const scloudjs = require("scloudjs");
const { Aki,regions } = require("aki-api");
const fs = require("fs");
const gs = require("./string.js");
const console = require("./logger.js");
const short = require("shortid");

const sends = (data)=>{
  const str = String(data).match(/.{1,256}/g);
  for(let i =1; i<str.length+1;i++){
    scloudjs.sendtocloud("from_host"+String(i),str[i-1]);
  }
}
const chars = fs.readFileSync("chars.txt","utf8").split("\n").map(n=>n.toLowerCase());
let clouddatas = new Object();

const instances = {};
const messages = async(data)=>{
  const temp = scloudjs.parsedata(data,clouddatas);
  clouddatas = temp.clouddatas;
  const changedlists = temp.changedlists;
  if(changedlists.includes("from_client")){
    try{
    if(gs.numtostr(chars,clouddatas["from_client"].value).slice(0,3)=="200"){
      const id = short.generate().toLowerCase();
      const region = gs.numtostr(chars,clouddatas["from_client"].value).slice(3,6);
      instances[id] = new Aki({region});
      await instances[id].start();
      console.log(id+instances[id].question);
      sends(gs.strtonum(chars,id+","+gs.hz(instances[id].currentStep+"."+instances[id].question)+","+instances[id].answers.join("|")));
    }else{
      if(instances[id].progress >= 70 || instances[id].currentStep >= 78){
        await instances[id].win();
        sends(gs.strtonum(chars,id+`,「${gs.hz(instances[id].answers[0].name)}」_(${gs.hz(instances[id].answers[0].description.replace(/,/g,"/"))})__あっていたらコメントしてね!_Comment if you agree!`));
      }else{
        const input = gs.numtostr(chars,String(clouddatas["from_client"].value));
        const id = input.split(",")[0];
        await instances[id].step(Number(input.split(",")[1]));
        console.log(instances[id].answers[Number(input.split(",")[1])]);
        sends(gs.strtonum(chars,id+","+gs.hz(instances[id].currentStep+"."+instances[id].question)+","+instances[id].answers.join("|")));
      }
    }
    }catch(e){
      gs.strtonum(chars,"500");
      console.log(e);
    }
  }
}
scloudjs.setdatas(process.env.username,process.env.password,process.env.projectid,messages);


(async()=>{
  await scloudjs.login();
  await scloudjs.connect();
  await scloudjs.handshake();
  console.log("Lanched");
})();

