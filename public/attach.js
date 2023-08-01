/**
 * @type {import("../src/types").AWSConsole}
 */
var AWSC;

(function () {
  const form = document.getElementById('SR_form');
  if (form) {
    form.csrf.value = AWSC.Auth.getMbtc();
  }
})();
