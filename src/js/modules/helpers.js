// This is an examples of simple export.
//
// You can remove or add your own function in this file.

var HP = {
  random: function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
};

export default HP;