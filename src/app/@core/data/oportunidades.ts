import { SafeUrl } from '@angular/platform-browser';

export interface IOportunidades {
  id: number;
  titulo: string;
  subtitulo: string;
  inicio: string;
  fim: string;
  descricao: string;
  Dados1: string;
  Dados2: string;
  ativo: boolean;
  imagem: any;
  ga_tag: string;
  Valor: number;
  showDetail?: boolean;
  linkWhats?: SafeUrl;
  imagemDashboard?: any;
  padrao?: boolean;
}
