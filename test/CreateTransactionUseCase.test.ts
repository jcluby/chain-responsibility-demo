import { CreateTransactionUseCase } from "../src/business/useCases/transaction/CreateTransactionUseCase";
import { TransactionRespository } from "../src/infra/repositories/TransactionRepository";


describe('use-case: create transactions', () => {
    
    let createTransactionUseCase: CreateTransactionUseCase

    beforeEach(() => {
        createTransactionUseCase = new CreateTransactionUseCase(new TransactionRespository())
    })

    test("should create transaction TED not events", async function () {
    
        const result = await createTransactionUseCase.execute({
            accountId: '001',
            category: 'TED',
            amount: 200,
        })
        expect(result.isRight()).toBeFalsy()
        if(result.isLeft()){
            expect(result.value.code).toBe('111')
        }
    });

})

