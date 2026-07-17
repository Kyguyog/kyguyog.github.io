(function(){
  var isIndex = window.location.pathname === '/' || window.location.pathname === '/index.html';
  var isRoot = window.location.pathname === '/' || window.location.pathname.endsWith('/index.html') || window.location.pathname === '/index.html';
  var sidebarPos = localStorage.getItem('kw_sidebar_pos') || 'left';

  var css = document.createElement('style');
  css.textContent = 'nav{position:fixed;top:0;left:0;right:0;z-index:100;background:rgba(10,10,15,0.85);backdrop-filter:blur(12px);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;padding:0 2rem;height:56px}.nav-logo{display:flex;align-items:center;gap:0.5rem;text-decoration:none}.logo-text{display:inline-block;font-family:var(--font-display);font-weight:900;letter-spacing:0.05em;text-decoration:none;color:var(--text)}.logo-text>span{margin-left:-0.05em;color:var(--primary);text-decoration:none}.nav-logo img{width:28px;height:28px;object-fit:contain}.nav-links{display:flex;gap:2.5rem;position:absolute;left:50%;transform:translateX(-50%)}.nav-links a{font-family:var(--font-display);font-size:0.7rem;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:var(--muted);text-decoration:none;transition:color .2s}.nav-links a:hover{color:var(--text)}.nav-hamburger{display:none;flex-direction:column;justify-content:center;gap:5px;background:transparent;border:1px solid var(--border);border-radius:6px;padding:.45rem .55rem;cursor:pointer;z-index:201;flex-shrink:0}.nav-hamburger span{display:block;width:18px;height:2px;background:var(--text);border-radius:2px;transition:transform .25s,opacity .25s}.nav-hamburger.open span:nth-child(1){transform:translateY(7px) rotate(45deg)}.nav-hamburger.open span:nth-child(2){opacity:0}.nav-hamburger.open span:nth-child(3){transform:translateY(-7px) rotate(-45deg)}.nav-mobile-drawer{display:none;position:fixed;top:56px;left:0;right:0;background:rgba(10,10,15,0.97);backdrop-filter:blur(16px);border-bottom:1px solid var(--border);z-index:199;flex-direction:column;padding:1rem 1.5rem 1.5rem;gap:.25rem;transform:translateY(-8px);opacity:0;transition:opacity .2s,transform .2s}.nav-mobile-drawer.open{display:flex;opacity:1;transform:translateY(0)}.nav-mobile-drawer a{font-family:var(--font-display);font-size:.75rem;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:var(--muted);text-decoration:none;transition:color .2s}#nav-sidebar{position:fixed;top:50%;transform:translateY(-50%);z-index:99;display:flex;flex-direction:column;gap:.35rem;padding:.5rem .35rem;background:rgba(10,10,15,0.7);backdrop-filter:blur(8px);border:1px solid var(--border);border-radius:10px}.sidebar-left{left:.75rem}.sidebar-right{right:.75rem}.sidebar-link{display:flex;align-items:center;gap:.5rem;padding:.4rem .5rem;border-radius:6px;color:var(--muted);text-decoration:none;font-family:var(--font-display);font-size:.6rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;transition:color .2s,background .2s;white-space:nowrap}.sidebar-link:hover{color:var(--primary);background:rgba(168,85,247,0.1)}.sidebar-link svg{flex-shrink:0;color:var(--muted);transition:color .2s}.sidebar-link:hover svg{color:var(--primary)}.sidebar-link span{display:none}@media(min-width:900px){.sidebar-link{width:36px;overflow:hidden;transition:width .25s,background .2s}.sidebar-link:hover{width:auto;padding-right:1rem}.sidebar-link:hover span{display:inline}}@media(max-width:899px){#nav-sidebar{display:none}} ';

  document.head.appendChild(css);

  var nav = document.createElement('nav');
  nav.innerHTML =
    '<a class="nav-logo" href="/index.html">' +
      '<img src="/KnowWhere-Logo-Trans.png"/>' +
      '<span class="logo-text">KNOW<span>WHERE</span></span>' +
    '</a>' +
    '<div class="nav-links">' +
      '<a href="/index.html">Home</a>' +
      '<a href="/msg.html">Message</a>' +
      '<a href="/playtime.html">Playtime</a>' +
      '<a href="/updates.html">Updates</a>' +
      '<a href="/bugs.html">Bugs</a>' +
    '</div>' +
    '<div id="nav-user-badge" style="display:flex;align-items:center;gap:0.5rem;margin-left:auto;"></div>' +
    '<button aria-label="Toggle menu" class="nav-hamburger" id="nav-hamburger" onclick="toggleMobileNav()">' +
      '<span></span><span></span><span></span>' +
    '</button>';

  var drawer = document.createElement('div');
  drawer.className = 'nav-mobile-drawer';
  drawer.id = 'nav-mobile-drawer';
  drawer.innerHTML =
    '<a href="/msg.html" onclick="closeMobileNav()">Message</a>' +
    '<a href="/index.html" onclick="closeMobileNav()">Home</a>' +
    (isIndex ? '<a href="#top-tier" onclick="closeMobileNav()">Tier</a>' : '') +
    (isIndex ? '<a href="#games" onclick="closeMobileNav()">Games</a>' : '') +
    (isIndex ? '<a href="#sites" onclick="closeMobileNav()">Sites</a>' : '') +
    (isIndex ? '<a href="#shop" onclick="closeMobileNav()">Shop</a>' : '') +
    (isIndex ? '<a href="#stats" onclick="closeMobileNav()">Stats</a>' : '') +
    (isIndex ? '<a href="#staff" onclick="closeMobileNav()">Outcasts</a>' : '') +
    '<a href="/playtime.html" onclick="closeMobileNav()">Playtime</a>' +
    '<a href="/updates.html" onclick="closeMobileNav()">Updates</a>' +
    '<a href="/bugs.html" onclick="closeMobileNav()">Bugs</a>';

  document.body.insertBefore(drawer, document.body.firstChild);
  document.body.insertBefore(nav, document.body.firstChild);

  if (isIndex) {
    var side = document.createElement('div');
    side.id = 'nav-sidebar';
    side.className = 'sidebar-' + sidebarPos;
    side.innerHTML =
      '<a class="sidebar-link" href="#home" title="Home"><img src="KnowWhere-Logo-Trans.png" width="18" height="18" alt=""><span>Home</span></a>' +
      '<a class="sidebar-link" href="#top-tier" title="Tier"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg><span>Tier</span></a>' +
      '<a class="sidebar-link" href="#games" title="Games"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 12h4M8 10v4"/><circle cx="15" cy="9" r="1"/><circle cx="18" cy="9" r="1"/><circle cx="15" cy="15" r="1"/><circle cx="18" cy="15" r="1"/></svg><span>Games</span></a>' +
      '<a class="sidebar-link" href="#sites" title="Sites"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg><span>Sites</span></a>' +
      '<a class="sidebar-link" href="#shop" title="Shop"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg><span>Shop</span></a>' +
      '<a class="sidebar-link" href="#stats" title="Stats"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg><span>Stats</span></a>' +
      '<a class="sidebar-link" href="#staff" title="Outcasts"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg><span>Outcasts</span></a>';
    document.body.appendChild(side);
  }

  window.toggleMobileNav = function() {
    var btn = document.getElementById('nav-hamburger');
    var d = document.getElementById('nav-mobile-drawer');
    btn.classList.toggle('open');
    d.classList.toggle('open');
  };
  window.closeMobileNav = function() {
    document.getElementById('nav-hamburger').classList.remove('open');
    document.getElementById('nav-mobile-drawer').classList.remove('open');
  };
  document.addEventListener('click', function(e) {
    var btn = document.getElementById('nav-hamburger');
    var d = document.getElementById('nav-mobile-drawer');
    if (btn && d && !btn.contains(e.target) && !d.contains(e.target)) {
      btn.classList.remove('open');
      d.classList.remove('open');
    }
  });
})();
