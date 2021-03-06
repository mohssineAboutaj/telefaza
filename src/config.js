// localStorage keys
export const favListLocalStorageKey = "fav";
export const customsListLocalStorageKey = "customs";

// localStorage functions
/// getter
export function getLocal(key) {
  const d = window.localStorage.getItem(key);
  return d ? JSON.parse(d) : [];
}
/// setter
export function setLocal(key, data) {
  window.localStorage.setItem(key, JSON.stringify(data));
}
