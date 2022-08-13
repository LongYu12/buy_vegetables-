
export const directive_onerror = function (app:any) {
  // 图片指令检测图片加载
  app.directive('onerror', {
    mounted: (el:any, binding:object) => {
      let img = new URL('../assets/img/0.png', import.meta.url).href  
      const url =  binding['value'] 
      if ( url ) {
        if (url.includes('http') || url.includes('https')) {
          img = url
        } else {
          img = new URL(`../assets/img/${url}`, import.meta.url).href 
        }
      }
      el.onerror = () => {
        el.src = img
      }
      if (!el.src) {
        el.src = img
        return
      }
    }
  })

}
 