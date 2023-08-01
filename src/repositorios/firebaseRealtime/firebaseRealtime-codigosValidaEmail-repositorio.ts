import { Injectable } from '@nestjs/common';
import { FirebaseRealtimeService } from 'src/database/realtime/firebaseRealtime.service';
import {
  CodigosValidaEmail,
  CodigosValidaEmailRepositorio,
  CreateProps,
  DeleteProps,
  FindUniqueProps,
  UpdateProps,
} from '../codigosValidaEmail-repositorio';

@Injectable()
export class FirebaseRealtimeCodigosValidaEmailRepositorio
  implements CodigosValidaEmailRepositorio
{
  constructor(
    private readonly firebaseRealtimeService: FirebaseRealtimeService,
  ) {}

  private trataCPF(value: string) {
    return value.replace(/\D/g, '');
  }

  async findUnique(props: FindUniqueProps): Promise<CodigosValidaEmail | null> {
    return (
      await await this.firebaseRealtimeService.codigosValidaEmail
        .child(this.trataCPF(props.where.cpf))
        .get()
    ).val() as CodigosValidaEmail | null;
  }

  async create(props: CreateProps): Promise<void> {
    await this.firebaseRealtimeService.codigosValidaEmail
      .child(this.trataCPF(props.where.cpf))
      .set(props.data);
  }

  async update(props: UpdateProps): Promise<void> {
    await this.firebaseRealtimeService.codigosValidaEmail
      .child(this.trataCPF(props.where.cpf))
      .update(props.data);
  }

  async delete(props: DeleteProps): Promise<void> {
    await this.firebaseRealtimeService.codigosValidaEmail
      .child(this.trataCPF(props.where.cpf))
      .remove();
  }
}
