import Vue from 'vue'
import VueRouter from 'vue-router'

import store from "@/store"
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [

  {
    path:"/",
    redirect:"/container"
  },
  {
    path:"/login",
    name:"login",
    component:()=>import("@/components/login")
  },
  {
    path:"/test",
    name:"test",
    component:()=>import('@/views/websocket.vue')
  },
  {
    path:"/container",
    name:"container",
    redirect:"/container/home",
    component:()=>import("@/components/container.vue"),
    children:[
      {
        path:'home',
        name: "home",
        component:()=>import("@/views/home.vue"),
        meta:{
          name :"home"
        }
      },
      {
        path:"announcement",
        name:"announcement",
        redirect: "/container/announcement/list",
        component:()=>import("@/views/announcement/index.vue"),
        children: [
          {
            path:"list",
            name:"announcementList",
            component:()=>import("@/views/announcement/list.vue"),
            meta:{
              name :"announcement"
            }
          },
          {
            path:"content/:id",
            name:"announcementContent",
            component:()=>import("@/views/announcement/content.vue"),
            meta:{
              name :"announcement"
            },
            props: true
          }
          
        ]
      }
      ,{
        path:"me",
        redirect:"/container/me/menu",
        name:"me",
        component:()=>import("@/views/me/index"),
        children:[
          {
            path:"menu",
            name:"menu",
            component:()=>import("@/views/me/menu"),
            meta:{
              permissions:["ROLE_USER"],
              name:"me"
            },
          }
        ]
      },{
        path:"parking",
        redirect:"/container/parking/map",
        name:"停车",
        component:()=>import("@/views/parking/index"),
        children:[
          {
            path:"map",
            name:"地图",
            component:()=>import("@/views/parking/map")
          }
        ]
      }

    ]
  }
  ,
  
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {

  // 先判断是否为登录，登录了才能获取到权限，怎么判断登录就不写了
  //console.log(localStorage.getItem("token"))
  //console.log(to.meta)
  if(to.meta.permissions==null || to.meta.permissions==undefined){
    
    next()
    return ;
  }
  
  if(localStorage.getItem("token")==null) {
    next("/login")
    return ;
  }

  let authorities = JSON.parse(localStorage.getItem("authorities"))
  const { permissions } = to.meta
  if (permissions) {
    const hasPermission =  !!permissions.find(permission => permission==authorities)
    if (!hasPermission) {
      console.log("没有对应的权限")
      next("/login")
      return ;
    }
  }
  next()
  return ;

})

export default router
