# three.js (vendored)

Minified ES-module build of [three.js](https://threejs.org) r186, MIT licensed —
see `LICENSE`. Copied from the sibling Ruben Pap Ceramics site, which vendors the
same build.

Vendored rather than loaded from a CDN so the visualizer keeps working when the
CDN is unreachable or changes what it serves, and so the version is pinned in
this repository.

`three.module.js` imports `./three.core.js`; nothing else is required. The
`three` and `three/addons/` specifiers are wired up by the import map in
`../../index.html`.

Addons (`OrbitControls`, `RoomEnvironment`) are NOT copied here, because nothing
in this repository uses them yet. They live alongside this build in the sibling
repository if they are wanted later.
