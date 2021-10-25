// localStorage keys
export const favListLocalStorageKey = "fav";
export const customsListLocalStorageKey = "customs";

// localStorage functions
/// getter
export function getLocal(key) {
  // const d = localStorage.getItem(key);
  // return d ? JSON.parse(d) : [];
  return [];
}
/// setter
export function setLocal(key, data) {
  console.log(key, data);
  // localStorage.getItem(key, JSON.stringify(data));
}
