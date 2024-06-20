<template>
    <div class="grid grid-cols-1 mt-20">
      <template v-if="loans.length > 0">
        <div v-for="loan in loans" :key="loan.id" class="m-4 border">
          <div class="p-4 border rounded-md shadow-lg bg-white flex flex-col">
            <h1>Id préstamo: {{ loan.id }}</h1>
            <h2 class="text-l font-bold">{{ loan.book.title }}</h2>
            <h4 class="text-gray-500 hidden md:block">Usuario: {{ loan.user.name }} {{ loan.user.surname }}</h4>
            <p class="text-gray-500">Fecha de préstamo: {{ formatDate(loan.loanDate) }}</p>
            <button class="bg-green-500 text-white px-4 py-1 mt-2 rounded-lg hover:bg-green-700 shadow-lg"
                    @click="openReturnModal(loan.id)">
              Devolver
            </button>
          </div>
        </div>
      </template>
      <div v-else class="animate-ping">Cargando préstamos...</div>
  
      <!-- Modal para devolver libro (componente modal) -->
      <BookModal v-if="isReturnModalOpen"
                 :show="isReturnModalOpen"
                 :loan-id="selectedLoanId"
                 @close="closeReturnModal"
                 @return-book="handleReturnBook"
      />
    </div>
  </template>
  
  <script setup lang="ts">
  import { fetchLoans } from '@/apis/fetchLoans';
  import { fetchUserById } from '@/apis/fetchUserById';
  import { fetchBookById } from '@/apis/fetchBookById';
  
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
  
  const loans = ref<Loan[]>([]);
  const isReturnModalOpen = ref(false);
  const selectedLoanId = ref<number | null>(null);
  
  onMounted(async () => {
    try {
      const loansData = await fetchLoans();
      loans.value = await Promise.all(
        loansData.map(async (loan: Loan) => {
          const book = await fetchBookById(loan.bookId);
          const user = await fetchUserById(loan.userId);
          return {
            ...loan,
            book: {
              id: book.id,
              title: book.title,
              author: book.author,
              isbn: book.isbn,
              isAvailable: book.isAvailable
            },
            user: {
              id: user.id,
              name: user.name,
              surname: user.surname
            },
          };
        })
      );
    } catch (error) {
      console.error('Error fetching loans:', error);
    }
  });
  
  function openReturnModal(loanId: number) {
    selectedLoanId.value = loanId;
    isReturnModalOpen.value = true;
  }
  
  function closeReturnModal() {
    isReturnModalOpen.value = false;
  }
  
  function handleReturnBook() {
    closeReturnModal();
  }
  
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
  return loanDate.toLocaleString(); // Si es Date, usar el formato local por defecto
}
  </script>
  
  
 
  