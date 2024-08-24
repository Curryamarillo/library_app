<template>
  <div class="flex items-center h-screen bg-green-900">
    <div class="bg-green-200 p-8 rounded-lg shadow-lg w-full max-w-screen-lg m-2 sm:w-1/2">
      <h1 class="text-2xl font-semibold mb-6 text-center text-gray-800">Inicio de Sesión</h1>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div class="flex flex-col">
          <label for="email" class="text-sm mb-1 font-medium text-gray-700">Correo Electrónico:</label>
          <input type="email" id="email" v-model="email" required
            class="w-full rounded-md border border-gray-300 py-2 px-3 text-gray-700 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500">
        </div>
        <div class="flex flex-col">
          <label for="password" class="text-sm mb-1 font-medium text-gray-700">Contraseña:</label>
          <input type="password" id="password" v-model="password" required
            class="w-full rounded-md border border-gray-300 py-2 px-3 text-gray-700 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500">
        </div>
        <button type="submit"
          class="w-full inline-flex items-center justify-center px-4 py-2 rounded-md bg-green-500 text-white font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
          Iniciar Sesión
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { fetchLogin } from '~/apis/auth';


const email = ref('');
const password = ref('');
const store = useMyUserLoguedStore();
const emit = defineEmits(['login-success'])

const handleSubmit = async () => {
  console.log('Attempting login with:', email.value, password.value); 

  try {
    const response = await fetchLogin(email.value, password.value);
    if (response.isAuthenticated) {
      console.log('Usuario autenticado:', response.email);
      emit('login-success')
      await store.setUserByEmail(email.value);
      console.log('Datos del usuario guardados en el store:' +  store.user?.email);
    } else {
      console.log('Autenticación fallida');
      alert('Email o contraseña incorrectos');
    }
  } catch (error) {
    console.error('Error al intentar autenticar:', error);
    alert('Error al intentar autenticar');
  }
};
</script>

<style scoped>
</style>


