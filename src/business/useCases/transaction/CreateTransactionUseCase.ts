import { ITransactionsRepository } from "../../repositories/ITransactionRepository"
import { CreateTransactionHandler } from "../../responsibility/transaction/CreateTransactionHandler"
import { ExecuteTransactionHandler } from "../../responsibility/transaction/ExecuteTransactionHandler"
import { FeeTransactionHandler } from "../../responsibility/transaction/FeeTransactionHandler"
import { RollbackTransactionHandler } from "../../responsibility/transaction/RollbackTransactionHandler"

export class CreateTransactionUseCase {

    constructor(private transactionRepository: ITransactionsRepository) {
    }

   async execute(request: any){
        // logic use case

        const transactionCreateHandler = new CreateTransactionHandler(this.transactionRepository)
        transactionCreateHandler
            .setNext(new FeeTransactionHandler())
            .setNext(new ExecuteTransactionHandler())
        let transactionResultChain = await transactionCreateHandler.handle(request)   

        if(transactionResultChain.isLeft()){
            transactionCreateHandler.setNext(new RollbackTransactionHandler())
            transactionCreateHandler.handle(transactionResultChain.value.data)
            delete transactionResultChain.value.data
        }    
        return transactionResultChain
    }

}