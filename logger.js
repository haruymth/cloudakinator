const fetch = require("@replit/node-fetch");
const log = (d)=>{
  console.log(d);
  try{
    fetch("https://Logger.haru-ymth.repl.co",{method:"POST",body:d});
  }catch(error){
    console.log(error);
    return;
  }
}
module.exports = {
  log:log
}
