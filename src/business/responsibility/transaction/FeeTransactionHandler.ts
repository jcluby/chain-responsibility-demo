import { Either } from "../../../shared/Either";
import { TransactionData, TransactionChain, IErrorTransaction } from "./TransactionChain";


export class FeeTransactionHandler extends TransactionChain {


    handle(request: TransactionData): Either<IErrorTransaction, TransactionData> | Promise<Either<IErrorTransaction, TransactionData>> {
        
        const fee = this.calculateFee(request.category)
        request.data = {
            ...request.data,
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