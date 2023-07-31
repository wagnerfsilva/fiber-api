import { IsNotEmpty, Validate } from 'class-validator';
import { ValidaCPF } from 'src/validators/validaCPF';

export class ValidaCodigoLoginBody {
  @IsNotEmpty()
  @Validate(ValidaCPF)
  cpf: string;

  @IsNotEmpty()
  codigo: number;
}
