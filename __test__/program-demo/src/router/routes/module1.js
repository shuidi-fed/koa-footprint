import name from 'router/name'

export default [
  // module1
  {
    path: '/module1',
    meta: {
      title: 'module1'
    },
    component: () => import('components/someComp'),
    children: [
      {
        path: 'page1',
        name: name.module1page1,
        meta: {
          title: 'page1'
        },
        component: () => import('views/module1/page1')
      },
      {
        path: 'page2',
        name: name.module1page2,
        meta: {
          title: 'page2'
        },
        component: () => import('views/module1/page2')
      }
    ]
  }
]
