const header = document.getElementById("site-header");
const callBtn = document.getElementById("call-btn");

// HEADER SCROLL EFFECT
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("bg-black/30", "backdrop-blur-md", "shadow-lg");

    if (callBtn) {
      callBtn.classList.add("glow-pulse-red");
    }
  } else {
    header.classList.remove("bg-black/30", "backdrop-blur-md", "shadow-lg");

    if (callBtn) {
      callBtn.classList.remove("glow-pulse-red");
    }
  }
});

// REVEAL ANIMATIONS
const revealElements = document.querySelectorAll(".reveal");

const revealOnScroll = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    } else {
      entry.target.classList.remove("active");
    }
  });
}, {
  threshold: 0.12,
  rootMargin: "0px 0px -40px 0px"
});

revealElements.forEach((element) => {
  revealOnScroll.observe(element);
});

revealElements.forEach((element) => {
  const rect = element.getBoundingClientRect();

  // Safety: if already visible on page load, activate it immediately
  if (rect.top < window.innerHeight && rect.bottom > 0) {
    element.classList.add("active");
  } else {
    revealOnScroll.observe(element);
  }
});

// MOBILE MENU
const mobileMenu = document.getElementById("mobile-menu");
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenuClose = document.getElementById("mobile-menu-close");

if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.remove("hidden");
    document.body.classList.add("overflow-hidden");
  });
}

if (mobileMenuClose && mobileMenu) {
  mobileMenuClose.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
  });
}

// MOBILE SERVICES DROPDOWN
const mobileServicesToggle = document.getElementById("mobile-services-toggle");
const mobileServicesMenu = document.getElementById("mobile-services-menu");
const mobileServicesArrow = document.getElementById("mobile-services-arrow");

if (mobileServicesToggle && mobileServicesMenu) {
  mobileServicesToggle.addEventListener("click", () => {
    mobileServicesMenu.classList.toggle("hidden");

    if (mobileServicesArrow) {
      mobileServicesArrow.classList.toggle("rotate-180");
    }
  });
}

// SHUFFLE PORTFOLIO CAROUSEL
const portfolioSlides = document.querySelectorAll(".portfolio-slide");
const portfolioPrev = document.getElementById("portfolioPrev");
const portfolioNext = document.getElementById("portfolioNext");
const portfolioCounter = document.getElementById("portfolioCounter");

let portfolioIndex = 0;

function updatePortfolioCarousel() {
  portfolioSlides.forEach((slide, index) => {
    slide.classList.remove(
      "z-30", "z-20", "z-10",
      "opacity-100", "opacity-70", "opacity-60", "opacity-40", "opacity-0",
      "scale-100", "scale-95", "scale-90",
      "rotate-0", "rotate-3", "-rotate-3", "rotate-6", "-rotate-6",
      "translate-x-0", "translate-x-8", "-translate-x-8",
      "translate-x-20", "-translate-x-20",
      "translate-y-2", "-translate-y-2"
    );

    const video = slide.querySelector("video");

    if (video) {
    const maxTime = parseFloat(video.dataset.maxTime) || 8;

      video.muted = true;
      video.currentTime = 0;

      video.play().catch(() => {});

      video.ontimeupdate = () => {
        if (video.currentTime >= maxTime) {
          video.pause();
          video.currentTime = 0;
        }
      };
    }

    if (index === portfolioIndex) {
      slide.classList.add("z-30", "opacity-100", "scale-100", "rotate-0", "translate-x-0");

      if (video) {
        video.play().catch(() => {});
      }
    } else if (index === (portfolioIndex + 1) % portfolioSlides.length) {
      slide.classList.add(
        "z-20",
        "opacity-60",
        "scale-90",
        "rotate-3",
        "translate-x-8",
        "-translate-y-2"
      );
    } else {
      slide.classList.add(
        "z-10",
        "opacity-40",
        "scale-90",
        "-rotate-3",
        "-translate-x-8",
        "translate-y-2"
      );
    }
  });

  if (portfolioCounter) {
    portfolioCounter.innerHTML =
        `<span class="text-yellow-400">${portfolioIndex + 1}</span> / ${portfolioSlides.length}`;
  }
}

if (portfolioPrev && portfolioNext && portfolioSlides.length) {
  portfolioPrev.addEventListener("click", () => {
    portfolioIndex =
      (portfolioIndex - 1 + portfolioSlides.length) % portfolioSlides.length;

    updatePortfolioCarousel();
  });

  portfolioNext.addEventListener("click", () => {
    portfolioIndex =
      (portfolioIndex + 1) % portfolioSlides.length;

    updatePortfolioCarousel();
  });

  updatePortfolioCarousel();
}

// KEYBOARD SUPPORT FOR PORTFOLIO
document.addEventListener("keydown", (e) => {
  if (!portfolioSlides.length) return;

  if (e.key === "ArrowLeft") {
    portfolioIndex =
      (portfolioIndex - 1 + portfolioSlides.length) % portfolioSlides.length;

    updatePortfolioCarousel();
  }

  if (e.key === "ArrowRight") {
    portfolioIndex =
      (portfolioIndex + 1) % portfolioSlides.length;

    updatePortfolioCarousel();
  }
});

// SWIPE SUPPORT FOR PORTFOLIO
const portfolioTrack = document.getElementById("portfolioTrack");

let touchStartX = 0;
let touchEndX = 0;

if (portfolioTrack && portfolioSlides.length) {
  portfolioTrack.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  portfolioTrack.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;

    const swipeDistance = touchEndX - touchStartX;

    if (Math.abs(swipeDistance) > 50) {
      if (swipeDistance > 0) {
        portfolioIndex =
          (portfolioIndex - 1 + portfolioSlides.length) % portfolioSlides.length;
      } else {
        portfolioIndex =
          (portfolioIndex + 1) % portfolioSlides.length;
      }

      updatePortfolioCarousel();
    }
  });
}

// QUOTE MODAL
const quoteBtns = document.querySelectorAll(".quote-btn");
const quoteModal = document.getElementById("quote-modal");
const quoteModalClose = document.getElementById("quote-modal-close");

if (quoteBtns.length && quoteModal) {

  quoteBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();

      quoteModal.classList.remove("hidden");
      document.body.classList.add("overflow-hidden");
    });
  });

  if (quoteModalClose) {
    quoteModalClose.addEventListener("click", () => {
      quoteModal.classList.add("hidden");
      document.body.classList.remove("overflow-hidden");
    });
  }

  // CLOSE WHEN CLICKING OUTSIDE MODAL
  quoteModal.addEventListener("click", (e) => {
    if (e.target === quoteModal) {
      quoteModal.classList.add("hidden");
      document.body.classList.remove("overflow-hidden");
    }
  });
}

// REVIEWS MOBILE/TABLET DRAG SUPPORT
const reviewsSlider = document.querySelector(".reviews-slider");
const reviewsTrack = document.querySelector(".reviews-track");

let reviewsStartX = 0;
let reviewsCurrentX = 0;
let reviewsDragX = 0;
let reviewsIsDragging = false;

if (reviewsSlider && reviewsTrack) {
  reviewsSlider.addEventListener("touchstart", (e) => {
    reviewsIsDragging = true;
    reviewsStartX = e.touches[0].clientX;

    reviewsSlider.classList.add("paused");
    reviewsTrack.classList.add("dragging");
  }, { passive: true });

  reviewsSlider.addEventListener("touchmove", (e) => {
    if (!reviewsIsDragging) return;

    reviewsCurrentX = e.touches[0].clientX;
    reviewsDragX = reviewsCurrentX - reviewsStartX;

    reviewsTrack.style.transform = `translateX(${reviewsDragX}px)`;
  }, { passive: true });

  reviewsSlider.addEventListener("touchend", () => {
    reviewsIsDragging = false;

    reviewsTrack.style.transform = "";
    reviewsSlider.classList.remove("paused");
    reviewsTrack.classList.remove("dragging");
  });

  reviewsSlider.addEventListener("touchcancel", () => {
    reviewsIsDragging = false;

    reviewsTrack.style.transform = "";
    reviewsSlider.classList.remove("paused");
    reviewsTrack.classList.remove("dragging");
  });
}