/*
 * Contact details for the Arpine Art ceramics site.
 *
 * Every value starts empty ON PURPOSE. A channel's buttons appear across the
 * site as soon as you fill its value in, and stay hidden while it is "".
 * That means nothing points anywhere until these are real.
 *
 * Phone numbers can be written any way you like -- spaces and dashes are
 * ignored. They show up in:
 *   - the floating "Contact" button (bottom right)
 *   - "Ask about this piece" in the image viewer
 *   - the social icons in the footer and the mobile menu
 *   - "Send via" in the 3D configurator, with the composed order message
 */
window.SITE_CONFIG = {
  whatsapp: "",   // phone with country code, e.g. "+971 50 123 4567"
  telegram: "",   // username without @ works best; a phone number also works
  viber: "",      // phone with country code
  instagram: "",  // username or profile link
  facebook: "",   // page link
  email: "",
  phone: "",

  // mapQuery is searched on Google/Yandex Maps; paste exact place links to override.
  // While all three are empty the map links are hidden rather than pointed somewhere wrong.
  mapQuery: "",
  googleMaps: "",
  yandexMaps: ""
};
