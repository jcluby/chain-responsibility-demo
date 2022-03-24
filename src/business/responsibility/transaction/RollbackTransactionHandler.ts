import { Either } from "../../../shared/Either";
import { TransactionData, TransactionChain, IErrorTransaction } from "./TransactionChain";


export class RollbackTransactionHandler extends TransactionChain {

    async handle(request: TransactionData): Promise<Either<IErrorTransaction, TransactionData>> {
        
        request.status = 'fail'
        
        const { transactionId } = request.data
        if(transactionId){
            await request.transactionDB.rollback(transactionId)
        }
        
        return super.handle(request);
    }
}