/*
 * Interface strings for the Arpine Art ceramics site.
 *
 * Only the strings the scripts build themselves live here. The English text of
 * the page itself lives in index.html, and main.js snapshots it, so a key that
 * is missing here leaves the page's own wording untouched.
 *
 * ONLY ENGLISH IS TRANSLATED. The machinery for more languages is intact and
 * unchanged from the site this was derived from: add a language to `langs`
 * below and give its entries alongside `en`, e.g.
 *
 *     langs: { en: 'English', ar: 'العربية' },
 *     'cfg.send': { en: 'Send via', ar: '...' },
 *
 * and add the matching button in the language list in index.html. A key with no
 * entry for the chosen language falls back to English automatically, so a
 * half-finished translation degrades instead of breaking. No machine-made
 * translations are shipped here on purpose -- this is a shopfront, and wording
 * nobody has read should not go live.
 *
 * {name}, {n}, {piece} and friends are placeholders filled in by the site.
 */
window.I18N = {
  langs: { en: 'English' },
  t: {
    "cfg.approx": { en: "Sizes are placeholders and colours are a digital preview. Every piece is painted by hand." },
    "cfg.art": { en: "Artwork" },
    "cfg.artPick": { en: "Try a painting on it" },
    "cfg.artClear": { en: "Remove" },
    "cfg.artHint": { en: "Upload a painting to see it on the piece. It stays in your browser." },
    "cfg.artScale": { en: "Size" },
    "cfg.artRot": { en: "Rotation" },
    "cfg.artOwn": { en: "Arpine's painting" },
    "cfg.canvas": { en: "3D preview: {piece}, {size}, {glaze}. Use the arrow keys to rotate." },
    "cfg.cm": { en: "cm" },
    "cfg.copied": { en: "Message copied." },
    "cfg.copy": { en: "Copy message" },
    "cfg.copyFail": { en: "Couldn’t copy — please select the text and copy it." },
    "cfg.copyLink": { en: "Copy link to this design" },
    "cfg.dims": { en: "Show dimensions" },
    "cfg.flow": { en: "Glaze flow" },
    "cfg.full": { en: "Full screen" },
    "cfg.g.graphite": { en: "Graphite" },
    "cfg.g.ivory": { en: "Ivory" },
    "cfg.g.porcelain": { en: "Porcelain white" },
    "cfg.g.teal": { en: "Teal" },
    "cfg.g.terracotta": { en: "Terracotta" },
    "cfg.glaze": { en: "Ground" },
    "cfg.h": { en: "H" },
    "cfg.hint": { en: "Drag to rotate · scroll or pinch to zoom" },
    "cfg.label": { en: "3D configurator" },
    "cfg.linkCopied": { en: "Link copied." },
    "cfg.loading": { en: "Loading 3D…" },
    "cfg.luster": { en: "Sheen" },
    "cfg.m.ask": { en: "Could you tell me the price and when it could be ready?" },
    "cfg.m.glaze": { en: "Glaze: {glaze} (flow {flow}%, texture {tex}%, sheen {luster}%)" },
    "cfg.m.intro": { en: "Hello! I'd like to order a piece from the Arpine Art website:" },
    "cfg.m.link": { en: "My design: {link}" },
    "cfg.m.name": { en: "My name: {name}" },
    "cfg.m.note": { en: "Note: {note}" },
    "cfg.m.piece": { en: "{piece} (No. {n})" },
    "cfg.m.qty": { en: "Quantity: {qty}" },
    "cfg.m.size": { en: "Size: {size} — {dims}" },
    "cfg.m.subject": { en: "Order request: {piece} ({size})" },
    "cfg.msg": { en: "Your message" },
    "cfg.mug": { en: "Compare with a mug" },
    "cfg.mugLabel": { en: "Mug · 9.5 cm" },
    "cfg.name": { en: "Your name" },
    "cfg.no": { en: "No. {n}" },
    "cfg.noWebgl": { en: "3D preview isn’t available on this device — showing photos instead." },
    "cfg.note": { en: "Note" },
    "cfg.notePh": { en: "e.g. a gift, a preferred date…" },
    "cfg.optional": { en: "optional" },
    "cfg.pasteHint": { en: "Message copied — paste it into the chat." },
    "cfg.photo": { en: "Photo {n}" },
    "cfg.piece": { en: "Piece" },
    "cfg.price": { en: "Price on request" },
    "cfg.qty": { en: "Quantity" },
    "cfg.qtyDec": { en: "Decrease quantity" },
    "cfg.qtyInc": { en: "Increase quantity" },
    "cfg.reset": { en: "Reset view" },
    "cfg.send": { en: "Send via" },
    "cfg.size": { en: "Size" },
    "cfg.size.l": { en: "Large" },
    "cfg.size.m": { en: "Medium" },
    "cfg.size.s": { en: "Small" },
    "cfg.surface": { en: "Surface" },
    "cfg.tex": { en: "Texture" },
    "cfg.text": { en: "Turn a piece in 3D, compare three sizes and try other grounds. Your choices become a ready-to-send message." },
    "cfg.title": { en: "Make it <em>yours</em>" },
    "cfg.unique": { en: "Painted by hand in Dubai · every piece is one of a kind" },
    "cfg.view3d": { en: "View in 3D" },
    "cfg.views": { en: "Views" },
    "cfg.w": { en: "W" },
    "ch.email": { en: "Email" },
    "ch.phone": { en: "Call" },
    "fab.open": { en: "Contact" },
    "fab.title": { en: "Get in touch" },
    "lb.ask": { en: "Ask about this piece" },
    "lb.close": { en: "Close" },
    "lb.label": { en: "Image viewer" },
    "lb.next": { en: "Next image" },
    "lb.prev": { en: "Previous image" },
    "msg.hello": { en: "Hello! I'm writing from the Arpine Art website." },
    "msg.piece": { en: "Hello! I'm interested in “{name}” (No. {n}) from your website — could you tell me more about it?" },
    "msg.subjectHello": { en: "Hello from the website" },
    "msg.subjectPiece": { en: "About “{name}” (No. {n})" },
    "msg.subjectVisit": { en: "Studio visit" },
    "msg.visit": { en: "Hello! I'd like to book a studio visit.\nPreferred date: \nNumber of people: " },
    "ui.close": { en: "Close" },
    "ui.language": { en: "Language" },
    "ui.menu": { en: "Menu" },
    "ui.nav": { en: "Main" },
    "ui.skip": { en: "Skip to content" },
    "ui.themeDark": { en: "Switch to dark theme" },
    "ui.themeLight": { en: "Switch to light theme" },
    "visit.book": { en: "Book via" },
    "work.bowl": { en: "Bowl" },
    "work.mug": { en: "Mug" },
    "work.plate": { en: "Plate" },
    "work.vase": { en: "Vase" },
  }
};
