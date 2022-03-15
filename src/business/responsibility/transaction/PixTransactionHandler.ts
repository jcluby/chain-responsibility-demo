import { Either } from "../../../shared/Either";
import { IError } from "../../../shared/IError";
import { TransactionData, TransactionChain } from "./TransactionChain";


export class PixTransactionHandler extends TransactionChain {


    handle(request: TransactionData): Either<IError, TransactionData> {
        
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