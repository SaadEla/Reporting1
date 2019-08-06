import Vue from 'vue'
import Router from 'vue-router'
import Mesrapports from './views/Mesrapports.vue'
import Modeles from './views/ModelesPlanification.vue'
import rappinstform from './views/rappinstantaneform.vue'
import rappinst from './views/rappinstantane.vue'
import visualiserap from './views/visualiserapport.vue'
import test from './views/test.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Mesrapports
    },
    {
      path: '/modeles',
      name: 'modeles',
      component: Modeles
    },
    {
      path: '/rappinstform',
      name: 'rappinstform',
      component: rappinstform
    },
    {
      path: '/rappinst',
      name: 'rappinst',
      component: rappinst
    },
    {
      path: '/visrap/:id',
      name: 'visrap',
      component: visualiserap
    },


  ]
})
