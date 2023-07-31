import { Module } from '@nestjs/common';
import { BoletosController } from './boletos.controller';
import { BoletosService } from './boletos.service';

@Module({
  controllers: [BoletosController],
  providers: [BoletosService],
})
export class BoletosModule {}
