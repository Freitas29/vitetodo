import { createRouter, createWebHistory } from 'vue-router'
import Login from './views/Login.vue'
import Todo from './views/Todo.vue'

const routerHistory = createWebHistory()

const router = createRouter({
    history: routerHistory,
    routes:[
        {
            path: '/',
            component: Login
        },
        {
            path: '/todo',
            component: Todo
        }
    ]
})

export default router    
