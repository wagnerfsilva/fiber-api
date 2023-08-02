export class BoletoReceber {
  id: string;
  nn_boleto: string;
  data_vencimento: string;
  valor: string;
}

export class BoletoReceberResponse {
  boleto: BoletoReceber | null;
}
