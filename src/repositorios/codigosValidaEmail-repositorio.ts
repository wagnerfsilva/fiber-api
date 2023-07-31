export type CodigosValidaEmail = {
  codigo: number;
  cpf: string;
  tentativas: number;
};

export type WhereUnique = {
  cpf: string;
};

export type FindUniqueProps = {
  where: WhereUnique;
};

export type CreateProps = {
  data: {
    codigo: number;
    tentativas: number;
  };
  where: WhereUnique;
};

export type UpdateProps = {
  data: {
    codigo: number;
    tentativas: number;
  };
  where: WhereUnique;
};

export type DeleteProps = {
  where: WhereUnique;
};

export abstract class CodigosValidaEmailRepositorio {
  abstract findUnique(
    props: FindUniqueProps,
  ): Promise<CodigosValidaEmail | null>;

  abstract create(props: CreateProps): Promise<void>;

  abstract update(props: UpdateProps): Promise<void>;

  abstract delete(props: DeleteProps): Promise<void>;
}
