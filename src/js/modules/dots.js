// This is an examples of simple export.
//
// You can remove or add your own function in this file.

const dotsEffect = (() => {
  const createCells = () => {
    const width = 10;
    const height = 10;
    const size = width * height;
    let html = '<div class="entry-cells">';

    for (let i = 0; i < size; i += 1) {
      html += `<div class="cell cell-${i}"></div>`;
    }

    html += '</div>';

    return html;
  };

  const init = () => {
    const $cnt = $('#home-canvas');
    const cells = createCells();
    $cnt.html(cells);
  };

  return {
    init,
  };
})();

export default dotsEffect;
