import { Either, left } from "../../../../shared/Either";
import { TransactionData, TransactionChain, IErrorTransaction } from "../TransactionChain";


export class LimitPixTransferTransactionHandler extends TransactionChain {

    private maxLimit:number = 100000

    handle(request: TransactionData): Either<IErrorTransaction, TransactionData> | Promise<Either<IErrorTransaction, TransactionData>>{
        
        const limit:boolean = this.checkLimit(request)
        request.data = {
            ...request.data,
            limit: limit
        }
        if(limit){
            request.status = 'fail'
            return left({
                code: '1',
                message: 'error limit pix',
                shortMessage: 'limit',
                data: request
            })
        }
        return super.handle(request);
    }

    private checkLimit(request: any): boolean{        
        return request.amount > this.maxLimit
    }


}