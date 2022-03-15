import { Either } from "../../../shared/Either";
import { IError } from "../../../shared/IError";
import { TransactionData, TransactionChain } from "./TransactionChain";


export class ExecuteTransactionHandler extends TransactionChain {

    handle(request: TransactionData): Either<IError, TransactionData> {
        
        request.status = 'executed'
        request.transactionData = {
            ...request.transactionData,
            createAt: new Date()
        }
        return super.handle(request);
    }
}