import { CreateTransactionHandler } from "../../responsibility/transaction/CreateTransactionHandler"
import { ExecuteTransactionHandler } from "../../responsibility/transaction/ExecuteTransactionHandler"
import { LimitPixTransferTransactionHandler } from "../../responsibility/transaction/LimitPixTransferTransactionHandler"
import { PixTransactionHandler } from "../../responsibility/transaction/PixTransactionHandler"

export class CreatePixTransferUseCase {

    constructor() {
    }

    execute(request: any){
        // logic use case

        const transactionCreateHandler = new CreateTransactionHandler()
        transactionCreateHandler
            .setNext(new LimitPixTransferTransactionHandler())
            .setNext(new PixTransactionHandler())
            .setNext(new ExecuteTransactionHandler())
        let transactionPixResultChain = transactionCreateHandler.handle(request)

        // if(transactionPixResultChain.isLeft()){
        //     console.log(transactionPixResultChain.value);
        // }

        return transactionPixResultChain
    }

}