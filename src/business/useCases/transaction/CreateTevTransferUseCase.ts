import { ITransactionsRepository } from "../../repositories/ITransactionRepository"
import { BalanceTransactionHandler } from "../../responsibility/transaction/BalanceTransactionHandler"
import { CreateTransactionHandler } from "../../responsibility/transaction/CreateTransactionHandler"
import { ExecuteTransactionHandler } from "../../responsibility/transaction/ExecuteTransactionHandler"
import { FeeTransactionHandler } from "../../responsibility/transaction/FeeTransactionHandler"
import { RollbackTransactionHandler } from "../../responsibility/transaction/RollbackTransactionHandler"
import { TevCreditTransactionHandler } from "../../responsibility/transaction/tev/TevCreditTransferTransactionHandler"
import { TevDebitTransactionHandler } from "../../responsibility/transaction/tev/TevDebitTransferTransactionHandler"

export class CreateTevTransferUseCase {

    constructor(private transactionRepository: ITransactionsRepository) {
    }

    async execute(request: any){
        // logic use case

        const transactionCreateHandler = new CreateTransactionHandler(this.transactionRepository)
        transactionCreateHandler
            .setNext(new BalanceTransactionHandler(this.transactionRepository))
            .setNext(new FeeTransactionHandler())
            .setNext(new TevDebitTransactionHandler(this.transactionRepository))
            .setNext(new TevCreditTransactionHandler(this.transactionRepository))
            .setNext(new ExecuteTransactionHandler())
        const transactionTevResultChain = await transactionCreateHandler.handle(request)
        
        if(transactionTevResultChain.isLeft()){
            transactionCreateHandler.setNext(new RollbackTransactionHandler())
            transactionCreateHandler.handle(transactionTevResultChain.value.data)
            delete transactionTevResultChain.value.data
        }
               
        return transactionTevResultChain
    }

}