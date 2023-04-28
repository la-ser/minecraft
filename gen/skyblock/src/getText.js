function readTextFile(file) {
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", file, false);
  xhttp.send();
  return xhttp.responseText;
}

function convertString(inputString, before, middle, after, end) {
  const words = inputString.split("\n");

  const outputArray = words.map((word) => `${before}${word}${middle}${word}${after}${word}${end}\n`);

  const outputString = outputArray.join("");

  return outputString;
}

export function genCodeFor(type, url) {
  const inputString = readTextFile(url);
  const before = '<a data-name="';
  const middle = `" class="mc-list mc-${type}" onclick="item_select('`;
  const after = "', 'block')\">";
  const end = "</a>";
  const outputString = convertString(inputString, before, middle, after, end);

  console.log(outputString);
  return outputString;
}
