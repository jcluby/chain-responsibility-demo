import { Either } from "../../../shared/Either";
import { ITransactionsRepository } from "../../repositories/ITransactionRepository";
import { TransactionData, TransactionChain, IErrorTransaction } from "./TransactionChain";


export class TevCreditTransactionHandler extends TransactionChain {

    constructor(private transactionRespository: ITransactionsRepository){
        super()
    }

    async handle(request: TransactionData): Promise<Either<IErrorTransaction, TransactionData>> {
        
        const data = {
            dbTransaction: request.transactionData.dbTransaction,
            amount: request.amount,
            type: 'credit',
            ispbDestinyBank: 'bank'
        }
        
        request.transactionData = data

        await this.transactionRespository.create(request.transactionData, request.transactionData.dbTransaction)

        return super.handle(request);
    }

}