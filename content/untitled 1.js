(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  "use strict";

  const test = () => {
    window.addEventListener("resize", () => {
      console.log("test");
    });
  };

  test();
})();