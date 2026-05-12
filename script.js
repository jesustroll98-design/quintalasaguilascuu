const form = document.getElementById("reserveForm");
const galleryTrigger = document.querySelector(".gallery-trigger");
const lightbox = document.querySelector(".gallery-lightbox");
const lightboxSlides = document.querySelectorAll(".lightbox-slide");
const lightboxDots = document.querySelectorAll(".lightbox-dot");
const lightboxPrev = document.querySelector(".lightbox-prev");
const lightboxNext = document.querySelector(".lightbox-next");
const lightboxClose = document.querySelector(".lightbox-close");
const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
let currentSlide = 0;
let hoverTimer;

function showSlide(index) {
  currentSlide = (index + lightboxSlides.length) % lightboxSlides.length;

  lightboxSlides.forEach((slide, slideIndex) => {
    slide.classList.toggle("active", slideIndex === currentSlide);
  });

  lightboxDots.forEach((dot, dotIndex) => {
    dot.classList.toggle("active", dotIndex === currentSlide);
  });
}

function openGallery() {
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("no-scroll");
  showSlide(currentSlide);
}

function closeGallery() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("no-scroll");
}

if (galleryTrigger && lightbox) {
  galleryTrigger.addEventListener("click", openGallery);

  if (canHover) {
    galleryTrigger.addEventListener("mouseenter", function () {
      hoverTimer = setTimeout(openGallery, 220);
    });

    galleryTrigger.addEventListener("mouseleave", function () {
      clearTimeout(hoverTimer);
    });
  }

  lightboxPrev.addEventListener("click", function () {
    showSlide(currentSlide - 1);
  });

  lightboxNext.addEventListener("click", function () {
    showSlide(currentSlide + 1);
  });

  lightboxClose.addEventListener("click", closeGallery);

  lightbox.addEventListener("click", function (event) {
    if (event.target === lightbox) {
      closeGallery();
    }
  });

  lightboxDots.forEach((dot, index) => {
    dot.addEventListener("click", function () {
      showSlide(index);
    });
  });

  document.addEventListener("keydown", function (event) {
    if (!lightbox.classList.contains("open")) {
      return;
    }

    if (event.key === "Escape") {
      closeGallery();
    }

    if (event.key === "ArrowLeft") {
      showSlide(currentSlide - 1);
    }

    if (event.key === "ArrowRight") {
      showSlide(currentSlide + 1);
    }
  });
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const date = document.getElementById("date").value;
  const eventType = document.getElementById("eventType").value;
  const guests = document.getElementById("guests").value;
  const message = document.getElementById("message").value;

  const text = `Hola, me interesa reservar Quinta Las Águilas.
Nombre: ${name}
Teléfono: ${phone}
Fecha: ${date}
Tipo de evento: ${eventType}
Personas aprox: ${guests}
Mensaje: ${message}`;

  const whatsappUrl = `https://wa.me/526145148698?text=${encodeURIComponent(text)}`;
  window.open(whatsappUrl, "_blank");
});
