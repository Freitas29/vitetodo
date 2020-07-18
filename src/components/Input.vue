<template>
  <input
    :value="inputValue"
    @input="handleInput($event.target.value)"
    :placeholder="holder"/>
  
</template>

<script>
import { reactive, toRefs, watch } from 'vue'
export default {
  props: {
    inputValue: {
      type: String,
      default: ""
    },
    holder: {
      type: String,
      default: "Digite uma tarefa"
    }
  },
  setup(props, context){
    function handleInput(value){
      context.emit("update:inputValue", value)
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
}
</style>