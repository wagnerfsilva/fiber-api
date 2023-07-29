import { IsNotEmpty, Validate } from 'class-validator';
import { ValidaCPF } from 'src/validators/validaCPF';

export class SolicitaCodigoLoginBody {
  @IsNotEmpty()
  @Validate(ValidaCPF)
  cpf: string;
}
