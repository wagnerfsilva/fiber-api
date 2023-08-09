import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { ApiClienteModule } from 'src/services/apiCliente/apiCliente.module';
import { FirebaseRealtimeModule } from 'src/database/realtime/firebaseRealtime.module';
import { CodigosValidaEmailRepositorio } from 'src/repositorios/codigosValidaEmail-repositorio';
import { FirebaseRealtimeCodigosValidaEmailRepositorio } from 'src/repositorios/firebaseRealtime/firebaseRealtime-codigosValidaEmail-repositorio';
import { UtilsModule } from 'src/utils/utils/utils.module';
import { SESModule } from 'src/utils/aws/SES/ses.module';
import { TemplatesEmailModule } from 'src/utils/templatesEmail/templatesEmail.module';

@Module({
  imports: [
    FirebaseRealtimeModule,
    ApiClienteModule,
    UtilsModule,
    SESModule,
    TemplatesEmailModule,
  ],
  controllers: [LoginController],
  providers: [
    LoginService,
    {
      provide: CodigosValidaEmailRepositorio,
      useClass: FirebaseRealtimeCodigosValidaEmailRepositorio,
    },
  ],
})
export class LoginModule {}
