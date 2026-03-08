export const createProductSchema = {
  type: "object",
  required: ["name", "price", "stock"],
  properties: {
    name: { type: "string" }, 
    description: { type: "string", maxLength: 100, nullable: true }, 
    price: { type: "number", minimum: 1 },
    stock: { type: "number", minimum: 0 }, 
  },
} as const;

export const addStockSchema = {
  type: "object",
  required: ["quantity"],
  properties: {
    quantity: { type: "number", minimum: 1 }, 
  },
} as const;