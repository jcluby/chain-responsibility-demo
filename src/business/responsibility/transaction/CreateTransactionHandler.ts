import { Either } from "../../../shared/Either";
import { ITransactionsRepository } from "../../repositories/ITransactionRepository";
import { TransactionData, TransactionChain, IErrorTransaction } from "./TransactionChain";
import * as crypto from "crypto"
export class CreateTransactionHandler extends TransactionChain {

    constructor(private transactionRespository: ITransactionsRepository){
        super()
    }

    async handle(request: TransactionData): Promise<Either<IErrorTransaction, TransactionData>> {
        request.processId = crypto.randomUUID(),
        request.status = 'create'
        const transaction = await this.transactionRespository.createTransaction()
        request.transactionDB = transaction
        request.data = {}
        request.events = []
        
        return super.handle(request);
    }
}