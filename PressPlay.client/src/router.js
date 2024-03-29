import { createRouter, createWebHashHistory } from 'vue-router'
import { authGuard, authSettled } from '@bcwdev/auth0provider-client'

function loadPage(page) {
  return () => import(`./pages/${page}.vue`)
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: loadPage('HomePage'),
    beforeEnter: authSettled
  },
  {
    path: '/',
    name: 'Search',
    component: loadPage('SearchPage'),
    beforeEnter: authSettled
  },
  {
    path: '/about',
    name: 'About',
    component: loadPage('AboutPage')
  },
  {
    path: '/profile/:profileId',
    name: 'Profile',
    component: loadPage('ProfilePage'),
    beforeEnter: authSettled,
    children: [
      {
        path: 'originals',
        name: 'Profile.Originals',
        component: loadPage('ProfileOriginalsPage'),
        beforeEnter: authSettled
      },
      {
        path: 'contributions',
        name: 'Profile.Contributions',
        component: loadPage('ProfileContributionsPage'),
        beforeEnter: authSettled
      }
    ]
  },
  {
    path: '/project/:projectId',
    name: 'Project',
    component: loadPage('ProjectPage'),
    beforeEnter: authSettled,
    children: [
      {
        path: 'contributions',
        name: 'Project.Contributions',
        component: loadPage('ProjectContributionsPage'),
        beforeEnter: authSettled
      },
      {
        path: 'comments',
        name: 'Project.Comments',
        component: loadPage('ProjectCommentsPage'),
        beforeEnter: authSettled
      }
    ]
  },
  {
    path: '/account',
    name: 'Account',
    component: loadPage('AccountPage'),
    beforeEnter: authGuard
  }
]

export const router = createRouter({
  linkActiveClass: 'router-link-active',
  linkExactActiveClass: 'router-link-exact-active',
  history: createWebHashHistory(),
  routes
})
