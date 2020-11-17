export default {
  path: '/film',
  component: () => import('@/views/film/film.vue'),
  children: [{
    // /film/nowplaying
    path: 'nowplaying',
    component: () => import('@/views/film/nowplaying.vue')
  },
  {
    path: 'comingsoon',
    component: () => import('@/views/film/comingsoon.vue')
  },
  {
    path: '/film',
    redirect: 'nowplaying'
  }
  ]
}