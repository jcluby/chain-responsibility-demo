import { Either, left } from "../../../shared/Either";
import { IError } from "../../../shared/IError";
import { TransactionData, TransactionChain } from "./TransactionChain";


export class LimitPixTransferTransactionHandler extends TransactionChain {

    private maxLimit:number = 100000

    handle(request: TransactionData): Either<IError, TransactionData>{
        
        const limit:boolean = this.checkLimit(request)
        request.transactionData = {
            ...request.transactionData,
            limit: limit
        }
        if(limit){
            request.status = 'fail'
            return left({
                code: '1',
                message: 'error limit pix',
                shortMessage: 'limit'
            })
        }
        return super.handle(request);
    }

    private checkLimit(request: any): boolean{        
        return request.amount > this.maxLimit
    }


}