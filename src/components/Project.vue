<template>
    <div class="projeto">
        <p>{{ name }}</p>
    </div>
</template>

<script>
export default {
    props: {
        name: {
            type: String,
            required: true
        },
        id: {
            type: String,
            required: true
        }
    }
}
</script>
<style scoped>

.projeto{
    background-color: #fff;
     box-shadow: 1px 2px 7px 1px #ddd;
    padding: 15px;
    font-size: 18px;
    font-weight: bold;
    text-align: left;
    border-radius: 5px;
    width: 100%;
    transition: all .5s;
    cursor: pointer;
}

.projeto:hover{
    transform: scale(1.1);
}
</style>