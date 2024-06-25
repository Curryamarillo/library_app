export interface ILoan {
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