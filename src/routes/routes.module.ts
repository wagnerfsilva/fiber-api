import { Module } from '@nestjs/common';
import { LoginModule } from './login/login.module';
import { BoletosModule } from './boletos/boletos.module';

@Module({
  imports: [LoginModule, BoletosModule],
})
export class RoutesModule {}
