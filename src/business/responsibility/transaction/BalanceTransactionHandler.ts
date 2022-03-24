import { Either, left } from "../../../shared/Either";
import { ITransactionsRepository } from "../../repositories/ITransactionRepository";
import { TransactionData, TransactionChain, IErrorTransaction } from "./TransactionChain";


export class BalanceTransactionHandler extends TransactionChain {

    constructor(private transactionRespository: ITransactionsRepository){
        super()
    }

    async handle(request: TransactionData): Promise<Either<IErrorTransaction, TransactionData>> {
    
        const balance = await this.transactionRespository.getBalance(request.accountId)
        request.balance = balance
        if(balance < request.amount){
            request.status = 'fail'
            return left({
                code: '12',
                message: 'Insufficient balance',
                shortMessage: 'Insufficient balance',
                data: request
            })
        }

        return super.handle(request);
    }

}