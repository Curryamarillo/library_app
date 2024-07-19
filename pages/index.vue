<template>
    <div class="grid bg-green-900 sm:grid-cols-2 grid-cols-1">
        <img class="rounded-md mt-24 ml-2 shadow-md max-w-sm max-h-sm sm:block hidden"
            src="../assets/libro-verde.jpg" alt="libros">
        <LoginForm v-if="!isLoggedIn" />
        <LogguedComponent v-else/>
    </div>
</template>

<script setup lang="ts">
const userStore = useMyUserLoguedStore();

const isLoggedIn = computed(() => userStore.user?.name)
</script>