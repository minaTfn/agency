<template>
    <p>
        {{ msg }}
    </p>
</template>

<script>
    export default {
        name: "HelloWorld",
        props:{
            msg:{default:'Hello World'}
        }
    }
</script>

<style scoped>

</style>