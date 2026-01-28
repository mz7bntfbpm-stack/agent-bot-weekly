/* Cookie consent banner (ACME Demo) */
(function(){
  function setCookie(name, value, days) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days*24*60*60*1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
  }
  function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
  }
  function createBanner(){
    var banner = document.createElement('div');
    banner.id = 'cookie-banner';
    banner.style.position = 'fixed';
    banner.style.bottom = '0';
    banner.style.left = '0';
    banner.style.right = '0';
    banner.style.background = '#111';
    banner.style.color = '#fff';
    banner.style.padding = '12px';
    banner.style.display = 'flex';
    banner.style.justifyContent = 'space-between';
    banner.style.alignItems = 'center';
    banner.style.zIndex = '9999';

    var text = document.createElement('span');
    text.textContent = 'Diese Website verwendet Cookies, um Inhalte zu personalisieren und Zugriffe zu analysieren.';

    var btn = document.createElement('button');
    btn.textContent = 'Akzeptieren';
    btn.style.marginLeft = '12px';
    btn.style.padding = '6px 12px';
    btn.style.background = '#4CAF50';
    btn.style.color = '#fff';
    btn.style.border = '0';
    btn.style.borderRadius = '4px';
    btn.style.cursor = 'pointer';
    btn.addEventListener('click', function(){
      setCookie('cookie_consent','yes',365);
      document.body.removeChild(banner);
    });

    banner.appendChild(text);
    banner.appendChild(btn);
    document.body.appendChild(banner);
  }
  if (!getCookie('cookie_consent')) {
    document.addEventListener('DOMContentLoaded', createBanner);
  }
})();
