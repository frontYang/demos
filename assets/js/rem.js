!function (max, t) {
  function globalMouseMoveHandler() {    
    var d = r.getBoundingClientRect().width;
    if (!t) {
      t = 540;
    }
    if (d > t) {
      d = t;
    }
    var p = 100 * d / max + "px";
    r.style.fontSize = p;
    s.innerHTML = "html{font-size:" + p + "!important}";
  }
  var _takingTooLongTimeout;  
  var r = document.documentElement;  
  var s = document.createElement("style");
  r.firstElementChild.insertBefore(s, r.firstElementChild.firstElementChild);
  globalMouseMoveHandler();
  window.addEventListener("resize", function () {
    clearTimeout(_takingTooLongTimeout);
    _takingTooLongTimeout = setTimeout(globalMouseMoveHandler, 300);
  }, false);
  window.addEventListener("pageshow", function (state) {
    if (state.persisted) {
      clearTimeout(_takingTooLongTimeout);
      _takingTooLongTimeout = setTimeout(globalMouseMoveHandler, 300);
    }
  }, false);
  if ("complete" === document.readyState) {
    document.body.style.fontSize = "16px";
  } else {
    document.addEventListener("DOMContentLoaded", function () {
      document.body.style.fontSize = "16px";
    }, false);
  }
}(750, 750);
