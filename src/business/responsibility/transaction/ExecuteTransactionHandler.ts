import { Either, left, right } from "../../../shared/Either";
import { TransactionData, TransactionChain, IErrorTransaction } from "./TransactionChain";


export class ExecuteTransactionHandler extends TransactionChain {


    async handle(request: TransactionData): Promise<Either<IErrorTransaction, TransactionData>> {

        const [ event ] = request?.events
        if(!event){
            return left({
                code: '111',
                message: 'events error',
                shortMessage: 'events error',
                data: request
            })
        }
        
        for (const item of request.events) {

            if(!item.transactionId){
                return left({
                    code: '112',
                    message: 'transaction Id invalid',
                    shortMessage: 'transaction Id invalid',
                    data: request
                })
            }
            
            const result = await this.dispatchTransaction(item)

            await request.transactionDB.commit(item.transactionId)

            if (result.isLeft()) {
                return left({
                    ...result.value,
                    data: request
                })
            }
        }        
        request.status = 'executed'
        
        return super.handle(request);
    }
    
    private async dispatchTransaction(data: any): Promise<Either<IErrorTransaction, boolean>> {

        // dispatch Queue
        return right(true)
    }
}