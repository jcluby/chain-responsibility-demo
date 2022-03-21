import { CreateTransactionUseCase } from "../src/business/useCases/transaction/CreateTransactionUseCase";
import { TransactionRespository } from "../src/infra/repositories/TransactionRepository";


describe('use-case: create transactions', () => {
    
    let createTransactionUseCase: CreateTransactionUseCase

    beforeEach(() => {
        createTransactionUseCase = new CreateTransactionUseCase(new TransactionRespository())
    })

    test("should create transaction TED equal executed and FEE equal 4", async function () {
    
        const result = await createTransactionUseCase.execute({
            status: 'pending',
            accountId: '123',
            category: 'TED',
            transactionData: {}
        })
        if(result.isRight()){
            expect(result.value.status).toBe('executed');
            expect(result.value.transactionData.fee).toBe(4)
        }
    });

    test("should create transaction PIX equal executed and FEE equal 0", async function () {
    
        const result = await createTransactionUseCase.execute({
            status: 'pending',
            accountId: '123',
            category: 'PIX',
            transactionData: {}
        })

        expect(result.isRight()).toBeTruthy()
        expect(result.isLeft()).toBeFalsy()
        if(result.isRight()){
            expect(result.value.status).toBe('executed');
            expect(result.value.transactionData.fee).toBe(0)
        }

    });

})

