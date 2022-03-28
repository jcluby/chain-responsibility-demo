import { Either, right } from "../../../shared/Either"
import { IDatabaseTransaction } from "../../repositories/ITransactionRepository"

export type TransactionData = {
    processId: string
    accountId: string
    balance?: number
    status?: string
    category: string
    amount: number
    transactionDB: IDatabaseTransaction
    data?: any
    events: any[]
}

export interface IErrorTransaction {
    code: string
    message: string
    shortMessage: string
    data: any
}

interface ITransactionChain {
    setNext(handler: ITransactionChain): ITransactionChain;
    handle(request: TransactionData): Either<IErrorTransaction, TransactionData> | Promise<Either<IErrorTransaction, TransactionData>>;
}

export abstract class TransactionChain implements ITransactionChain
{
    private nextHandler: ITransactionChain | undefined;

    public setNext(handler: ITransactionChain): ITransactionChain {
        this.nextHandler = handler;
        return handler;
    }

    public handle(request: TransactionData): Either<IErrorTransaction, TransactionData> | Promise<Either<IErrorTransaction, TransactionData>> {
        if (this.nextHandler) {
            return this.nextHandler.handle(request);
        }
        return right(request)
    }
}