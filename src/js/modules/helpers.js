var HP = {
  random: function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

export default HP;