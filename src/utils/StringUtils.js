// stringUtils.js

function capitalizeFirstLetter(inputString) {
    if (typeof inputString !== 'string') {
      return inputString;
    }
  
    if (inputString.length === 0) {
      return inputString;
    }
  
    return inputString.charAt(0).toUpperCase() + inputString.slice(1);
  }
  
  export { capitalizeFirstLetter };
  