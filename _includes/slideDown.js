/**
 * http://jsfiddle.net/alistairjcbrown/wJTgA/
 */
(function (document) {
  "use strict";

  var hidden_el = document.getElementsByClassName("hidden-content"),
    control_el = document.getElementsByClassName("toggle-content");

  if (hidden_el.length < 1 || control_el.length < 1) {
    return;
  }

  // Get the elements
  hidden_el = hidden_el[0];
  control_el = control_el[0];

  control_el.onclick = function () {
    var element_classes = (" " + hidden_el.className + " ").replace(/[\n\t\r]/g, " "),
      remove_class = "slide-down",
      add_class = "slide-up",
      is_showing = element_classes.indexOf(" " + remove_class + " ") > -1;
  
    if (!is_showing) {
      // Switch variable values
      remove_class = [add_class, add_class = remove_class][0];
    }

    // Remove the previous class (if present) and add the new class
    hidden_el.className = (element_classes.replace(" " + remove_class + " ", "") + " " + add_class + " ").trim();
    control_el.className = ((" " + control_el.className + " ")
      .replace(/[\n\t\r]/g, " ")
      .replace(" " + remove_class + " ", "") + " " + add_class + " ").trim();

    return false;
  };
})(document);