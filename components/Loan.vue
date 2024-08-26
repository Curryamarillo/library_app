<!-- Loan.vue -->
<template>
    <div class="m-4 border rounded-md">
      <div class="p-4 border rounded-md shadow-lg bg-white flex flex-col">
        <h1>Id préstamo: {{ loan.id }}</h1>
        <h2 class="text-xl font-bold">{{ loan.book.title }}</h2>
        <h2 class="text-gray-700  md:block">Usuario: {{ loan.user.name }} {{ loan.user.surname }}</h2>
        <p class="text-gray-700">Fecha de préstamo: {{ formatDate(loan.loanDate) }}</p>
        <button class="bg-green-500 text-white px-4 py-1 mt-2 rounded-lg hover:bg-green-700 shadow-lg"
          @click="$emit('return')">
          Devolver
        </button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { type ILoan } from '~/types/ILoan';
  import { formatDate } from '~/utils/formatDate';
  const props = defineProps<{
    loan: ILoan;
  }>();
  
  
  </script>
  

