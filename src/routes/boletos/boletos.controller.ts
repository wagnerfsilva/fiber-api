import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { BoletosService } from './boletos.service';
import { BoletosResponse } from './dtos/boletos-response.dto';

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
  @Get()
  obtemBoletos(): Promise<BoletosResponse> {
    return this.boletosService.obtemBoletos();
  }
}
