'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

function navigateToPage(targetPage) {
  for (let i = 0; i < pages.length; i++) {
    if (targetPage === pages[i].dataset.page) {
      pages[i].classList.add("active");
      navigationLinks[i].classList.add("active");
      window.scrollTo(0, 0);
    } else {
      pages[i].classList.remove("active");
      navigationLinks[i].classList.remove("active");
    }
  }
}

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    const page = this.innerHTML.toLowerCase();
    history.pushState(null, "", "#" + page);
    navigateToPage(page);
  });
}

// navigate on hash change (back/forward buttons)
window.addEventListener("hashchange", function () {
  const page = window.location.hash.slice(1).toLowerCase();
  if (page) navigateToPage(page);
});

// navigate on initial load if hash is present
(function () {
  const page = window.location.hash.slice(1).toLowerCase();
  if (page) navigateToPage(page);
})();

// === Resume modal ===
const resumeModal = document.getElementById('resumeModal');
const openResumeModalBtn = document.getElementById('openResumeModal');
const closeResumeModalBtn = document.getElementById('closeResumeModal');
const resumeBackdrop = document.getElementById('resumeModalBackdrop');

function openResumeModal() {
  if (!resumeModal) return;
  // Support both attribute & class toggles
  resumeModal.setAttribute('aria-hidden', 'false');
  resumeModal.classList.add('active');
  document.documentElement.classList.add('modal-open');
  document.body.classList.add('modal-open');
  closeResumeModalBtn?.focus();
  document.addEventListener('keydown', onResumeEsc);
}

function closeResumeModal() {
  if (!resumeModal) return;
  resumeModal.setAttribute('aria-hidden', 'true');
  resumeModal.classList.remove('active');
  document.documentElement.classList.remove('modal-open');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onResumeEsc);
  openResumeModalBtn?.focus();
}

function onResumeEsc(e) {
  if (e.key === 'Escape') closeResumeModal();
}

openResumeModalBtn?.addEventListener('click', openResumeModal);
closeResumeModalBtn?.addEventListener('click', closeResumeModal);
resumeBackdrop?.addEventListener('click', closeResumeModal);


// === Project modal ===
const projectModal = document.getElementById('projectModal');
const projectContent = document.getElementById('projectModalContent');
const projectTitleEl = document.getElementById('projectModalTitle');
const closeProjectModalBtn = document.getElementById('closeProjectModal');
const projectBackdrop = document.getElementById('projectModalBackdrop');

function openProjectModal(html, titleText) {
  if (!projectModal) return;
  projectContent.innerHTML = html || '';
  projectTitleEl.textContent = titleText || 'Project';
  projectModal.setAttribute('aria-hidden', 'false');
  document.documentElement.classList.add('modal-open');
  document.body.classList.add('modal-open');
  closeProjectModalBtn?.focus();
  document.addEventListener('keydown', onProjectEsc);
}

function closeProjectModal() {
  if (!projectModal) return;
  projectModal.setAttribute('aria-hidden', 'true');
  projectContent.innerHTML = '';
  document.documentElement.classList.remove('modal-open');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onProjectEsc);
}

function onProjectEsc(e) {
  if (e.key === 'Escape') closeProjectModal();
}

// Intercept clicks on project cards with data-modal-src
document.addEventListener('click', async (e) => {
  const link = e.target.closest('a.project-link');
  if (!link) return;

  const partialUrl = link.getAttribute('data-modal-src');
  if (!partialUrl) return; // no partial -> let it navigate normally

  e.preventDefault(); // use modal instead of navigation
  try {
    const res = await fetch(partialUrl, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to load project content');
    const html = await res.text();
    const title = link.querySelector('.project-title')?.textContent?.trim();
    openProjectModal(html, title);
  } catch (err) {
    // Fallback: navigate to the real page
    window.location.href = link.href;
  }
});

closeProjectModalBtn?.addEventListener('click', closeProjectModal);
projectBackdrop?.addEventListener('click', closeProjectModal);
