import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCookieAuth,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BoletosService } from './boletos.service';
import { BoletosReceberResponse } from './dtos/boletosReceber-response.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';

@ApiTags('Boletos')
@Controller('/boletos')
export class BoletosController {
  constructor(private readonly boletosService: BoletosService) {}

  /**
   * Retorna um array com boletos receber
   */
  @ApiResponse({
    status: 200,
    description: 'Um objeto com o array de boletos receber',
    type: BoletosReceberResponse,
  })
  @ApiCookieAuth()
  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard)
  @Get()
  obtemBoletosReceber(
    @Req() request: Request,
  ): Promise<BoletosReceberResponse> {
    return this.boletosService.obtemBoletosReceber(request);
  }
}
