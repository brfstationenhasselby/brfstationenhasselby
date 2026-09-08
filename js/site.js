/* ==========================================================================
   Brf Stationen 1 i Hässelby Strand – site.js
   Renders the shared header and footer on every page. Edit the menu, the
   address or the footer links here and every page updates.
   Pages use the tags <site-header></site-header> and <site-footer></site-footer>.
   ========================================================================== */

const NAV = [
  { href: "index.html",      label: "Startsida" },
  { href: "for-boende.html", label: "För boende" },
  { href: "felanmalan.html", label: "Felanmälan" },
  { href: "garage.html",     label: "Garage" },
  { href: "kontakt.html",    label: "Kontakta styrelsen" },
];

const SITE = {
  name: "Brf Stationen 1 i Hässelby Strand",
  tagline: "En bostadsrättsförening värd sitt namn",
  orgnr: "769623-8257",
  address: ["Fyrspannsgatan 183", "165 62 Hässelby", "Stockholm"],
  email: "styrelsen@brfstationenhasselby.se",
  mapUrl: "https://www.google.com/maps/place/Bostadsr%C3%A4ttsf%C3%B6reningen+Stationen+1+I+H%C3%A4sselby+Strand/@59.3609261,17.8326819,15z/",
};

function currentPage() {
  const file = location.pathname.split("/").pop();
  return file === "" ? "index.html" : file;
}

class SiteHeader extends HTMLElement {
  connectedCallback() {
    const page = currentPage();
    const links = NAV.map((item) => {
      const current = item.href === page ? ' aria-current="page"' : "";
      return `<a href="${item.href}"${current}>${item.label}</a>`;
    }).join("");

    this.innerHTML = `
      <header class="header">
        <div class="container header__inner">
          <a class="header__logo" href="index.html" aria-label="${SITE.name} – startsida">
            <img src="img/logo.png" alt="${SITE.name}" width="900" height="379">
          </a>
          <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav">
            <span aria-hidden="true">☰</span> Meny
          </button>
          <nav class="nav" id="site-nav" aria-label="Huvudmeny">${links}</nav>
          <span class="header__tagline">${SITE.tagline}</span>
        </div>
      </header>`;

    const toggle = this.querySelector(".nav-toggle");
    const nav = this.querySelector(".nav");
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }
}

class SiteFooter extends HTMLElement {
  connectedCallback() {
    const year = new Date().getFullYear();
    const links = NAV.map((item) => `<li><a href="${item.href}">${item.label}</a></li>`).join("");
    this.innerHTML = `
      <footer class="footer">
        <div class="container footer__inner">
          <div>
            <a class="footer__logo" href="index.html"><img src="img/logo-vit.png" alt="${SITE.name}" width="900" height="379"></a>
            <p>${SITE.tagline}.</p>
            <p class="small">Org.nr ${SITE.orgnr}</p>
          </div>
          <div>
            <h4>Adress</h4>
            <p>${SITE.address.join("<br>")}</p>
            <p><a href="${SITE.mapUrl}" target="_blank" rel="noopener">Hitta hit</a></p>
            <h4>E-post</h4>
            <p><a href="mailto:${SITE.email}">${SITE.email}</a></p>
          </div>
          <div>
            <h4>Snabblänkar</h4>
            <ul>${links}</ul>
          </div>
        </div>
        <div class="container footer__bottom">
          <span>© ${year} ${SITE.name}</span>
          <span><a href="felanmalan.html">Felanmälan</a> · <a href="kontakt.html">Kontakt</a></span>
        </div>
      </footer>`;
  }
}

customElements.define("site-header", SiteHeader);
customElements.define("site-footer", SiteFooter);
