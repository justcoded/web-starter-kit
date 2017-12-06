// This is an examples of simple export.
//
// You can remove or add your own function in this file.

var Notify = {
  notify: function($) {
    $.notify(`Hello from jQuery version ${$.fn.jquery}`);
  }
};

export default Notify;