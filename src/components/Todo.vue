<template>
  <div class="todo-wrapper" v-if="isValid">
      <input  @change="changeStatus" type="checkbox" :checked="handleCheck"/>
      <label :class="{'check': todo.status }">{{ todo.name }}</label>
  </div>
</template>

<script>
import { computed } from 'vue'
export default {
    name: "Todo",
    props:{
        todo:{
            type: Object,
            default: () => {}
        }
    },
    setup({ todo }){
        const isValid = computed(() => Object.keys(todo).length > 0)
        const handleCheck = computed(() => todo.status)

        const changeStatus = () => {
            todo.status = !todo.status
        }

        return {
            isValid,
            handleCheck,
            changeStatus
        }
    }
}
</script>

<style  scoped>
.todo-wrapper{
    display: flex;
    align-items: flex-start;
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