<template>
    <div v-if="show" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div class="bg-red-800 p-8 rounded-lg shadow-lg w-full md:w-96">
        <h1 class="text-3xl text-white font-semibold mb-4">Borrar Usuario</h1>
        <div class="mb-4">
          <p class="text-xl text-white">Usuario: <span class="font-semibold text-2xl">{{ props.user?.name }}</span></p>
          <p class="text-xl text-white">Apellido: <span class="font-semibold text-2xl">{{ props.user?.surname }}</span></p>
          <p class="text-xl text-white">Correo electrónico: <span class="font-semibold text-2xl whitespace-nowrap">{{ props.user?.email }}</span></p>
        </div>
        <div class="flex justify-end">
          <button @click="confirmDelete" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">Confirmar Borrado</button>
          <button @click="close" class="ml-4 bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400">Cancelar</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import type { IUser } from '~/types/IUser';
   
  const props = defineProps({
    show: {
      type: Boolean,
      required: true
    },
    user: {
      type: Object as () => IUser | null,
      required: true
    }
  });
  
  const emit = defineEmits(['close', 'delete']);
  
  const confirmDelete = () => {
    if (window.confirm('¿Estás seguro que deseas borrar este usuario?')) {
      emit('delete', props.user);
      close(); // Cerrar el formulario después del borrado
    }
  };
  
  const close = () => {
    emit('close');
  };
  </script>
  
  <style scoped>
  </style>
  