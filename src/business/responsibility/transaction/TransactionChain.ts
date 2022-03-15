import { Either, right } from "../../../shared/Either"
import { IError } from "../../../shared/IError"

export type TransactionData = {
    accountId: string
    status: string
    category: string
    amount: number
    transactionData: any
}

interface ITransactionChain {
    setNext(handler: ITransactionChain): ITransactionChain;
    handle(request: TransactionData): Either<IError, TransactionData>;
}

export abstract class TransactionChain implements ITransactionChain
{
    private nextHandler: ITransactionChain | undefined;

    public setNext(handler: ITransactionChain): ITransactionChain {
        this.nextHandler = handler;
        return handler;
    }

    public handle(request: TransactionData): Either<IError, TransactionData> {
        if (this.nextHandler) {
            return this.nextHandler.handle(request);
        }
        return right(request)
    }
}