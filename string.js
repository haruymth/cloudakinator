function stringToNumber(chars,string) {
    let _string = string.toLowerCase();
    let output = "";
    for (let i = 0; i < _string.length; i++) {
        output += ((chars.indexOf(_string[i])??10066) + 1).toString();
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
module.exports={
  "numtostr":numberToString,
  "strtonum":stringToNumber
}