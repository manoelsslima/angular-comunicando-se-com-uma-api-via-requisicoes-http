export interface Contato {
    id: number;
    nome: string;
    avatar: string | ArrayBuffer; // ArrayBuffer lida com dados binarios
    telefone: string;
    email: string;
    aniversario?: string;
    redes?: string;
    observacoes?: string;
}
