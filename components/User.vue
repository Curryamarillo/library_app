<template>
    <div class="m-4 border">
      <div class="p-4 border rounded-md shadow-lg bg-white flex flex-col">
        <h1>Id: {{ id }}</h1>
        <h2 class="text-l font-bold"> {{ name }} {{ surname }}</h2>
        <h4 class="text-gray-500 hidden md:block">Correo Electrónico: {{ email }}</h4>
        <h4>Es Administrador: {{ isAdminText }}</h4>
        <button class="bg-green-500 text-white px-4 py-1 mt-2 rounded-lg hover:bg-green-700 shadow-lg" @click="editUserForm">Editar</button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
 
  const props = defineProps({
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
    },
  });
  
  const isAdminText = computed(() => (props.isAdmin ? 'Si' : 'No'));
  
  const emit = defineEmits(['editUserForm'])
  
  const editUserForm = () => {
    emit('editUserForm', props.id);
  }
  </script>
  