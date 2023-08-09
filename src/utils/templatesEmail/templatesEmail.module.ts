import { Module } from '@nestjs/common';
import { TemplatesEmailService } from './templatesEmail.service';

@Module({
  providers: [TemplatesEmailService],
  exports: [TemplatesEmailService],
})
export class TemplatesEmailModule {}
