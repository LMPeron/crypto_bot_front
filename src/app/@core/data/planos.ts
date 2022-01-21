

export interface Plano {
  nome: string;
  dadosRich: string;
  valor: number;
  imagem: string;
  level: number;

  planID: string;
  checked?: boolean;
  disabled?: boolean;
}
