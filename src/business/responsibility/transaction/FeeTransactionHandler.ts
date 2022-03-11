import { TransactionData, TransactionChain } from "./TransactionChain";


export class FeeTransactionHandler extends TransactionChain {


    handle(request: TransactionData): any {
        
        const fee = this.calculateFee(request.category)
        request.transactionData = {
            ...request.transactionData,
            fee: fee
        }
        return super.handle(request);
    }


    // call service calc fee
    private calculateFee(category: string): number{
        const operation: any = {
            'TED': 4,
            'PIX': 0
        }
        return operation[category]
    }


}