import type { ViaCepResponse } from "../types/checkout.types";

const VIA_CEP_URL = "https://viacep.com.br/ws";

export async function getAddressByCep(cep: string): Promise<ViaCepResponse> {
    const response = await fetch(`${VIA_CEP_URL}/${cep}/json/`);

    if (!response.ok) {
        throw new Error("Failed to fetch ZIP Code.");
    }

    const data: ViaCepResponse = await response.json();

    if (data.erro) {
        throw new Error("ZIP Code not found.");
    }

    return data;
}
