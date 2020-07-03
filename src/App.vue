<template>
  <main>
    <div class="content">
      <Todo
        @deleteTodo="handleDeleteTodo"
        v-for="(todo, index) in todos"
        :key="index"
        :todo="todo"
      />
      <Input v-model:todo="todo" @keydown.enter="handleSaveTodo"/>
    </div>
  </main>
</template>

<script>
import Input from './components/Input.vue'
import Todo from './components/Todo.vue'
import { reactive, toRefs, onMounted, watch } from 'vue'

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

    function handleSaveTodo(event){
      const { todo, todos } = state
      
      todos.push({
        name: todo,
        finished: false
      })

      clearInput()
    }

    const hasTodo = (deleted) => {
      if(typeof deleted == "undefined") return false

      const { todos } = state

      const size = todos.find(todo => todo.name === deleted.name)

      return typeof size === "object"
    }

    const findTodo = (deletedTodo) => {
      const { todos } = state
      const todo = todos.find(todo => todo.name === deletedTodo.name)
      return todo ?? deletedTodo
    }

    const updatedTodos = (deleted) => {
      const { todos } = state
      
      debugger  
      if(!hasTodo(deleted)){
        return todos
      }

      return todos.filter(todo => todo.name !== deleted.name)
    }

    const handleDeleteTodo = (deletedTodo) => {
      const deleted = findTodo(deletedTodo)
      state.todos = updatedTodos(deleted)
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
