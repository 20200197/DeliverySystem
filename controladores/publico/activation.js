document.addEventListener('DOMContentLoaded', function() {
     M.Sidenav.init(document.querySelectorAll('.sidenav'));
     M.Tooltip.init(document.querySelectorAll('.tooltipped'));
     M.Materialbox.init(document.querySelectorAll('.materialboxed'));
     M.FormSelect.init(document.querySelectorAll('select'));
   });

   document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
});