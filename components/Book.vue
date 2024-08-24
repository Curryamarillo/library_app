<template>
  <div class="m-4 p-4 border rounded-md shadow-lg bg-white flex flex-col">
    <h1 class="text-xl font-bold">{{ title }}</h1>
    <h2 class="text-lg text-gray-700">{{ author }}</h2>
    <h4 class="text-gray-500 hidden md:block">ISBN: {{ isbn }}</h4>
    <div class="flex justify-end mt-auto">
      <button :class="buttonClass" :disabled="!isAvailable" @click="opcionPrestar">{{ availabilityText }}</button>
      <button :class="buttonClassEdit" :disabled="!isAvailable" @click="opcionEditar">Editar</button>
      <button :class="buttonClassDelete" :disabled="!isAvailable" @click="opcionBorrar" >Eliminar</button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  id: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  isbn: {
    type: String,
    required: true,
  },
  isAvailable: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(['open-modal', 'open-edit', 'open-delete']);

const availabilityText = computed(() => (props.isAvailable ? 'Prestar' : 'Prestado'));

const buttonClass = computed(() =>
  props.isAvailable
    ? 'bg-green-500 text-white px-4 py-1 mt-2 mx-2 rounded-lg hover:bg-green-700 shadow-lg'
    : 'bg-gray-500 text-white mx-2 px-4 py-1 mt-2 rounded-lg cursor-not-allowed shadow-lg'
);

const buttonClassEdit = computed(() =>
  props.isAvailable ? 'bg-yellow-500 text-white px-4 py-1 mt-2 mx-2 rounded-lg hover:bg-green-700 shadow-lg' : 'hidden'
);
const buttonClassDelete = computed(() => 
  props.isAvailable ? 'bg-red-500 text-white px-4 py-1 mt-2 mx-2 rounded-lg hover:bg-green-700 shadow-lg' : 'hidden' );
  
const opcionPrestar = () => emit('open-modal');
const opcionEditar = () => emit('open-edit');
const opcionBorrar = () => emit('open-delete');
</script>

<style scoped>
/* Estilos específicos del componente Book.vue */
</style>
