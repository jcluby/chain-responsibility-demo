import { Either } from "../../../shared/Either";
import { TransactionData, TransactionChain, IErrorTransaction } from "./TransactionChain";


export class ExecuteTransactionHandler extends TransactionChain {


    async handle(request: TransactionData): Promise<Either<IErrorTransaction, TransactionData>> {
        
        request.status = 'executed'
        request.transactionData = {
            ...request.transactionData,
            createAt: new Date()
        }

        await this.dispatchTransaction(request.transactionData)
        
        await request.transactionData.dbTransaction.commit()
       
        return super.handle(request);
    }

    private async dispatchTransaction(data: any): Promise<boolean>{
        return Promise.resolve(true)
    }
}