document.addEventListener('DOMContentLoaded', function() {
     M.Sidenav.init(document.querySelectorAll('.sidenav'));
     M.Tooltip.init(document.querySelectorAll('.tooltipped'));
   
   });

   document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
  });

  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);
  });

  $(document).ready(function() {
    $('input#input_text, textarea#textarea2').characterCounter();
  });

  $('#textarea1').val('New Text');
  M.textareaAutoResize($('#textarea1'));