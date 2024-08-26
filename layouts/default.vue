<template>
    <div class="bg-green-900">
    <Navbar v-if="userStore.isLoggedIn"/>
    <NuxtPage />
</div>
</template>

<script setup lang="ts">
const userStore = useMyUserLoguedStore();

onMounted(() => {
    userStore.checkLoginStatus();
})

</script>