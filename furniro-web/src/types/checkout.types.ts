export interface ViaCepResponse {
    cep: string;
    logradouro: string;
    localidade: string;
    uf: string;
    erro?: boolean;
}
