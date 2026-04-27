document.documentElement.classList.add("js-enabled");

const previewLayer = document.querySelector(".project-preview");
const previewRows = document.querySelectorAll("[data-preview-images], [data-preview]");

function getPreviewImages(row) {
  const imageList = row.dataset.previewImages || row.dataset.preview || "";

  return imageList.split(/\s+/).filter(Boolean);
}

function showProjectPreview(row) {
  const imagePaths = getPreviewImages(row);
  const imagePath = imagePaths[Math.floor(Math.random() * imagePaths.length)];

  if (!previewLayer || !imagePath) {
    hideProjectPreview();
    return;
  }

  previewLayer.style.backgroundImage = `url("${imagePath}")`;
  document.body.classList.add("has-project-preview");
}

function hideProjectPreview() {
  document.body.classList.remove("has-project-preview");
}

previewRows.forEach((row) => {
  row.addEventListener("pointerenter", () => showProjectPreview(row));
  row.addEventListener("focus", () => showProjectPreview(row));
  row.addEventListener("pointerleave", hideProjectPreview);
  row.addEventListener("blur", hideProjectPreview);
});
