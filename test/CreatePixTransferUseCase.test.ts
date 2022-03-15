import { CreatePixTransferUseCase } from "../src/business/useCases/transaction/CreatePixTransferUseCase";


describe('use-case: create transfer PIX', () => {

    let createPixTransferUseCase: CreatePixTransferUseCase

    beforeEach(() => {
        createPixTransferUseCase = new CreatePixTransferUseCase()
    })

    test("should create transfer PIX limit valid", function () {

        const result = createPixTransferUseCase.execute({
            status: 'pending',
            accountId: '123',
            category: 'PIX',
            amount: 1000,
            transactionData: {}
        })
        if(result.isRight()){
            expect(result.value.status).toBe('executed')
        }
    });

    test("should create transfer PIX limit invalid", function () {

        const result = createPixTransferUseCase.execute({
            status: 'pending',
            accountId: '000',
            category: 'PIX',
            amount: 5000000,
            transactionData: {}
        })
        if(result.isLeft()){
            expect(result.value.code).toBe('1')
        }

    });

})

