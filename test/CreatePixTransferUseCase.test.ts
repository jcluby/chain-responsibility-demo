import { CreatePixTransferUseCase } from "../src/business/useCases/transaction/CreatePixTransferUseCase";
import { TransactionRespository } from "../src/infra/repositories/TransactionRepository";


describe('use-case: create transfer PIX', () => {

    let createPixTransferUseCase: CreatePixTransferUseCase

    beforeEach(() => {
        createPixTransferUseCase = new CreatePixTransferUseCase(new TransactionRespository())
    })

    test("should create transfer PIX limit valid", async function() {

        const result = await createPixTransferUseCase.execute({
            accountId: '001',
            category: 'PIX',
            amount: 1000
        })
        expect(result.isLeft()).toBeFalsy()
        if(result.isRight()){
            expect(result.value.status).toBe('executed')
        }
    });

    test("should create transfer PIX limit invalid", async function () {

        const result = await createPixTransferUseCase.execute({
            accountId: '002',
            category: 'PIX',
            amount: 5000000,
        })
        expect(result.isRight()).toBeFalsy()
        if(result.isLeft()){
            expect(result.value.code).toBe('1')
        }

    });

})

