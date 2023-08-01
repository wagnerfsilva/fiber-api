import { Module } from '@nestjs/common';
import { BoletosController } from './boletos.controller';
import { BoletosService } from './boletos.service';
import { ApiClienteModule } from 'src/services/apiCliente/apiCliente.module';

@Module({
  imports: [ApiClienteModule],
  controllers: [BoletosController],
  providers: [BoletosService],
})
export class BoletosModule {}
