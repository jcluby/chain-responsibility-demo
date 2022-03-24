import { Either } from "../../../../shared/Either";
import { ITransactionsRepository } from "../../../repositories/ITransactionRepository";
import { TransactionData, TransactionChain, IErrorTransaction } from "../TransactionChain";
import * as crypto from "crypto"

export class TevCreditTransactionHandler extends TransactionChain {

    constructor(private transactionRespository: ITransactionsRepository){
        super()
    }

    async handle(request: TransactionData): Promise<Either<IErrorTransaction, TransactionData>> {
        
        // TODO: create transaction entity
        
        const data = {
            transactionId: crypto.randomUUID(), // create in entity
            accountId: request.accountId,
            amount: request.amount,
            type: 'credit',
            ispbDestinyBank: 'bank'
        }
        
        request.data = data

        await this.transactionRespository.create(request.data.transactionId).catch(e => { console.log(e) })
        
        request.events.push(request.data)

        return super.handle(request);
    }

}