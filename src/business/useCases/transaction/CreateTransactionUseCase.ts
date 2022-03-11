import { CreateTransactionHandler } from "../../responsibility/transaction/CreateTransactionHandler"
import { ExecuteTransactionHandler } from "../../responsibility/transaction/ExecuteTransactionHandler"
import { FeeTransactionHandler } from "../../responsibility/transaction/FeeTransactionHandler"

export class CreateTransactionUseCase {

    constructor() {
    }

    execute(request: any){
        // logic use case

        const transactionCreateHandler = new CreateTransactionHandler()
        transactionCreateHandler
            .setNext(new FeeTransactionHandler())
            .setNext(new ExecuteTransactionHandler())
        let transactionResultChain = transactionCreateHandler.handle(request)        

        return transactionResultChain
    }

}