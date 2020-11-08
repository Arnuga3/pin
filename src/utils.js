export function copyToClipboard(pin){
    var input = document.createElement('textarea')
    input.innerText = pin;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy')
    input.remove();
}

export function validatePin(pin, config) {
  let incremental = true;
  if (config.excludeIncremental) {
    for (let i=0; i<pin.length-1; i++) {
      if (+pin[i] !== (+pin[i+1] + 1)) {
        incremental = false;
        break;
      }
    }
  }
  const validIncremental = !config.excludeIncremental || (config.excludeIncremental && !incremental);
  return validIncremental && new Set(pin).size >= +config.uniqueDigitsNum;
}
