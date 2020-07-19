<template>
  <main>
    <div class="content">
      <Todo
        @deleteTodo="handleDeleteTodo(todo)"
        v-for="(todo, index) in todos"
        :key="todo.id || todo.name + index"
        :todo="todo"
      />
      <Input v-model:inputValue="todo" @keydown.enter="handleSaveTodo"/>
    </div>
  </main>
</template>

<script>
import Input from '../components/Input.vue'
import Todo from '../components/Todo.vue'
import { reactive, toRefs, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import api from '../services/api'
import { getToken } from '../utils/utils'

export default {
  name: 'App',
  components: {
    Input,
    Todo
  },

  setup(props, { emit, attrs }){
    const state = reactive({
      todos: [],
      todo: ""
    })

    const route = useRoute()
    
    onMounted(async () => {
        const { id } = route.params
        const todos = await getTodos(id)
        console.log(todos)
        state.todos = todos
    })

    const getTodos = async id => {
        const token = getToken()
        const { data } = await api.get(`/projects/${id}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })

        return data.todos
    }

    const saveTodo = (todo) => {
        const token = getToken()
        const { id } = route.params
        
        requestSaveTodo(id, todo)
    }

    const requestSaveTodo = (projectId, name) => {
        const token = getToken()
        api.post("/todos", {
            todo: {
                project_id: projectId,
                name
            }
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }

    function handleSaveTodo(event){
      const { todo, todos } = state
      
      todos.push({
        name: todo,
        finished: false
      })

      saveTodo(todo)

      clearInput()
    }

    const hasTodo = (todos, deleted) => {
      if(typeof deleted == "undefined") return false

      const size = todos.find(todo => todo.name === deleted.name)

      return typeof size === "object"
    }

    const findTodo = (todos, deletedTodo) => {
      const todo = todos.find(todo => todo.name === deletedTodo.name)
      return todo ?? deletedTodo
    }

    const updatedTodos = (todos, deleted) => {
      if(!hasTodo(todos,deleted)){
        return todos
      }

      return todos.filter(todo => todo.name !== deleted.name)
    }

    const handleDeleteTodo = (deletedTodo) => {
      let { todos }  = state
      const deleted = findTodo(todos, deletedTodo)
      state.todos = updatedTodos(todos, deleted)
    }

    function clearInput(){
      state.todo = ""
    }


    return {...toRefs(state), handleSaveTodo, handleDeleteTodo}
  }
}
</script>
<style>
main{
  background-color: #f5f5f5;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
}
.content{
  width: 40%;
}
</style>
