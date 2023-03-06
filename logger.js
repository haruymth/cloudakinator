const log = (d)=>{
  fetch("https://Logger.haru-ymth.repl.co",{method:"POST",body:d});
}
module.exports = {
  log:log
}
