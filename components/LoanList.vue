<!-- LoanList.vue -->
<template>
  <div class="grid grid-cols-1 mt-20">
    <template v-if="loans.length > 0">
      <Loan v-for="loan in loans" :key="loan.id" :loan="loan" @return="openReturnModal(loan.id)" />
    </template>
    <div v-else class="animate-ping">Cargando préstamos...</div>

    <!-- Modal para devolver libro (componente modal) -->
    <BookModal v-if="isReturnModalOpen" :show="isReturnModalOpen" :loan-id="selectedLoanId" @close="closeReturnModal"
      @return-book="handleReturnBook" />
  </div>
</template>

<script setup lang="ts">
import { fetchLoans } from '@/apis/fetchLoans';
import { fetchUserById } from '@/apis/fetchUsers';
import { fetchBookById } from '@/apis/fetchBooks';
import { type ILoan } from '~/types/ILoan';



const loans:Ref<ILoan[]> = ref<ILoan[]>([]);
const isReturnModalOpen:Ref<boolean> = ref(false);
const selectedLoanId:Ref<number | null> = ref<number | null>(null);

onMounted(async () => {
  try {
    const loansData = await fetchLoans();
    loans.value = await Promise.all(
      loansData.map(async (loan: ILoan) => {
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
</script>