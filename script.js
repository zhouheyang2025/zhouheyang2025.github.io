document.documentElement.classList.add("js-enabled");

const previewLayer = document.querySelector(".project-preview");
const previewRows = document.querySelectorAll("[data-preview-images], [data-preview]");
const previewImage = previewLayer ? document.createElement("img") : null;
const preloadedImages = new Map();
let activePreviewPath = "";
let requestedPreviewPath = "";

if (previewImage) {
  previewImage.className = "project-preview-image";
  previewImage.alt = "";
  previewImage.decoding = "async";
  previewImage.loading = "eager";
  previewImage.setAttribute("aria-hidden", "true");
  previewLayer.appendChild(previewImage);
}

function getPreviewImages(row) {
  const imageList = row.dataset.previewImages || row.dataset.preview || "";

  return imageList.split(/\s+/).filter(Boolean);
}

function preloadPreviewImage(imagePath) {
  if (!imagePath) {
    return null;
  }

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

  if (!previewLayer || !previewImage || !imagePath) {
    hideProjectPreview();
    return;
  }

  requestedPreviewPath = imagePath;

  if (imagePath === activePreviewPath) {
    document.body.classList.add("has-project-preview");
    return;
  }

  const cachedImage = preloadPreviewImage(imagePath);

  cachedImage.ready.then(() => {
    if (requestedPreviewPath !== imagePath) {
      return;
    }

    previewImage.src = imagePath;
    activePreviewPath = imagePath;
    document.body.classList.add("has-project-preview");
  });
}

function hideProjectPreview() {
  requestedPreviewPath = "";
  document.body.classList.remove("has-project-preview");
}

previewRows.forEach((row) => {
  row.addEventListener("pointerenter", () => showProjectPreview(row));
  row.addEventListener("focus", () => showProjectPreview(row));
  row.addEventListener("pointerleave", hideProjectPreview);
  row.addEventListener("blur", hideProjectPreview);
});

warmPreviewImages();
