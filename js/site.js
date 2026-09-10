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
  { href: "kontakt.html",    label: "Kontakt" },
];

const SITE = {
  name: "Brf Stationen 1 i Hässelby Strand",
  tagline: "Staden inom räckhåll. Naturen runt hörnet.",
  orgnr: "769623-8257",
  address: ["Fyrspannsgatan 183", "165 62 Hässelby", "Stockholm"],
  email: "styrelsen@brfstationenhasselby.se",
  mapUrl: "https://www.google.com/maps/place/Bostadsr%C3%A4ttsf%C3%B6reningen+Stationen+1+I+H%C3%A4sselby+Strand/@59.3609261,17.8326819,15z/",
};

function currentPage() {
  const file = location.pathname.split("/").pop();
  return file === "" ? "index.html" : file;
}

const RESIDENT_PAGES = new Set(["ordningsregler.html", "gastlagenhet.html", "bygga-och-renovera.html", "pantsattningar.html", "trivselregler.html", "andrahandsuthyrning.html", "att-bo-i-bostadsratt.html", "nyinflyttad.html", "maklarinformation.html", "stadgar.html"]);

class SiteHeader extends HTMLElement {
  connectedCallback() {
    const page = currentPage();
    const links = NAV.map((item) => {
      const current = item.href === page ? ' aria-current="page"' : (RESIDENT_PAGES.has(page) && item.href === "for-boende.html" ? ' aria-current="location"' : "");
      return `<a href="${item.href}"${current}>${item.label}</a>`;
    }).join("");

    this.innerHTML = `
      <header class="header">
        <a class="skip-link" href="#huvudinnehall">Hoppa till innehållet</a>
        <div class="container header__inner">
          <a class="header__logo" href="index.html" aria-label="${SITE.name} – startsida">
            <svg class="header__wave" viewBox="0 0 180 100" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path d="M0 0H180V3C90 3 95 100 0 100Z"/></svg>
            <img src="img/logo-vit.png" alt="${SITE.name}" width="1000" height="318">
          </a>
          <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav">
            <span aria-hidden="true">☰</span> Meny
          </button>
          <nav class="nav" id="site-nav" aria-label="Huvudmeny">${links}</nav>
        </div>
      </header>`;

    const toggle = this.querySelector(".nav-toggle");
    const nav = this.querySelector(".nav");
    const main = document.querySelector("main");
    if (main) {
      main.id = "huvudinnehall";
      main.tabIndex = -1;
    }
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    this.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
  }
}

class SiteFooter extends HTMLElement {
  connectedCallback() {
    const year = new Date().getFullYear();
    const links = NAV.map((item) => `<li><a href="${item.href}">${item.label}</a></li>`).join("") + '<li><a href="garage.html">Garage</a></li>';
    this.innerHTML = `
      <footer class="footer">
        <div class="container footer__inner">
          <div>
            <a class="footer__logo" href="index.html"><img src="img/logo-vit.png" alt="${SITE.name}" width="1000" height="318"></a>
            <p>${SITE.tagline}</p>
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
