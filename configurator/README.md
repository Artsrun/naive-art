# 3D configurator

Pick a form, try a ground, and see a painting on it in 3D. A single static page,
no build step: open `index.html` from a local server.

## Where it came from

The engine — the WebGL viewer, the configurator, the stylesheet, the theme and
language switches — is **copied from the [Ruben Pap Ceramics](https://github.com/Artsrun/ruben-pap)
site** in the same account, and adapted here. Nothing personal to that studio
came with it: its contact details, address, map links, photographs, piece
catalogue and brand marks were removed, and its four-language copy was replaced
with English written for this site.

three.js is **not** duplicated: this page's import map points at the copy already
vendored at `../ceramic/vendor/three` (r186, MIT), with `OrbitControls` and
`RoomEnvironment` added there for it.

## Painting on the piece

The forms are generated from profile curves in `assets/js/pieces.js` and carry no
UV coordinates, so a painting is **projected** in the glaze shader instead: laid
flat on shallow forms like the plate, wrapped around upright ones like the mug
and vase. `setPiece` chooses from the piece's own proportions, so a new profile
needs no extra configuration. Unglazed rim and foot are left unpainted.

Uploads never leave the browser — `FileReader` hands the image to the viewer as a
texture. A piece can also carry its own painting via `art: 'file.png'` in
`pieces.js`.

## Before this is shown to anyone

| | state |
|---|---|
| Viewer, configurator, painting projection | working |
| Measurements in `pieces.js` | ⚠ **invented placeholders.** They drive the dimension lines a customer sees — replace with real measurements. |
| Grounds / glazes | plausible values, never compared against a fired piece |
| Contact details (`assets/js/config.js`) | **empty.** Every contact button stays hidden until filled in. |
| Photographs | none; piece thumbnails show the piece's name |
| Languages | English only. The machinery for more is intact — see the note in `assets/js/i18n.js`. |

## Relationship to the rest of the site

This page is **additive**. `visualizer.html` (the page the site actually links
to) and `ceramic/` (the modular rewrite, with the unit tests CI runs) are both
untouched. Deciding which of the three the site should link to is a separate
question — see the PR description.
