// This is an examples of simple export.
//
// You can remove or add your own function in this file.

var DE = {
  dotsEffect: function() {
    var $cnt  = $('#home-canvas'),
        cells = createCells();

    $cnt.html(cells);

    function createCells() {
      var width  = 10,
          height = 10,
          size   = width * height,
          html   = '<div class="entry-cells">';

      for (var i = 0; i < size; i++) {
        html += '<div class="cell cell-' + i + '"></div>';
      }

      html += '</div>';

      return html;
    }
  }
};

export default DE;