import { ITransactionsRepository } from "../../business/repositories/ITransactionRepository";

export class TransactionRespository implements ITransactionsRepository {
    
    createTransaction(): Promise<any> {
        return Promise.resolve({ 
            commit: (id:string) => this.commit(id),
            rollback: (id:string) => this.rollback(id)
        })
    }
    
    create(transactionId: any): Promise<any> {
        return Promise.resolve({id: transactionId})
    }

    getBalance(accountId: string): Promise<number> {
        return Promise.resolve(6000000)
    }

    
    rollbackTransaction(transactionId: string): Promise<void> {
        return Promise.resolve()
    }

    private commit(id: string): Promise<string>{
        return new Promise((resolve, reject) => {
            resolve('execute commit')
        })
    }

    private rollback(id: string): Promise<string>{
        return new Promise((resolve, reject) => {
            resolve('execute rollback')
        })
    }

}