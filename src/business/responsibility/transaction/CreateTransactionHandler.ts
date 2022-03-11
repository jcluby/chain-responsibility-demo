import { TransactionData, TransactionChain } from "./TransactionChain";


export class CreateTransactionHandler extends TransactionChain {

    handle(request: TransactionData): any {
        request.status = 'create'
        request.transactionData = {
            ...request.transactionData,
            id: '123'
        }
        return super.handle(request);
    }
}