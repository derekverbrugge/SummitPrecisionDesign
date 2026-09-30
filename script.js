/* ==========================================================
   COMPONENT LOADER
========================================================== */

async function loadComponent(elementId, file) {

  const element =
    document.getElementById(elementId);

  if (!element) return;


  try {

    const response =
      await fetch(file);

    if (!response.ok) {

      throw new Error(
        `Could not load ${file}`
      );

    }

    element.innerHTML =
      await response.text();

  } catch (error) {

    console.error(
      "Component loading error:",
      error
    );

  }

}


/* ==========================================================
   COPYRIGHT
========================================================== */

function setCopyrightYear() {

  const year =
    document.getElementById(
      "copyright-year"
    );

  if (!year) return;

  year.textContent =
    new Date().getFullYear();

}


/* ==========================================================
   MOBILE NAVIGATION
========================================================== */

function initializeNavigation() {

  const menuButton =
    document.querySelector(
      ".menu-toggle"
    );

  const navigation =
    document.querySelector(
      ".primary-navigation"
    );


  if (!menuButton || !navigation) {
    return;
  }


  menuButton.addEventListener(
    "click",
    () => {

      const isOpen =
        navigation.classList.toggle(
          "open"
        );

      menuButton.classList.toggle(
        "active",
        isOpen
      );

      menuButton.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

    }
  );


  navigation
    .querySelectorAll("a")
    .forEach(link => {

      link.addEventListener(
        "click",
        () => {

          navigation.classList.remove(
            "open"
          );

          menuButton.classList.remove(
            "active"
          );

          menuButton.setAttribute(
            "aria-expanded",
            "false"
          );

        }
      );

    });

}


/* ==========================================================
   SMOOTH SCROLLING
========================================================== */

function initializeSmoothScrolling() {

  document
    .querySelectorAll(
      'a[href^="#"]'
    )
    .forEach(link => {

      link.addEventListener(
        "click",
        event => {

          const targetId =
            link.getAttribute("href");

          if (
            !targetId ||
            targetId === "#"
          ) {
            return;
          }


          const target =
            document.querySelector(
              targetId
            );

          if (!target) return;


          event.preventDefault();


          target.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

        }
      );

    });

}


/* ==========================================================
   INITIALIZE
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

}


/* ==========================================================
   START
========================================================== */

document.addEventListener(
  "DOMContentLoaded",
  initializeSite
);
