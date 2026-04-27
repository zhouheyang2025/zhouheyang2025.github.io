# Project Map

Controlled editing overview for the Zhou Heyang artist portfolio website.

## Current Structure

The site is a plain HTML/CSS/JavaScript portfolio archive. It currently contains root-level archive pages, four project pages in `works/`, one reusable project template, and two planning documents.

## Current Pages

| Page | File | Current state | Images | Text refinement |
| --- | --- | --- | --- | --- |
| Home / Archive Index | `index.html` | Structurally complete draft | Needs project preview images or controlled preview strategy | Needs final artist statement polish |
| Works Index | `works.html` | Structurally complete draft | Needs thumbnail images for all four works | Needs final project summaries after image selection |
| Notes | `notes.html` | Placeholder page | No images planned yet | Needs real notes, research fragments, or application-related writing |
| About | `about.html` | Draft page | No images planned yet | Needs final biography, application language, and possibly German/English refinement |
| Contact | `contact.html` | Placeholder page | No images planned | Needs real email, social/contact details, and final public wording |
| Project Template | `project-template.html` | Reference template | Not a public content page | Keep as editable structure reference |

## Project Pages

| No. | Project | File | Current state | Images | Text refinement |
| --- | --- | --- | --- | --- | --- |
| 01 | Land of Fish and Rice | `works/fish-and-rice.html` | Structurally complete draft | Needs final website images for all figure placeholders | Needs final captions and tighter application-oriented text |
| 02 | Gewu / Investigation | `works/gewu.html` | Structurally complete draft | Needs final website images for all figure placeholders | Needs final captions and material/process wording |
| 03 | Synthetic Diamond | `works/synthetic-diamond.html` | Structurally complete draft | Needs final website images for all figure placeholders | Needs final captions and sharper conceptual framing |
| 04 | Arch / Column | `works/arch-column.html` | Structurally complete draft | Needs final website images for all figure placeholders | Needs final captions and spatial/context wording |

## Pages Considered Complete

These pages are complete as first-version page structures:

- `index.html`
- `works.html`
- `about.html`
- `contact.html`
- `notes.html`
- `works/fish-and-rice.html`
- `works/gewu.html`
- `works/synthetic-diamond.html`
- `works/arch-column.html`

They are not final content pages yet because the images are still placeholders and some public-facing text needs refinement.

## Pages Still Needing Images

Primary image work is still needed on:

- `index.html`: project preview images are currently empty.
- `works.html`: all four work thumbnails are placeholders.
- `works/fish-and-rice.html`: all project figures are placeholders.
- `works/gewu.html`: all project figures are placeholders.
- `works/synthetic-diamond.html`: all project figures are placeholders.
- `works/arch-column.html`: all project figures are placeholders.

## Pages Still Needing Text Refinement

Priority text refinement:

- `about.html`: final biography, practice statement, and application-facing language.
- `contact.html`: real contact details and final public wording.
- `notes.html`: real research/process note content.
- `works/*.html`: final captions, project descriptions, material details, and application-oriented language.
- `index.html`: final short artist statement.
- `works.html`: final short summaries after image order is confirmed.

## Editing Notes

- Do not use raw images directly from `source-indesign/01-raw-package/Links/`.
- Website images should be copied into `assets/images/`, grouped by project.
- Every website image should have a stable image ID.
- Every project `<figure>` should keep a `data-image-id` value.
- When changing image order or placement, refer to image IDs, not vague visual descriptions.
- Keep image layouts restrained, archival, grid-based, and documentation-led.
