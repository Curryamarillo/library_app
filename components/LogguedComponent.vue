<template>
  <div class="flex items-center h-screen bg-green-900">
      <div class="bg-green-200 p-8 rounded-lg shadow-lg w-full max-w-screen-lg m-2 sm:w-1/2">
          <h1 class="text-2xl font-semibold mb-6 text-center text-gray-800">Sesión Iniciada</h1>
          <h2 class="text-l font-semibold mb-6 text-center text-gray-800">
              El Usuario es {{ userFullName }}
          </h2>
          <div class="text-l font-semibold mb-6 text-center text-gray-800">
              Tiene permisos de {{ isAdmin ? 'Administrador' : 'Usuario' }}
          </div>
      </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

const userFullName = ref('');
const isAdmin = ref(false);

const loadUserData = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  userFullName.value = user.name && user.surname ? `${user.name} ${user.surname}` : 'Usuario';
  isAdmin.value = user.isAdmin || false;
};

onMounted(() => {
  loadUserData(); 
});
</script>

<style scoped>

</style>
