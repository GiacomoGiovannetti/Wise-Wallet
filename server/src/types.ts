export type TransactionRequestType = {
  id?: string;
  transactionType: string;
  amount: number;
  description?: string;
  date: Date;
  userId: string;
  categoryId: string;
};

export type CategoryRequestType = {
  id: string;
  name: string;
  userId: string;
};
