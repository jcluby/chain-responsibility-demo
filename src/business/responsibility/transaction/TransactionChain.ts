export type TransactionData = {
    accountId: string
    status: string
    category: string
    transactionData: any
}

interface ITransactionChain {
    setNext(handler: ITransactionChain): ITransactionChain;
    handle(request: TransactionData): any;
}

export abstract class TransactionChain implements ITransactionChain
{
    private nextHandler: ITransactionChain | undefined;

    public setNext(handler: ITransactionChain): ITransactionChain {
        this.nextHandler = handler;
        return handler;
    }

    public handle(request: TransactionData): any {
        if (this.nextHandler) {
            return this.nextHandler.handle(request);
        }
        return request;
    }
}