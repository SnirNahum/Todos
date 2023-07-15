import HomePage from './pages/HomePage.js'
import AboutUs from './pages/AboutUs.js'
import TodosIndex from './pages/TodosIndex.js'

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
		}
	],
}

export const router = createRouter(routerOptions)
