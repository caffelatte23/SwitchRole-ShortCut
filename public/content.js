/**
 * @type {chrome}
 */
var chrome;

/**
 * @param {HTMLMetaElement} metaASE
 * @returns {void}
 */
const setupMessageListener = (metaASE) => {
  if (!metaASE) return;

  let actionHost = metaASE.getAttribute('content');
  // eslint-disable-next-line no-undef
  chrome.runtime.onMessage.addListener(function (msg) {
    const { data, action } = msg;
    const { actionSubDomain } = data;

    if (actionSubDomain && actionHost === 'signin.aws.amazon.com') {
      actionHost = `${actionSubDomain}.${actionHost}`;
    }

    switch (action) {
      case 'switch':
        onSwitchMessage(actionHost, data);
        break;
      default:
        break;
    }
  });
};

const appendAESR = () => {
  const form = document.createElement('form');
  form.id = 'SR_form';
  form.method = 'POST';
  form.target = '_top';

  form.innerHTML = `
  <input type="hidden" name="mfaNeeded" value="0">
  <input type="hidden" name="action" value="switchFromBasis">
  <input type="hidden" name="src" value="nav">
  <input type="hidden" name="csrf">
  <input type="hidden" name="roleName">
  <input type="hidden" name="account">
  <input type="hidden" name="color">
  <input type="hidden" name="redirect_uri">
  <input type="hidden" name="displayName">
  `;
  document.body.appendChild(form);
};

/**
 * @param {string} actionHost
 * @param { import("../src/types").SwitchRoleParams } data
 * @returns {boolean}
 */
const onSwitchMessage = (actionHost, data) => {
  const form = document.getElementById('SR_form');
  form.setAttribute('action', `https://${actionHost}/switchrole`);

  form.account.value = data.account;
  form.color.value = data.color;
  form.roleName.value = data.roleName;
  form.displayName.value = data.displayName;
  form.redirect_uri.value = data.redirectUri;

  form.submit();
  return;
};

/**
 * @returns {boolean}
 */
const loadAccessScripts = () => {
  const id = 'sr_attach';
  if (document.getElementById(id)) return false;

  const script = document.createElement('script');
  script.src = chrome.runtime.getURL('/attach.js');
  script.id = id;
  document.body.appendChild(script);
  return true;
};

if (document.body) {
  const metaASE = document.getElementById('awsc-signin-endpoint');
  if (metaASE) {
    appendAESR();
    setupMessageListener(metaASE);
    loadAccessScripts();
  }
}
