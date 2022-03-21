import { ITransactionsRepository } from "../../business/repositories/ITransactionRepository";

export class TransactionRespository implements ITransactionsRepository {
    
    createTransaction(): Promise<any> {
        return Promise.resolve({ 
            commit: () => Promise.resolve('commit execute'),
            rollback: () => Promise.resolve('rollback execute')
        })
    }
    
    create(data:any, transaction: any): Promise<any> {
        return Promise.resolve({id: '123'})
    }

    getBalance(transactionId: string): Promise<number> {
        return Promise.resolve(6000000)
    }

    
    rollbackTransaction(transactionId: string): Promise<void> {
        return Promise.resolve()
    }

}