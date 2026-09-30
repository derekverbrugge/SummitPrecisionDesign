/* ==========================================================
   LOAD HEADER AND FOOTER
========================================================== */

async function loadComponent(elementId, file) {

  const element = document.getElementById(elementId);

  if (!element) return;

  try {

    const response = await fetch(file);

    if (!response.ok) {
      throw new Error(
        `Could not load ${file}: ${response.status}`
      );
    }

    element.innerHTML = await response.text();

  } catch (error) {

    console.error(
      `Component loading error:`,
      error
    );

  }
}


/* ==========================================================
   COPYRIGHT YEAR
========================================================== */

function setCopyrightYear() {

  const yearElement =
    document.getElementById("copyright-year");

  if (!yearElement) return;

  yearElement.textContent =
    new Date().getFullYear();
}


/* ==========================================================
   MOBILE NAVIGATION
========================================================== */

function initializeNavigation() {

  const menuButton =
    document.querySelector(".menu-toggle");

  const navigation =
    document.querySelector(".primary-navigation");

  if (!menuButton || !navigation) return;


  menuButton.addEventListener("click", () => {

    const isOpen =
      navigation.classList.toggle("open");

    menuButton.classList.toggle(
      "active",
      isOpen
    );

    menuButton.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

  });


  /*
   * Close the mobile menu after
   * selecting a navigation link.
   */

  navigation
    .querySelectorAll("a")
    .forEach(link => {

      link.addEventListener("click", () => {

        navigation.classList.remove("open");

        menuButton.classList.remove("active");

        menuButton.setAttribute(
          "aria-expanded",
          "false"
        );

      });

    });

}


/* ==========================================================
   SMOOTH SCROLLING
========================================================== */

function initializeSmoothScrolling() {

  document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

      link.addEventListener("click", event => {

        const targetId =
          link.getAttribute("href");

        if (
          !targetId ||
          targetId === "#"
        ) {
          return;
        }

        const target =
          document.querySelector(targetId);

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      });

    });

}


/* ==========================================================
   SCROLL REVEAL
========================================================== */

function initializeReveal() {

  const elements =
    document.querySelectorAll(
      ".section-heading, " +
      ".principle-card, " +
      ".service-card, " +
      ".journey-step, " +
      ".callout, " +
      ".method-copy, " +
      ".two-column > div"
    );

  elements.forEach(element => {

    element.classList.add("reveal");

  });


  const observer =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("visible");

          observer.unobserve(
            entry.target
          );

        });

      },
      {
        threshold: 0.12
      }
    );


  elements.forEach(element => {

    observer.observe(element);

  });

}


/* ==========================================================
   INITIALIZE SITE
========================================================== */

async function initializeSite() {

  await Promise.all([
    loadComponent(
      "site-header",
      "header.html"
    ),

    loadComponent(
      "site-footer",
      "footer.html"
    )
  ]);


  setCopyrightYear();

  initializeNavigation();

  initializeSmoothScrolling();

  initializeReveal();

}


/* ==========================================================
   START
========================================================== */

document.addEventListener(
  "DOMContentLoaded",
  initializeSite
);
