const log = (d)=>{
  try{
    fetch("https://Logger.haru-ymth.repl.co",{method:"POST",body:d});
  }catch(error){
    return;
  }
}
module.exports = {
  log:log
}
