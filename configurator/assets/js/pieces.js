/*
 * Pieces for the 3D configurator ("Make it yours").
 *
 * These four forms mirror the objects in the Arpine Art naive-art visualizer
 * (plate, mug, bowl, vase) rather than the vessels of the site this engine was
 * derived from.
 *
 * sizes   Small / Medium / Large as [height, diameter] in cm.
 *         ⚠ PLACEHOLDERS. Nobody has measured real pieces yet -- replace every
 *         number here with actual measurements before quoting a customer. The
 *         3D model rescales itself to match, so only these numbers change.
 * name    translation key in i18n.js.
 * photos  image names in assets/img. Empty until there are photographs of
 *         Arpine's own work; the viewer simply shows no photo strip.
 * glaze   glaze selected by default.
 * model   procedural shape: `profile` is the outside silhouette as
 *         [radius, height] points from the centre of the foot up to the rim.
 *         `rings` (0-1) sets how visible the throwing rings are.
 *
 * art     optional painting for this piece, a file in assets/img. It is shown on
 *         the 3D form until a visitor uploads one of their own.
 *
 * The glazes below are grounds for painted work, so they are plain: the artwork
 * is what carries the colour.
 */
window.PIECES = {
  defaults: { size: 'm', flow: 25, tex: 20, luster: 55 },

  pieces: [
    {
      id: '01', name: 'work.plate', photos: [], glaze: 'ivory',
      sizes: { s: [2.2, 20], m: [2.6, 26], l: [3.0, 32] },
      model: { // wide shallow plate: broad painting surface, low rim
        profile: [[0, 0], [7, 0], [9.5, 0.25], [11.5, 0.9], [12.6, 1.9], [13, 2.6]],
        thick: 0.4, rings: 0.25
      }
    },
    {
      id: '02', name: 'work.mug', photos: [], glaze: 'porcelain',
      sizes: { s: [8, 7.5], m: [9.5, 8.5], l: [11, 9.5] },
      model: { // straight-walled mug, slight belly
        profile: [[0, 0], [3.6, 0], [3.9, 0.4], [4.25, 2.5], [4.3, 5], [4.15, 7.5], [4.25, 9.5]],
        thick: 0.45, rings: 0.35
      }
    },
    {
      id: '03', name: 'work.bowl', photos: [], glaze: 'teal',
      sizes: { s: [6, 13], m: [8, 17], l: [10, 21] },
      model: { // rounded bowl on a small foot
        profile: [[0, 0], [2.8, 0], [3.2, 0.4], [4.8, 1.4], [6.8, 3.2], [8, 5.4], [8.5, 8]],
        thick: 0.45, rings: 0.3
      }
    },
    {
      id: '04', name: 'work.vase', photos: [], glaze: 'terracotta',
      sizes: { s: [16, 9], m: [22, 12], l: [28, 15] },
      model: { // shouldered vase with a drawn-in neck
        profile: [[0, 0], [3.2, 0], [3.6, 0.5], [5, 3], [5.9, 7], [6, 11], [5.2, 15], [4.2, 18.5], [4, 20.5], [4.4, 22]],
        thick: 0.5, rings: 0.4
      }
    }
  ],

  // Plain grounds for painted work. a/b/c are the glaze's shading ramp, `clay`
  // the unglazed body, `speck` the speckle, `metal`/`rough`/`coat` the surface
  // response. Values are a starting point -- adjust against real fired pieces.
  glazes: [
    { id: 'ivory',      a: '#ddd3c1', b: '#efe8dc', c: '#c9b89b', clay: '#b98c63', speck: '#4c3a28', metal: 0,    rough: [0.62, 0.15], coat: 0.6 },
    { id: 'porcelain',  a: '#e8e6e1', b: '#fbfaf8', c: '#cfcac1', clay: '#c39a74', speck: '#5a5248', metal: 0,    rough: [0.45, 0.08], coat: 0.9 },
    { id: 'teal',       a: '#0a434b', b: '#17858b', c: '#63c6c2', clay: '#b98c63', speck: '#052428', metal: 0,    rough: [0.4,  0.05], coat: 1 },
    { id: 'terracotta', a: '#8a4522', b: '#b8663a', c: '#d99463', clay: '#96603c', speck: '#3a1c0d', metal: 0,    rough: [0.85, 0.45], coat: 0.2 },
    { id: 'graphite',   a: '#1c1916', b: '#3b322a', c: '#6b5540', clay: '#6f4a31', speck: '#0c0a08', metal: 0.35, rough: [0.7,  0.28], coat: 0 }
  ]
};
