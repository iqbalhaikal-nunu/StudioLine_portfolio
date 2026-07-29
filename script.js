/* ================================================================
   ARTWORK GALLERY DATA
   To add a picture:    copy a line, change src + caption.
   To remove a picture: delete its line.
   Images live in the /assets folder next to this file.
   ================================================================ */
const ARTWORK_IMAGES = [
  { src: "assets/project-digital-illustration.jpg", caption: "Digital Illustration" },
  { src: "assets/project-handdrawn-1.jpg",          caption: "Hand-Drawn Illustration" },
  { src: "assets/project-handdrawn-2.jpg",          caption: "Hand-Drawn Illustration" },
  { src: "assets/project-packaging-1.jpg",          caption: "Packaging" },
  { src: "assets/project-packaging-2.jpg",          caption: "Packaging" },
  { src: "assets/project-totebag-1.jpg",            caption: "Totebag" },
  { src: "assets/project-totebag-2.jpg",            caption: "Totebag" },
  { src: "assets/project-photography-1.jpg",        caption: "Photography" },
  { src: "assets/project-photography-2.jpg",        caption: "Photography" },
  { src: "assets/project-typography.jpg",           caption: "Typography" },
  { src: "assets/project-button-badge.jpg",         caption: "Button Badge" },
  { src: "assets/project-newspaper.jpg",            caption: "Newspaper" },
  { src: "assets/project-poster-education.jpg",     caption: "Poster Education" },
  { src: "assets/project-labelling-1.jpg",          caption: "Labelling" },
  { src: "assets/project-labelling-2.jpg",          caption: "Labelling" },
  { src: "assets/project-brochure.jpg",             caption: "Brochure" },
  { src: "assets/project-3d-poster.jpg",            caption: "3D Poster" },
  { src: "assets/project-magazine.jpg",             caption: "Magazine" },
  { src: "assets/project-poster.jpg",                caption: "Poster" },
  { src: "assets/project-flashcard.jpg",            caption: "Flash Card" },
];

/* ================================================================
   SKILL PICTURES (Skill page)
   To add a skill:    copy a line, change src + label.
   To remove a skill: delete its line.
   Images live in the /assets folder next to this file.
   ================================================================ */
const SKILL_IMAGES = [
  { src: "assets/skill-illustrator.png", label: "Adobe Illustrator" },
  { src: "assets/skill-photoshop.png",   label: "Adobe Photoshop" },
  { src: "assets/skill-indesign.png",    label: "Adobe InDesign" },
  { src: "assets/skill-canva.png",       label: "Canva" },
  { src: "assets/skill-krita.png",       label: "Krita" },
  { src: "assets/skill-word.png",        label: "Microsoft Word" },
  { src: "assets/skill-capcut.png",      label: "CapCut" },
  { src: "assets/skill-ibispaint.png",   label: "Ibis Paint" },
];

/* ================================================================
   PAGE ROUTER — hash based, so links & the browser back button work
   ================================================================ */
const PAGES = ["home", "project", "artwork", "skill", "contact"];

function showPage(name) {
  if (!PAGES.includes(name)) name = "home";

  document.querySelectorAll(".page").forEach(sec => {
    sec.classList.toggle("active", sec.dataset.page === name);
  });
  document.querySelectorAll("[data-nav]").forEach(el => {
    el.classList.toggle("active", el.dataset.nav === name);
  });

  const activePage = document.getElementById(`page-${name}`);
  if (activePage) activePage.scrollTop = 0;

  document.getElementById("navLinks").classList.remove("open");
}

function currentPageFromHash() {
  return (window.location.hash || "#home").replace("#", "");
}

window.addEventListener("hashchange", () => showPage(currentPageFromHash()));

/* ================================================================
   Build the artwork grid + lightbox
   ================================================================ */
function buildArtworkGrid() {
  const grid = document.getElementById("artworkGrid");
  grid.innerHTML = "";
  ARTWORK_IMAGES.forEach((item, i) => {
    const fig = document.createElement("div");
    fig.className = "artwork-item";
    fig.innerHTML = `<img src="${item.src}" alt="${item.caption}" loading="lazy"><span>${item.caption}</span>`;
    fig.addEventListener("click", () => openLightbox(i));
    grid.appendChild(fig);
  });
}

function buildSkillGrid() {
  const grid = document.getElementById("skillIconGrid");
  if (!grid) return;
  grid.innerHTML = "";
  SKILL_IMAGES.forEach(item => {
    const card = document.createElement("div");
    card.className = "skill-icon-card";
    card.innerHTML = `<img src="${item.src}" alt="${item.label}"><span>${item.label}</span>`;
    grid.appendChild(card);
  });
}

function openLightbox(index) {
  const item = ARTWORK_IMAGES[index];
  document.getElementById("lightboxImg").src = item.src;
  document.getElementById("lightboxImg").alt = item.caption;
  document.getElementById("lightboxCaption").textContent = item.caption;
  document.getElementById("lightbox").classList.add("open");
}
function closeLightbox() {
  document.getElementById("lightbox").classList.remove("open");
}

document.getElementById("lightboxClose").addEventListener("click", closeLightbox);
document.getElementById("lightbox").addEventListener("click", (e) => {
  if (e.target.id === "lightbox") closeLightbox();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});

/* ================================================================
   Mobile nav toggle
   ================================================================ */
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
navToggle.addEventListener("click", () => navLinks.classList.toggle("open"));

/* ================================================================
   Init
   ================================================================ */
buildArtworkGrid();
buildSkillGrid();
showPage(currentPageFromHash());
