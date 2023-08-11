export class BoletoReceber {
  id: string;
  gateway_link: string;
  nn_boleto: string;
  data_vencimento: string;
  valor: string;
  linha_digitavel: string;
}

export class BoletoReceberResponse {
  boleto: BoletoReceber | null;
}
