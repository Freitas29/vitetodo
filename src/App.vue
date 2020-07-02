<template>
  <main>
    <div class="content">
      <Todo
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

  setup(props, context){
    const state = reactive({
      todos: [{}],
      todo: ""
    })


    function handleSaveTodo(event){
      const { todo } = state
      
      state.todos.push({
        name: todo,
        finished: false
      })

      clearInput()
    }

    function clearInput(){
      state.todo = ""
    }


    return {...toRefs(state), handleSaveTodo}
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
