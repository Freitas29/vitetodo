<template>
  <input
    :value="todo"
    @input="handleInput($event.target.value)"
    placeholder="Digite uma tarefa"/>
  
</template>

<script>
import { reactive, toRefs, watch } from 'vue'
export default {
  props: {
    todo: {
      type: String,
      default: ""
    }
  },
  setup(props, context){
    function handleInput(value){
      context.emit("update:todo", value)
    }

    return {
      handleInput
    }
  }
}
</script>

<style scoped>

input{
  width: 100%;
  padding: 5px 15px;
  font-size: 16px;
  border: none;
  background-color: transparent;
  cursor: text;
  color: #0d0d0d;
}

input:focus{
  border: none;
  outline: none;
  border-bottom: 1px solid #ddd;
}
</style>