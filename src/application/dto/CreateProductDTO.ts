export interface CreateProductDTO {
  name: string;
  description?: string | null;
  price: number;
  stock: number;
}
