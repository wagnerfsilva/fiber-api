import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCookieAuth,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BoletosService } from './boletos.service';
import { BoletosResponse } from './dtos/boletos-response.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Boletos')
@Controller('/boletos')
export class BoletosController {
  constructor(private readonly boletosService: BoletosService) {}

  /**
   * Retorna um array com boletos
   */
  @ApiResponse({
    status: 200,
    description: 'Um objeto com o array de boletos',
    type: BoletosResponse,
  })
  @ApiCookieAuth()
  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard)
  @Get()
  obtemBoletos(): Promise<BoletosResponse> {
    return this.boletosService.obtemBoletos();
  }
}
