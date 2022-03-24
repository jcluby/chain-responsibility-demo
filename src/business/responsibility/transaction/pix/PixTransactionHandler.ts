import { Either } from "../../../../shared/Either";
import { ITransactionsRepository } from "../../../repositories/ITransactionRepository";
import { IErrorTransaction, TransactionChain, TransactionData } from "../TransactionChain";
import * as crypto from "crypto"
export class PixTransactionHandler extends TransactionChain {


    constructor(private transactionRespository: ITransactionsRepository){
        super()
    }

    async handle(request: TransactionData): Promise<Either<IErrorTransaction, TransactionData>> {
        
        // TODO: create transaction entity

        const pixKey = this.getPIXByKey(request)
        request.data = {
            ...request.data,
            transactionId: crypto.randomUUID(), // create in entity
            accountId: request.accountId,
            pixKey: pixKey
        }
        await this.transactionRespository.create(request.data.transactionId)
        request.events.push(request.data)

        return super.handle(request);
    }

    private getPIXByKey(request: any): string{
        return '999999'
    }


}