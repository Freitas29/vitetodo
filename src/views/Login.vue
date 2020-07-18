<template>
    <div class="wrapper">
        <form>
            <h1>Login</h1>

            <div class="form-body">

                <div class="form-group">
                    <Input type="email" v-model:inputValue="email" holder="Digite o seu e-mail"/>
                </div>
          
                <div class="form-group">
                    <Input type="password" v-model:inputValue="password" holder="Digite a sua senha"/>
                </div>
            </div>
            
            <div class="form-fotter">
                <button @click.prevent="handleSignIn">Press</button>
            </div>
        </form>
    </div>
</template>

<script>
import Input from '../components/Input.vue'
import { reactive, toRefs } from 'vue'

export default{
    name: "Login",
    components: {
        Input
    },
    setup(){
        const state = reactive({
            email: "",
            password: ""
        })

        const handleSignIn = () => {
            const { password, email } = state
            
            if(!isValid(password) && !isValid(email)){
                return
            }

            console.log("é valido")
        }

        const isValid = value => {
            const regex = new RegExp(/\S/g)
            return regex.test(value)
        }

        return { ...toRefs(state), handleSignIn }
    }
}
</script>

<style scoped>

    .wrapper{
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #F9FAFE;
    }

    form{
        background: #fff;
        width: 20%;
        height: 20vw;
        box-shadow: 1px 2px 7px 1px #ddd;
        display: grid;
        gap: 5%;
        align-content: flex-start;
        padding: 10px;
        border-radius: 5px;
    }

    .form-body{
        display: grid;
        grid-template-columns: 1fr;
        gap: 15%;
        align-content: center;
        height: 13vw;        
    }

    .form-fotter{
        display: flex;
    }

    input{
        font-size: 18px;
        padding: 0px;
    }

    form > h1{
        text-align: left;
    }

    form  button {
        background-color: #5C77CE;
        padding: 10px 20px;
        border: none;
        color: #fff;
        border-radius: 5px;
        outline: none;
        cursor: pointer;
        transition: all .3s;
    }
    form  button:hover{
        opacity: 0.7;
    }

    .form-group{
        margin: 10px 0px;
    }
</style>