import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ApiClienteService } from './apiCliente.sevice';

@Module({
  imports: [HttpModule],
  providers: [ApiClienteService],
  exports: [ApiClienteService],
})
export class ApiClienteModule {}
