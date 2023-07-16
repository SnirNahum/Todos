import HomePage from './pages/HomePage.js'
import AboutUs from './pages/AboutUs.js'
import TodosIndex from './pages/TodosIndex.js'
import UserProfile from './pages/UserProfile.js'

const { createRouter, createWebHashHistory } = VueRouter

const routerOptions = {
	history: createWebHashHistory(),
	routes: [
		{
			path: '/',
			component: HomePage,
		},
		{
			path: '/about',
			component: AboutUs,
		},
		{
			path: '/todos',
			component: TodosIndex
		},
		{
			path: '/userProfile',
			component: UserProfile
		}
	],
}

export const router = createRouter(routerOptions)
