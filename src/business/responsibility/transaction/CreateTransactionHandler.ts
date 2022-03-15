import { Either } from "../../../shared/Either";
import { IError } from "../../../shared/IError";
import { TransactionData, TransactionChain } from "./TransactionChain";


export class CreateTransactionHandler extends TransactionChain {

    handle(request: TransactionData): Either<IError, TransactionData> {
        request.status = 'create'
        request.transactionData = {
            ...request.transactionData,
            id: '123'
        }
        return super.handle(request);
    }
}