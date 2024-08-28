<template>
  <div class="grid grid-cols-1 pt-24">
    <template v-if="loans.length > 0">
      <template v-if="userAtStore.user?.isAdmin">
        <Loan v-for="loan in loans" :key="loan.id" :loan="loan" @return="openReturnModal(loan.bookId)" />
      </template>
      <template v-else>
        <Loan v-for="loan in filteredLoansForUser" :key="loan.id" :loan="loan" @return="openReturnModal(loan.bookId)" />
      </template>
    </template>
    <div v-else class="animate-ping">Cargando préstamos...</div>
    <LoanModal
      v-if="isReturnModalOpen"
      :show="isReturnModalOpen"
      :bookName="bookName"
      :bookId="bookToReturnId!"
      @close="closeReturnModal"
      @return-book="handleReturnBook"
    />
  </div>
</template>

<script setup lang="ts">
import { fetchLoans } from '@/apis/fetchLoans';
import { fetchUserById } from '@/apis/fetchUsers';
import { fetchBookById } from '@/apis/fetchBooks';
import { type ILoan } from '~/types/ILoan';
import { useMyUserLoguedStore } from '#imports';
import { returnLoan } from '~/apis/associateBookUser';

const loans = ref<ILoan[]>([]);
const isReturnModalOpen = ref(false);
const bookToReturnId = ref<number | null>(null);
const userAtStore = useMyUserLoguedStore();
const bookName = ref('');

const filteredLoansForUser = computed(() => {
  const user = userAtStore.user;
  if (!user) return [];
  if (user.isAdmin) return loans.value;
  return loans.value.filter(loan => loan.user.name === user.name && loan.user.surname === user.surname);
});

onMounted(async () => {
  try {
    const loansData = await fetchLoans();
    const filteredLoans = await Promise.all(
      loansData.map(async (loan: ILoan) => {
        const book = await fetchBookById(loan.bookId);
        const user = await fetchUserById(loan.userId);
        if (!book.isAvailable) {
          return {
            ...loan,
            book: { id: book.id, title: book.title, author: book.author, isbn: book.isbn, isAvailable: book.isAvailable },
            user: { id: user.id, name: user.name, surname: user.surname },
          };
        } else {
          return null;
        }
      })
    );
    loans.value = filteredLoans.filter(loan => loan !== null) as ILoan[];
  } catch (error) {
    console.error('Error fetching loans:', error);
  }
});

function openReturnModal(bookId: number) {
  const selectedLoan = loans.value.find(loan => loan.book.id == bookId);
  if (selectedLoan) {
    bookToReturnId.value = bookId;
    bookName.value = selectedLoan.book.title;
    isReturnModalOpen.value = true;
  } else {
    console.error("Loan not found for the given bookId: " + bookId);
  }
}

function closeReturnModal() {
  isReturnModalOpen.value = false;
}

const handleReturnBook = async (bookId: number) => {
  try {
    const user = userAtStore.user;
    if (!user) {
      console.error("User not found in store");
      return;
    }
    await returnLoan(user.id, bookId);
    reloadLoans();
    closeReturnModal();
    // Opcionalmente, actualiza la lista de préstamos si es necesario
  } catch (error) {
    console.error("Error returning the book", error);
  }
};
async function reloadLoans() {
  try {
    const loansData = await fetchLoans();
    const filteredLoans = await Promise.all(
      loansData.map(async (loan: ILoan) => {
        const book = await fetchBookById(loan.bookId);
        const user = await fetchUserById(loan.userId);
        if (!book.isAvailable) {
          return {
            ...loan,
            book: { id: book.id, title: book.title, author: book.author, isbn: book.isbn, isAvailable: book.isAvailable },
            user: { id: user.id, name: user.name, surname: user.surname },
          };
        } else {
          return null;
        }
      })
    );
    loans.value = filteredLoans.filter(loan => loan !== null) as ILoan[];
  } catch (error) {
    console.error('Error reloading loans:', error);
  }
}
</script>
