import { CreateTransactionUseCase } from "../business/useCases/transaction/CreateTransactionUseCase";

export class CreateTransactionController {


    constructor(private createTransactionUseCase: CreateTransactionUseCase) { }

    run(input: any): any {

        return this.createTransactionUseCase.execute(input)

    }

}