var censorWord = function (str: string) {
  return str[0] + "*".repeat(str.length - 2) + str.slice(-1);
}

export var hideEmail = function (email?: string) {
  if (!email) {
    return undefined
  }
  var arr = email.split("@");
  return censorWord(arr[0]) + "@" + censorWord(arr[1]);
}