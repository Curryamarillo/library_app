<template>
  <div class="grid grid-cols-1 pt-24">
    <template v-if="loans.length > 0">
      <template v-if="userAtStore.user?.isAdmin">
        <Loan v-for="loan in loans" :key="loan.id" :loan="loan" @return="openReturnModal(loan.id)" />
      </template>
      <template v-else>
        <Loan v-for="loan in filteredLoansForUser" :key="loan.id" :loan="loan" @return="openReturnModal(loan.id)" />
      </template>
    </template>
    <div v-else class="animate-ping">Cargando préstamos...</div>
    <BookModal v-if="isReturnModalOpen" :show="isReturnModalOpen" :bookName="bookName" :loan-id="selectedLoanId" @close="closeReturnModal"
      @return-book="handleReturnBook" />
  </div>
</template>

<script setup lang="ts">
import { fetchLoans } from '@/apis/fetchLoans';
import { fetchUserById } from '@/apis/fetchUsers';
import { fetchBookById } from '@/apis/fetchBooks';
import { type ILoan } from '~/types/ILoan';
import { useMyUserLoguedStore } from '#imports';


const loans = ref<ILoan[]>([]);
const isReturnModalOpen = ref(false);
const selectedLoanId = ref<number | null>(null);
const userAtStore = useMyUserLoguedStore();
const bookName = ref('');

const filteredLoansForUser = computed(() => {
  const user = userAtStore.user;

  if (!user) return [];
  if (user.isAdmin) return loans.value;

  return loans.value.filter(loan =>
    loan.user.name === user.name &&
    loan.user.surname === user.surname
  );
});

onMounted(async () => {
  try {
    const loansData = await fetchLoans();
    console.log('Fetched loans:', loansData);

    const filteredLoans = await Promise.all(
      loansData.map(async (loan: ILoan) => {
        const book = await fetchBookById(loan.bookId);
        const user = await fetchUserById(loan.userId);

        console.log('Fetched book:', book);
        console.log('Fetched user:', user);

        if (!book.isAvailable) {
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
        } else {
          return null;
        }
      })
    );

    console.log('Filtered loans:', filteredLoans);


    loans.value = filteredLoans.filter(loan => loan !== null) as ILoan[];
    console.log('Final loans list:', loans.value);
  } catch (error) {
    console.error('Error fetching loans:', error);
  }
});

function openReturnModal(loanId: number) {
  selectedLoanId.value = loanId;

  const selectedLoan = loans.value.find(loan => loan.id == loanId);

  if(selectedLoan) {
    bookName.value = selectedLoan.book.title;
    console.log("BookName: " + bookName.value)
  } else {
    console.error("Loan not found for the given id: " + loanId)
    return;
  }


  console.log("ID LOAN: " + loanId);
  console.log("Book name: " + bookName.value);
  isReturnModalOpen.value = true;
}

function closeReturnModal() {
  isReturnModalOpen.value = false;
}

function handleReturnBook() {
// TODO 

}
</script>
