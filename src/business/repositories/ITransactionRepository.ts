export interface IDatabaseTransaction {
    commit: () => Promise<void>
    rollback: () => Promise<void>
}
export interface ITransactionsRepository {
    createTransaction(): Promise<IDatabaseTransaction>
    create(data:any, transaction: any): Promise<any>
    rollbackTransaction (transactionId: string): Promise<void>
    getBalance(transactionId: string): Promise<number>
}