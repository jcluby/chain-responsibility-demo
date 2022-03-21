import { Either } from "../../../shared/Either";
import { ITransactionsRepository } from "../../repositories/ITransactionRepository";
import { TransactionData, TransactionChain, IErrorTransaction } from "./TransactionChain";


export class CreateTransactionHandler extends TransactionChain {

    constructor(private transactionRespository: ITransactionsRepository){
        super()
    }

    async handle(request: TransactionData): Promise<Either<IErrorTransaction, TransactionData>> {
        request.status = 'create'
        const dbTransaction = await this.transactionRespository.createTransaction()
        const data = {
            dbTransaction,
            id: '123'
        }
        request.transactionData = data
        
        return super.handle(request);
    }
}