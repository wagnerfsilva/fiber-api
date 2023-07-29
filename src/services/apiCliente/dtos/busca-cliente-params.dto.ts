import { IsNotEmpty, Validate } from 'class-validator';
import { ValidaCPF } from 'src/validators/validaCPF';

export class BuscaClienteParams {
  @IsNotEmpty()
  @Validate(ValidaCPF)
  cpf: string;
}
