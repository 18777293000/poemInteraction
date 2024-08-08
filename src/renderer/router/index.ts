import { MainScreen } from '@/renderer/screens'
import { createRouter, createWebHashHistory } from 'vue-router'
import { useCounterStore } from '@/renderer/store/counter'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: MainScreen,
      meta: {
        titleKey: 'title.main'
      }
    },
    {
      path: '/second',
      component: () => import('@/renderer/screens/SecondScreen.vue'),
      meta: {
        titleKey: 'title.second'
      }
    },
    {
      path: '/shici',
      component: () => import('@/renderer/screens/game/ShiciScreen.vue'),
      meta: {
        titleKey: 'Shici Screen'
      }
    },
    {
      path: '/feihua',
      component: () => import('@/renderer/screens/game/FeihuaScreen.vue'),
      meta: {
        titleKey: 'Feihua Screen'
      }
    },
    {
      path: '/jielong',
      component: () => import('@/renderer/screens/game/JielongScreen.vue'),
      meta: {
        titleKey: 'Jielong Screen'
      }
    },
    {
      path: '/reword',
      component: ()=>import('@/renderer/screens/RewordScreen.vue'),
      meta: {
        titleKey: 'Reword Screen'
      }
    },
    {
      path: '/error',
      component: () => import('@/renderer/screens/ErrorScreen.vue'),
      meta: {
        titleKey: 'title.error'
      }
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
})

router.beforeEach((to, next) => {
  const paths = ['/feihua', '/jielong']
  if (paths.includes(to.path)) {
    useCounterStore().setloginDialogVisible()
  }
})

export default router
