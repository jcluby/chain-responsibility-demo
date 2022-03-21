import { Either } from "../../../shared/Either";
import { ITransactionsRepository } from "../../repositories/ITransactionRepository";
import { TransactionData, TransactionChain, IErrorTransaction } from "./TransactionChain";


export class TevDebitTransactionHandler extends TransactionChain {

    constructor(private transactionRespository: ITransactionsRepository){
        super()
    }

    async handle(request: TransactionData): Promise<Either<IErrorTransaction, TransactionData>> {


        const account = await this.getAccountByNumber(request)
        const data = {
            dbTransaction: request.transactionData.dbTransaction,
            accountNumber: account.number,
            type: 'debit',
            amount: -request.amount,
            ispbDestinyBank: 'bank'
        }
        request.transactionData = data

        await this.transactionRespository.create(request.transactionData, request.transactionData.dbTransaction)

        return super.handle(request);
    }

    private async getAccountByNumber(request: any): Promise<any>{
        return Promise.resolve({number: 9999})
    }
}