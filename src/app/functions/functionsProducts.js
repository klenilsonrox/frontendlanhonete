import { baseUrl } from "../utils/baseUrl";

export async function fetchProdutos() {
    const response = await fetch(`${baseUrl}/products`);
    const produtos = await response.json();
    return produtos;
  }