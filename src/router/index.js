import Vue from 'vue'
import VueRouter from 'vue-router'
import Agency from '../views/agency/index.vue'
import User from '../views/user/index.vue'
import Goal from '../views/goal/index.vue'
import GoalProfile from '../views/goal/goal-profile/index.vue'
import Quarter from '../views/quarter/index.vue'
import AgencyOverviewReport from '../views/reports/agencyOverview.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/agencies',
    name: 'Agencies',
    component: Agency
  },
  {
    path: '/goals',
    name: 'Goals',
    component: Goal
  },
  {
    path: '/goals/goal-profiles',
    name: 'Goal Profiles',
    component: GoalProfile
  },
  {
    path: '/report/agency-overview',
    name: 'Agency Overview',
    component: AgencyOverviewReport
  },
  {
    path: '/quarters',
    name: 'Quarters',
    component: Quarter
  },
  {
    path: '/users',
    name: 'Users',
    component: User
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/user/index.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
