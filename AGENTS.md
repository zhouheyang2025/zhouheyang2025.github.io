# AGENTS.md

## Project identity

This is an artist portfolio website for Zhou Heyang.

It is not a commercial agency website, not a startup landing page, and not a decorative personal homepage.

The site should present artistic practice across installation, jewelry, object-based work, spatial work, and material research.

The website should support applications to German art / stage / space-related programs, while also functioning as a public artist archive.

## Core visual language

The visual direction should be:

- restrained
- cold
- precise
- archival
- grid-based
- image-led
- text-light
- slightly forensic
- influenced by German modern graphic design

The site should feel closer to:

- an art-school portfolio archive
- an exhibition inventory
- a forensic documentation system
- a quiet spatial index

It should not feel like:

- a commercial design studio template
- a lifestyle blog
- a colorful creative portfolio
- a startup product landing page
- a luxury brand homepage
- a social media link page

## Design rules

Use:

- monochrome palette: black, white, grey
- strong typographic hierarchy
- strict grid alignment
- narrow text columns
- generous margins
- sharp edges
- archival project numbers: 01 / 02 / 03 / 04
- clear project metadata: year, material, medium, type
- minimal animation
- image layouts that feel like documentation, evidence, or archive

Avoid:

- gradients
- decorative shadows
- excessive rounded corners
- cute icons
- generic portfolio cards
- large marketing slogans
- overly expressive typography
- unnecessary animation
- visual effects that compete with the works

## Technical rules

For the first version:

- Use plain HTML, CSS, and minimal JavaScript.
- Do not use React, Next.js, Vue, or complex frameworks unless I explicitly ask.
- Keep the code beginner-friendly and easy to edit.
- Use semantic HTML.
- Organize CSS clearly by section.
- Make all pages responsive.
- Keep image paths simple and relative.
- Do not rename image files unless necessary.
- Do not delete existing files without explaining why.

## Working method

Before making large changes:

1. Inspect the current file structure.
2. Explain what the site currently contains.
3. Propose a small next step.
4. Make limited, reviewable changes.
5. Summarize exactly which files were changed.
6. Tell me how to preview the result locally.

## Safety

Do not touch files outside this project folder.
Do not add API keys, tokens, passwords, or private information.
Do not install large dependencies without asking first.
Do not push to GitHub unless I explicitly ask.
## Image workflow

All website images must be controlled through stable image IDs.

Rules:

1. Do not use raw image files directly from `source-indesign/01-raw-package/Links/`.
2. Copy selected images into `assets/images/`, grouped by project.
3. Use lowercase English filenames with hyphens.
4. Each website image must have a stable Image ID.
5. Each `<figure>` should include a `data-image-id` attribute.
6. Use the image manifest at `source-indesign/04-image-manifest/image-manifest.md` as the source of truth for image order, captions, sections, and layout.
7. Do not delete original raw images.
8. Do not rename website images without updating `image-manifest.md`.
9. When changing image positions, refer to Image IDs, not vague descriptions.
10. Keep image layouts restrained, archival, and grid-based.

Available layout classes:

- image-hero
- image-wide
- image-grid-2
- image-grid-3
- image-small
- image-strip
- image-evidence
- image-detail
## PDF-to-web layout translation

When adapting layouts from the PDF portfolio:

1. Do not copy the PDF spread literally.
2. Translate the PDF's hierarchy into responsive web layouts.
3. Desktop and landscape views may preserve a horizontal, spread-like feeling.
4. Mobile views must prioritize readable vertical order.
5. Keep project pages aligned with the Fish and Rice layout system.
6. Reuse existing gallery classes where possible.
7. Only add new CSS classes when necessary.
8. Keep figure elements and data-image-id attributes stable.
9. Use image groupings rather than scattered individual images.
10. Preserve the project's image hierarchy, not the exact print geometry.