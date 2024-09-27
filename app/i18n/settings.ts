export const fallbackLng = "en";
export const cookieName = "i18next";
export const defaultNS = "translation";
export const languages = [fallbackLng, "es"];

export function getOptions(lng = fallbackLng, ns = defaultNS) {
  return {
    // debug: true,
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
}
