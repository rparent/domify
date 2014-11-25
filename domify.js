var DOM_MISTAKE_LIKELIHOOD_PERCENTAGE = 80;
var erSuffixes = ["er", "ez", "é", "ée", "és", "ées"]
var switchWords = {
  "ça": "sa",
  "sa": "ça",
  "se": "ce",
  "ce": "se",
  "c'est": "ses",
  "C'est": "Ses",
  "ses": "c'est",
  "Ses": "C'est",
  "ait": "est",
  "est": "ait"
}
var switchExpressions = {
  "genre": "jors",
  "au bout d'un moment": "ou bout d'un moment",
  "Kuala Lumpur": "Guadaloumpur",
  "il semblerait que": "il paraitrait comme quoi",
  "il apparait que": "il paraitrait comme quoi",
  "dans les écoles": "aux écoles",
  "it's his fault": "his his faute"
}

function domifyText(text) {
  var tokens = text.split(/\s+/);
  var domifiedTokens = [];
  for (t=0; t<tokens.length; t++) {
    token = tokens[t];
    newToken = token;
    if (Math.floor(Math.random()*100) < DOM_MISTAKE_LIKELIHOOD_PERCENTAGE) {
      for (j=0;j<erSuffixes.length; j++) {
        regex = new RegExp("([a-zA-Z]+)" + erSuffixes[j] + "([\.,]?)$", "g");
        if (regex.test(token)) {
          newToken = token.replace(regex, "$1" + erSuffixes[Math.floor(Math.random()*erSuffixes.length)] + "$2");
        }
      }
      for (sword in switchWords) {
        regex = new RegExp("^" + sword + "([\.,]?)$", "g");
        if (regex.test(token)) {
          newToken = token.replace(regex, switchWords[sword] + "$1");
        }
      }
    }
    domifiedTokens.push(newToken);
  }
  output = domifiedTokens.join(" ");
  for (expression in switchExpressions) {
    output.replace(expression, switchExpressions[expression]);
  }
  return output
}

function getTextNodesIn(node, includeWhitespaceNodes) {
  var textNodes = [], nonWhitespaceMatcher = /\S/;
  function getTextNodes(node) {
    if (node.nodeType == 3) {
      if (includeWhitespaceNodes || nonWhitespaceMatcher.test(node.nodeValue)) {
        textNodes.push(node);
      }
    } else {
      for (var i = 0, len = node.childNodes.length; i < len; ++i) {
        getTextNodes(node.childNodes[i]);
      }
    }
  }
  getTextNodes(node);
  return textNodes;
}

(function() {
  var textElements = getTextNodesIn(document.getElementsByTagName("body")[0], false);
  for (var te = 0; te < textElements.length; te++) {
    textElements[te].textContent = domifyText(textElements[te].textContent);
  }
})();
