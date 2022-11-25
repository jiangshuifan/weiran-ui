
    export default [
      {path: "/", redirect: "/wrui"},
      {
        path:"/wrui",
        redirect: '/wrui/guide',
        component:()=>import("@/pages/wrui-home/wrui-home"),
        children:[
          {
            path:"/wrui/guide",
            component:()=>import("@/docs/guide.md")
          }
          ,
          {
      path:"/wrui/basic",
      redirect:"/wrui/basic/button",
      component:()=>import("@/components/wrui-middle-router.vue"),
      children:[
        {
      path:"button",
      component:()=>import('@/docs/button.md')
    }
    ,
{
      path:"container",
      component:()=>import('@/docs/container.md')
    }
    ,
{
      path:"icon",
      component:()=>import('@/docs/icon.md')
    }
    
      ],
    }  
    ,
{
      path:"/wrui/data",
      redirect:"/wrui/data/tree",
      component:()=>import("@/components/wrui-middle-router.vue"),
      children:[
        {
      path:"tree",
      component:()=>import('@/docs/tree.md')
    }
    ,
{
      path:"table",
      component:()=>import('@/docs/table.md')
    }
    ,
{
      path:"progress",
      component:()=>import('@/docs/progress.md')
    }
    ,
{
      path:"badge",
      component:()=>import('@/docs/badge.md')
    }
    ,
{
      path:"slider",
      component:()=>import('@/docs/slider.md')
    }
    
      ],
    }  
    ,
{
      path:"/wrui/form",
      redirect:"/wrui/form/input",
      component:()=>import("@/components/wrui-middle-router.vue"),
      children:[
        {
      path:"input",
      component:()=>import('@/docs/input.md')
    }
    ,
{
      path:"radio",
      component:()=>import('@/docs/radio.md')
    }
    ,
{
      path:"checkbox",
      component:()=>import('@/docs/checkbox.md')
    }
    ,
{
      path:"select",
      component:()=>import('@/docs/select.md')
    }
    ,
{
      path:"dropdown",
      component:()=>import('@/docs/dropdown.md')
    }
    
      ],
    }  
    ,
{
      path:"/wrui/notice",
      redirect:"/wrui/notice/message-box",
      component:()=>import("@/components/wrui-middle-router.vue"),
      children:[
        {
      path:"message-box",
      component:()=>import('@/docs/message-box.md')
    }
    ,
{
      path:"notify",
      component:()=>import('@/docs/notify.md')
    }
    ,
{
      path:"message",
      component:()=>import('@/docs/message.md')
    }
    
      ],
    }  
    
        ]
      },
      {
        path: '*', // 重定向页面地址
        redirect: '/404'
      },
      {
        path: '/404', 
        component:()=>import("@/pages/wrui-404/404"),
      }
    ]
  