function domifyText(text) {
  return text.replace(/(\s[a-zA-Z]+)ez([\s\.,])/g, "$1" + "er" + "$2")
             .replace(/(\s[a-zA-Z]+)é([\s\.,])/g, " $1" + "ez" + "$2")
             .replace(/ genre([\s\.,])/g, " jors" + "$1")
             .replace(/ ait([\s\.,])/g, " est" + "$1")
             .replace(/ ça([\s\.,])/g, " sa" + "$1")
             .replace(/ c'est([\s\.,])/g, " ses" + "$1")
             .replace(/(\s)*C'est([\s\.,])/g, "$1" + "Ses" + "$2")
             .replace(" au bout d'un moment", " ou bout d'un moment")
}

$(document).ready(function() {
  $("p").each(function(){
    $(this).text(domifyText($(this).text()));
  });
});
