import axios from "axios";

export const api = axios.create({
    baseURL: 'http://localhost:3001',
});

export interface Veiculo {
    id?: number;
    placa: string;
    marca: string;
    modelo: string;
    ano: number;
    cor: string;
}

export const getVeiculos = () => api.get<Veiculo[]>('/veiculos');
export const getVeiculo = (id: number) => api.get<Veiculo>(`/veiculos/${id}`);
export const createVeiculo = (v: Veiculo) => api.post(`/veiculos`, v);
export const updateVeiculo = (id: number, v: Veiculo) => api.put(`/veiculos/${id}`, v);
export const deleteVeiculo = (id: number) => api.delete(`/veiculos/${id}`);
