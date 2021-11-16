
// AMap.js
// 高德map   https://webapi.amap.com/maps?v=1.4.11&key=你的高德地图的key
export default function MapLoader() {
  return new Promise((resolve, reject) => {
    window.initAMap = () => {
      resolve(window.AMap)
    }
    if (window.AMap) {
      resolve(window.AMap)
    } else {
      var script = document.createElement('script')
      script.type = 'text/javascript'
      script.async = true
      script.src =
        'http://webapi.amap.com/maps?v=1.4.11&callback=initAMap&key=3e96b769e47f68fd80d4233603ea2393'
      script.onerror = reject
      document.querySelector("html").appendChild(script)
      //console.log(document.querySelector("html"))
      //document.head.appendChild(script)
    }

  })
}
