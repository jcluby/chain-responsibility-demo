import { CreateTransactionUseCase } from "../src/business/useCases/transaction/CreateTransactionUseCase";


describe('use-case: create transactions', () => {
    
    let createTransactionUseCase: CreateTransactionUseCase

    beforeEach(() => {
        createTransactionUseCase = new CreateTransactionUseCase()
    })

    test("should create transaction TED equal executed and FEE equal 4", function () {
    
        const result = createTransactionUseCase.execute({
            status: 'pending',
            accountId: '123',
            category: 'TED',
            transactionData: {}
        })
        
        expect(result.status).toBe('executed');
        expect(result.transactionData.fee).toBe(4)
    });

    test("should create transaction PIX equal executed and FEE equal 0", function () {
    
        const result = createTransactionUseCase.execute({
            status: 'pending',
            accountId: '123',
            category: 'PIX',
            transactionData: {}
        })
        
        expect(result.status).toBe('executed');
        expect(result.transactionData.fee).toBe(0)
    });

})

