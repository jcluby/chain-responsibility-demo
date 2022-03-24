import { CreateTevTransferUseCase } from "../src/business/useCases/transaction/CreateTevTransferUseCase";
import { TransactionRespository } from "../src/infra/repositories/TransactionRepository";


describe('use-case: create transfer TEV', () => {

    let createTevTransferUseCase: CreateTevTransferUseCase

    beforeEach(() => {
        createTevTransferUseCase = new CreateTevTransferUseCase(new TransactionRespository())
    })

    test("should create transfer TEV", async function() {

        const result = await createTevTransferUseCase.execute({
            accountId: '0001',
            category: 'TEV',
            amount: 1000,
        })
        expect(result.isLeft()).toBeFalsy()
        if(result.isRight()){
            expect(result.value.status).toBe('executed')
        }
    });

    test("should create transfer TEV Insufficient balance", async function() {

        const result = await createTevTransferUseCase.execute({
            accountId: '0002',
            category: 'TEV',
            amount: 7000000,
        })
        expect(result.isRight()).toBeFalsy()
        if(result.isLeft()){
            expect(result.value.code).toBe('12')
        }
    });

})

