const randomInt = (() => {

  function _getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function init() {
    _getRandomInt();
  }

  return {
    init: init
  };

}) ();

export default randomInt;