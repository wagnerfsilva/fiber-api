class BoletosReceber {
  id_remessa: string;
  gateway_link: string;
  nn_boleto: string;
  boleto: string;
  data_inicial: string;
  data_final: string;
  id: string;
  liberado: string;
  filial_id: string;
  status: string;
  data_emissao: string;
  data_vencimento: string;
  valor: string;
  obs: string;
  valor_recebido: string;
  valor_aberto: string;
  id_cliente: string;
  pagamento_valor: string;
  pagamento_data: string;
  linha_digitavel: string;
}

export class BuscaBoletosReceberResponse {
  page: string;
  total: string;
  registros: BoletosReceber[];
}
