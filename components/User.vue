<template>
  <div class="m-4 rounded-md border">
    <div class="p-4 border rounded-md shadow-lg bg-white flex flex-col">
      <h1>Id: {{ id }}</h1>
      <h2 class="text-xl font-bold"> {{ name }} {{ surname }}</h2>
      <h4 class="text-gray-500 hidden md:block">Correo Electrónico: {{ email }}</h4>
      <h4>Es Administrador: {{ isAdminText }}</h4>
      <div class="flex gap-2 mt-2">
  <button class="bg-green-500 text-white w-1/2 p-1 rounded-lg hover:bg-green-700 shadow-lg"
    @click="editUserForm">Editar</button>
  <button class="bg-red-500 text-white w-1/2 p-1 rounded-lg hover:bg-red-700 shadow-lg"
    @click="deleteUser">Eliminar</button>
</div>
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

const emit = defineEmits(['edit-user-form', 'delete-user-form']);

const editUserForm = () => {
  emit('edit-user-form', props.id);
}
const deleteUser = () => {
  emit('delete-user-form', props.id)
}
</script>