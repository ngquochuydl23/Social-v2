export var hidePhone = function (email?: any) {
  if (!email) 
    return undefined;

  var hiddenPhone = "";
  for (let i = 0; i < email.length; i++) {
    if (i >= 2 && i < email.length - 3) {
      hiddenPhone += '*';
    }
    else hiddenPhone += email[i];
  }
  return hiddenPhone
}