export interface IDatabaseTransaction {
    commit: (id: string) => Promise<string>
    rollback: (id: string) => Promise<string>
}
export interface ITransactionsRepository {
    createTransaction(): Promise<IDatabaseTransaction>
    create(transactionId: string): Promise<string>
    getBalance(accountId: string): Promise<number>
}