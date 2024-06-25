<!-- Loan.vue -->
<template>
    <div class="m-4 border">
      <div class="p-4 border rounded-md shadow-lg bg-white flex flex-col">
        <h1>Id préstamo: {{ loan.id }}</h1>
        <h2 class="text-l font-bold">{{ loan.book.title }}</h2>
        <h4 class="text-gray-500 hidden md:block">Usuario: {{ loan.user.name }} {{ loan.user.surname }}</h4>
        <p class="text-gray-500">Fecha de préstamo: {{ formatDate(loan.loanDate) }}</p>
        <button class="bg-green-500 text-white px-4 py-1 mt-2 rounded-lg hover:bg-green-700 shadow-lg"
          @click="$emit('return')">
          Devolver
        </button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  
  interface Loan {
    id: number;
    bookId: number;
    userId: number;
    loanDate: Date | number[];
    returnDate: Date | null;
    book: {
      id: number;
      title: string;
      author: string;
      isbn: string;
      isAvailable: boolean;
    };
    user: {
      id: number;
      name: string;
      surname: string;
    };
  }
  
  const props = defineProps<{
    loan: Loan;
  }>();
  
  // Función para formatear la fecha
  function formatDate(loanDate: Date | number[]) {
    if (Array.isArray(loanDate)) {
      const [year, month, day, hours, minutes, seconds] = loanDate;
      if (seconds === 0) {
        return `${day}/${month}/${year}, ${hours}:${minutes}`;
      } else {
        return `${day}/${month}/${year}, ${hours}:${minutes}:${seconds}`;
      }
    }
    return (loanDate as Date).toLocaleString(); // Si es Date, usar el formato local por defecto
  }
  </script>
  

