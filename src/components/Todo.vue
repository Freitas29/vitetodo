<template>
  <div class="todo-wrapper" v-if="isValid">
      <input  @change="changeStatus" type="checkbox" :checked="handleCheck"/>
      <Input :class="{'check': todo.finished }" :value="todo.name" @keydown.delete="handleDelete" />
  </div>
</template>

<script>
import { computed, watchEffect, watch, reactive, toRefs } from 'vue'
import Input from './Input.vue'

export default {
    name: "Todo",
    components: {
        Input
    },
    props:{
        todo:{
            type: Object,
            default: () => {}
        }
    },
    setup({ todo }, { emit }){
        const isValid = computed(() => Object.keys(todo).length > 0)
        const handleCheck = computed(() => todo.finished)

        const changeStatus = () => {
            todo.finished = !todo.finished
            emit("updateTodo", todo)
        }

        const deleteTodo = () => {
            emit("deleteTodo", todo)
        }

        const isEmptyString = (value) => {
            return value.length === 0
        }

        const handleDelete = (event) => {
            const name = event.target.value

            if(isEmptyString(name)){
                deleteTodo()
            }
        }

        return {
            isValid,
            handleCheck,
            changeStatus,
            handleDelete
        }
    }
}
</script>

<style  scoped>
.todo-wrapper{
    display: flex;
    align-items: center;
    padding: 5px;
    width: 100%;
}

label {
    margin-left: 5px;
    font-weight: 600;
}

.check{
   text-decoration: line-through;
}
</style>