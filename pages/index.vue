<template>
    <div class="grid bg-green-900 sm:grid-cols-2 grid-cols-1">
      <img class="rounded-md mt-44 ml-20  shadow-md max-w-64 sm:block hidden" src="../assets/libro-verde.jpg" alt="libros">
      <LoginForm v-if="!isLoggedIn" @login-success="handleLoginSuccess"/>
      <LogguedComponent v-else/>
    </div>
  </template>
  
  <script setup lang="ts">
  import { onMounted, ref } from 'vue';

  
  const userStore = useMyUserLoguedStore();
 const isLoggedIn = computed(() => userStore.isLoggedIn);
  
  const handleLoginSuccess = () => {
    userStore.checkLoginStatus; 
    

  };
  
  onMounted(() => {
    userStore.checkLoginStatus(); 
  });
  </script>
  