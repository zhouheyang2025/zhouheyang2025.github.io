document.documentElement.classList.add("js-enabled");

const menuToggles = document.querySelectorAll(".site-menu-toggle");
const previewLayer = document.querySelector(".project-preview");
const previewRows = document.querySelectorAll("[data-preview-images], [data-preview]");
const hoverPreviewQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

const preloadedImages = new Map();

let requestedPreviewPath = "";
let activePreviewPath = "";
let activeSlotIndex = 0;

const previewSlots = previewLayer
  ? [createPreviewImage(), createPreviewImage()]
  : [];

function createPreviewImage() {
  const image = document.createElement("img");
  image.className = "project-preview-image";
  image.alt = "";
  image.decoding = "async";
  image.loading = "eager";
  image.setAttribute("aria-hidden", "true");

  previewLayer.appendChild(image);

  return image;
}

function getPreviewImages(row) {
  const imageList = row.dataset.previewImages || row.dataset.preview || "";
  return imageList.split(/\s+/).filter(Boolean);
}

function preloadPreviewImage(imagePath) {
  if (!imagePath) return null;

  if (preloadedImages.has(imagePath)) {
    return preloadedImages.get(imagePath);
  }

  const image = new Image();
  image.decoding = "async";
  image.loading = "eager";
  image.src = imagePath;

  const ready = image.decode
    ? image.decode().catch(() => {})
    : new Promise((resolve) => {
        image.onload = resolve;
        image.onerror = resolve;
      });

  const cachedImage = { image, ready };
  preloadedImages.set(imagePath, cachedImage);

  return cachedImage;
}

function warmPreviewImages() {
  previewRows.forEach((row) => {
    const imagePaths = getPreviewImages(row);
    const firstImage = imagePaths[0];

    if (firstImage) {
      preloadPreviewImage(firstImage);
    }
  });

  const loadRemainingImages = () => {
    previewRows.forEach((row) => {
      getPreviewImages(row).forEach(preloadPreviewImage);
    });
  };

  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(loadRemainingImages, { timeout: 1200 });
  } else {
    window.setTimeout(loadRemainingImages, 250);
  }
}

function choosePreviewImage(row) {
  const imagePaths = getPreviewImages(row);

  if (!imagePaths.length) {
    return "";
  }

  const nextIndex = Number(row.dataset.previewIndex || 0) % imagePaths.length;
  row.dataset.previewIndex = String(nextIndex + 1);

  return imagePaths[nextIndex];
}

function showProjectPreview(row) {
  const imagePath = choosePreviewImage(row);

  if (!previewLayer || !previewSlots.length || !imagePath) {
    hideProjectPreview();
    return;
  }

  requestedPreviewPath = imagePath;

  const isPreviewVisible = document.body.classList.contains("has-project-preview");
  const isShowingNewImage = imagePath !== activePreviewPath;

  /*
    If the preview layer is currently hidden and we are about to show
    a different image, clear the active image first.
    This prevents the old preview image from flashing before the new one appears.
  */
  if (!isPreviewVisible && isShowingNewImage) {
    previewSlots.forEach((slot) => {
      slot.classList.remove("is-active");
    });
  }

  /*
    If the requested image is already active, simply show the layer.
    This mainly matters for projects with only one preview image.
  */
  if (imagePath === activePreviewPath) {
    document.body.classList.add("has-project-preview");
    return;
  }

  const cachedImage = preloadPreviewImage(imagePath);

  if (!cachedImage) {
    hideProjectPreview();
    return;
  }

  cachedImage.ready.then(() => {
    if (requestedPreviewPath !== imagePath) {
      return;
    }

    crossfadeToImage(imagePath);
    document.body.classList.add("has-project-preview");
  });
}

function crossfadeToImage(imagePath) {
  const nextSlotIndex = activeSlotIndex === 0 ? 1 : 0;
  const currentSlot = previewSlots[activeSlotIndex];
  const nextSlot = previewSlots[nextSlotIndex];

  nextSlot.src = imagePath;

  requestAnimationFrame(() => {
    nextSlot.classList.add("is-active");
    currentSlot.classList.remove("is-active");

    activeSlotIndex = nextSlotIndex;
    activePreviewPath = imagePath;
  });
}

function hideProjectPreview() {
  requestedPreviewPath = "";
  document.body.classList.remove("has-project-preview");

  /*
    Wait until the preview layer has faded out before clearing the active image.
    This keeps project-to-project crossfade smooth, while preventing old images
    from flashing when the cursor leaves and re-enters the same project later.
  */
  window.setTimeout(() => {
    if (!document.body.classList.contains("has-project-preview")) {
      previewSlots.forEach((slot) => {
        slot.classList.remove("is-active");
      });

      activePreviewPath = "";
    }
  }, 700);
}

function bindHoverPreviewEvents() {
  previewRows.forEach((row) => {
    row.addEventListener("pointerenter", () => showProjectPreview(row));
    row.addEventListener("focus", () => showProjectPreview(row));

    row.addEventListener("pointerleave", hideProjectPreview);
    row.addEventListener("blur", hideProjectPreview);
  });

  warmPreviewImages();
}

if (hoverPreviewQuery.matches) {
  bindHoverPreviewEvents();
}

menuToggles.forEach((toggle) => {
  const header = toggle.closest(".site-header");
  const controlledId = toggle.getAttribute("aria-controls");
  const menu = controlledId ? document.getElementById(controlledId) : null;

  if (!header || !menu) {
    return;
  }

  const closeMenu = () => {
    header.classList.remove("is-menu-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", toggle.dataset.openLabel || "Open navigation menu");
  };

  const openMenu = () => {
    header.classList.add("is-menu-open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", toggle.dataset.closeLabel || "Close navigation menu");
  };

  toggle.dataset.openLabel = toggle.getAttribute("aria-label") || "Open navigation menu";
  toggle.dataset.closeLabel = document.documentElement.lang === "zh-CN"
    ? "关闭导航菜单"
    : "Close navigation menu";

  toggle.addEventListener("click", () => {
    if (header.classList.contains("is-menu-open")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  menu.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest("a")) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });
});
