import { ITransactionsRepository } from "../../repositories/ITransactionRepository"
import { BalanceTransactionHandler } from "../../responsibility/transaction/BalanceTransactionHandler"
import { CreateTransactionHandler } from "../../responsibility/transaction/CreateTransactionHandler"
import { ExecuteTransactionHandler } from "../../responsibility/transaction/ExecuteTransactionHandler"
import { FeeTransactionHandler } from "../../responsibility/transaction/FeeTransactionHandler"
import { LimitPixTransferTransactionHandler } from "../../responsibility/transaction/pix/LimitPixTransferTransactionHandler"
import { PixTransactionHandler } from "../../responsibility/transaction/pix/PixTransactionHandler"
import { RollbackTransactionHandler } from "../../responsibility/transaction/RollbackTransactionHandler"

export class CreatePixTransferUseCase {

    constructor(private transactionRepository: ITransactionsRepository) {
    }

    async execute(request: any){
        // logic use case

        const transactionCreateHandler = new CreateTransactionHandler(this.transactionRepository)
        transactionCreateHandler
            .setNext(new BalanceTransactionHandler(this.transactionRepository))
            .setNext(new FeeTransactionHandler())
            .setNext(new LimitPixTransferTransactionHandler())
            .setNext(new PixTransactionHandler(this.transactionRepository))
            .setNext(new ExecuteTransactionHandler())
        const transactionPixResultChain = await transactionCreateHandler.handle(request)
        
        if(transactionPixResultChain.isLeft()){
            transactionCreateHandler.setNext(new RollbackTransactionHandler())
            transactionCreateHandler.handle(transactionPixResultChain.value.data)
            delete transactionPixResultChain.value.data
        }        
        return transactionPixResultChain
    }

}