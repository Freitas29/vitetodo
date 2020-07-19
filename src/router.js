import { createRouter, createWebHistory } from 'vue-router'
import Login from './views/Login.vue'
import Todo from './views/Todo.vue'
import Projects from './views/Projects.vue'

const routerHistory = createWebHistory()

const router = createRouter({
    history: routerHistory,
    routes:[
        {
            path: '/',
            component: Login
        },
        {
            path: '/projects',
            component: Projects
        },
        {
            path: '/todo/:id',
            component: Todo
        }
    ]
})

export default router    
