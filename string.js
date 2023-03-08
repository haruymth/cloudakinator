function stringToNumber(chars,string) {
    let _string = string.toLowerCase();
    let output = "";
    for (let i = 0; i < _string.length; i++) {
        if(chars.indexOf(_string[i])==-1){
            output += (10066).toString();
        }else{
            output += (chars.indexOf(_string[i]) + 1).toString();
        }
    }
    return output;
}

function numberToString(chars,number) {
    let output = "";
    for (let i = 0; i < number.length; i += 5) {
        output += chars[Number(String(number).slice(i,i+5)) - 1]??" ";
    }
    return output;
}
function hankaku2Zenkaku(str) {
    return str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function(s) {
        return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
    });
}
module.exports={
  "numtostr":numberToString,
  "strtonum":stringToNumber,
  "hz":hankaku2Zenkaku
}
