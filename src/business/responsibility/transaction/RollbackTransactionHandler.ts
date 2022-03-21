import { Either } from "../../../shared/Either";
import { TransactionData, TransactionChain, IErrorTransaction } from "./TransactionChain";


export class RollbackTransactionHandler extends TransactionChain {

    async handle(request: TransactionData): Promise<Either<IErrorTransaction, TransactionData>> {
        
        request.status = 'fail'
        await request.transactionData.dbTransaction.rollback()
        return super.handle(request);
    }
}