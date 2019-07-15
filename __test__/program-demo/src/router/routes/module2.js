import name from 'router/name'

export default [
  // module2
  {
    path: '/module2',
    meta: {
      title: 'module2'
    },
    component: () => import('components/someComp'),
    children: [
      {
        path: 'page1',
        name: name.module2page1,
        meta: {
          title: 'page1'
        },
        component: () => import('views/module2/page1')
      },
      {
        path: 'page2',
        name: name.module2page2,
        meta: {
          title: 'page2'
        },
        component: () => import('views/module2/page2')
      }
    ]
  }
]
