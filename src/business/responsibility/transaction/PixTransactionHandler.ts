import { Either } from "../../../shared/Either";
import { TransactionData, TransactionChain, IErrorTransaction } from "./TransactionChain";


export class PixTransactionHandler extends TransactionChain {


    handle(request: TransactionData): Either<IErrorTransaction, TransactionData> | Promise<Either<IErrorTransaction, TransactionData>> {
        
        const pixKey = this.getPIXByKey(request)
        request.transactionData = {
            ...request.transactionData,
            pixKey: pixKey
        }
        return super.handle(request);
    }

    private getPIXByKey(request: any): string{
        return '999999'
    }


}