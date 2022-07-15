document.addEventListener('DOMContentLoaded', function () {
  M.Sidenav.init(document.querySelectorAll('.sidenav'));
  M.Tooltip.init(document.querySelectorAll('.tooltipped'));
  M.Modal.init(document.querySelectorAll(".modal"), { dismissible: false });
  M.Materialbox.init(document.querySelectorAll(".materialboxed"));
});