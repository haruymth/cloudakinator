const scloudjs = require("scloudjs");
const { Aki,regions } = require("aki-api");
const fs = require("fs");
const gs = require("./string.js");
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
    if(gs.numtostr(chars,clouddatas["from_client"].value)=="200"){
      const id = short.generate().toLowerCase();
      const region = "jp"
      instances[id] = new Aki({region});
      await instances[id].start();
      console.log(id+","+instances[id].question+","+instances[id].answers.join("|"))
      console.log(gs.strtonum(chars,id+","+instances[id].question+","+instances[id].answers.join("|")))
      sends(gs.strtonum(chars,id+","+instances[id].question+","+instances[id].answers.join("|")));
    }else{
      const input = gs.numtostr(chars,String(clouddatas["from_client"].value));
      const id = input.split(",")[0];
      await instances[id].step(Number(input.split(",")[1]));
      sends(gs.strtonum(chars,id+","+instances[id].question+","+instances[id].answers.join("|")));
      if(instances[id].progress >= 70 || instances[id].currentStep >= 78){
        await instances[id].win();
        sends(gs.strtonum(chars,id+`,あなたが思い浮かべたのは...「${instances[id].answers[0].name}(${instances[id].answers[0].description})」,あっていたらコメントしてね！`));
      }
    }
    }catch(e){
      gs.strtonum(chars,"500");
      console.warn(e);
    }
  }
}
scloudjs.setdatas(process.env.username,process.env.password,"813786333",messages);
(async()=>{
  await scloudjs.login();
  await scloudjs.connect();
  await scloudjs.handshake();
  console.log("Lanched");
})();

