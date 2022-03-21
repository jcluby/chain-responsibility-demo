import { CreateTevTransferUseCase } from "../src/business/useCases/transaction/CreateTevTransferUseCase";
import { TransactionRespository } from "../src/infra/repositories/TransactionRepository";


describe('use-case: create transfer TEV', () => {

    let createTevTransferUseCase: CreateTevTransferUseCase

    beforeEach(() => {
        createTevTransferUseCase = new CreateTevTransferUseCase(new TransactionRespository())
    })

    test("should create transfer TEV", async function() {

        const result = await createTevTransferUseCase.execute({
            status: 'pending',
            accountId: '123',
            category: 'TEV',
            amount: 1000,
            transactionData: {}
        })
        if(result.isRight()){
            expect(result.value.status).toBe('executed')
        }
    });

    test("should create transfer TEV Insufficient balance", async function() {

        const result = await createTevTransferUseCase.execute({
            status: 'pending',
            accountId: '123',
            category: 'TEV',
            amount: 7000000,
            transactionData: {}
        })
        if(result.isLeft()){
            expect(result.value.code).toBe('12')
        }
    });

})

