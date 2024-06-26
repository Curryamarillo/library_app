<template>
  <input
    class="p-2 m-4 border rounded shadow-lg focus:outline-none focus:border-green-500 bg-white text-gray-700 placeholder-gray-400"
    :class="{ 'border-gray-300': !isActive, 'border-green-500': isActive }"
    :value="searchTerm"
    placeholder="Buscar libro por nombre"
    type="text"
    @input="handleSearchInput"
    @focus="isActive = true"
    @blur="isActive = false"
  />
</template>

<script setup lang="ts">
const props = defineProps({
  searchTerm: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['update:searchTerm']);
let isActive = false;

const handleSearchInput = (event: Event) => {
  const inputValue = (event.target as HTMLInputElement).value;
  emit('update:searchTerm', inputValue);
};
</script>

<style scoped>
/* Your styles here */
</style>
