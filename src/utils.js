export function copyToClipboard(pin){
    var input = document.createElement('textarea')
    input.innerText = pin;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy')
    input.remove();
}

export function validPins(combination) {
  const uniqueNumbers = new Set(combination);
  return uniqueNumbers.size > 2;
}
