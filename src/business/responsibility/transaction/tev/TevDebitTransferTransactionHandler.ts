import { Either } from "../../../../shared/Either"
import { ITransactionsRepository } from "../../../repositories/ITransactionRepository"
import { IErrorTransaction, TransactionChain, TransactionData } from "../TransactionChain"
import * as crypto from "crypto"
export class TevDebitTransactionHandler extends TransactionChain {

    constructor(private transactionRespository: ITransactionsRepository){
        super()
    }

    async handle(request: TransactionData): Promise<Either<IErrorTransaction, TransactionData>> {

        // TODO: create transaction entity

        const account = await this.getAccountByNumber(request)
        const data = {
            transactionId: crypto.randomUUID(), // create in entity
            accountId: request.accountId,
            accountNumber: account.number,
            type: 'debit',
            amount: -request.amount,
            ispbDestinyBank: 'bank'
        }
        request.data = data

        await this.transactionRespository.create(request.data.transactionId).catch(e => { console.log(e) })
        request.events.push(request.data)

        return super.handle(request);
    }

    private async getAccountByNumber(request: any): Promise<any>{
        return Promise.resolve({number: 9999})
    }
}