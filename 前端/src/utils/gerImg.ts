export const getImg = (url:string) => {
  return new URL(`../assets/img/${url}.png`, import.meta.url).href
}