import { TransactionData, TransactionChain } from "./TransactionChain";


export class ExecuteTransactionHandler extends TransactionChain {

    handle(request: TransactionData): any {
        
        request.status = 'executed'
        request.transactionData = {
            ...request.transactionData,
            createAt: new Date()
        }
        return super.handle(request);
    }
}