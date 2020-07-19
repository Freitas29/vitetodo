<template>
    <div class="wrapper">
        <div class="list-projects" v-if="hasProject">
            <Project 
                :name="project.title" 
                :id="project.id"
                v-for="project in projects"
                :key="project.id"
                @click="handleNavigation(project)"
            />
        </div>
        <div class="not-found" v-else>
            <p>Você não tem nenhum projeto criado</p>
        </div>
        <div class="wrapper-body">
            <Input v-model:inputValue="projectName" holder="Digite para criar um projeto" @keydown.enter="handleSaveProject" />
        </div>        
    </div>
</template>
<script>
import Project from '../components/Project.vue'
import { onMounted, reactive, toRefs, computed } from 'vue'
import api from '../services/api'
import Input from '../components/Input.vue'
import { isEmptyString, getToken } from '../utils/utils.js'
import { useRouter } from 'vue-router'

export default {
    name: "ListProjects",
    components: {
        Project,
        Input
    },
    setup(){

        const state = reactive({
            projectName: "",
            projects: []
        })

        const router = useRouter()


        const handleNavigation = ({ id }) => {
            router.push({ path: `/todo/${id}`})
        }
       
        const hasProject = computed(() => state.projects.length !== 0)

        const getProjects = async () => {
            const token = getToken()

            const { data }  = await api.get("/projects", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })

            return data.data
        }

        const handleSaveProject = () => {
            const { projectName } = state
            if(isEmptyString(projectName)){
                return
            }

            saveProject(projectName)
        }

        const saveProject = (projectName) => {
            const token = getToken()
            const { data, status } = api.post("/projects", {
                project:{
                    title: projectName
                }
            }, {
                headers:{
                    "Authorization": `Bearer ${token}`
                }
            })

            if(status === 200){
                console.log(data)
            }
        }

        onMounted(async () => {
            const projects = await getProjects()
            state.projects = projects
        })

        return {
        ...toRefs(state),
         hasProject,
        handleSaveProject,
        handleNavigation}
    }
}
</script>

<style scoped>
.wrapper{
    min-height: 100vh;
    display: grid;
    align-content: center;
    justify-content: center;
    width: 100%;
    gap: 5%;
    background-color: #F9FAFE;
}

.list-projects{
    display: grid;
    grid-template-rows: 1fr;
    gap: 10%;
    width: 100%;
    position: relative;
    height: 20vw;
    max-height: 20vw;
}

.not-found{
    font-weight: bold;
    font-size: 22px;
    text-align: center;
}

input{
    position: relative;
}
</style>