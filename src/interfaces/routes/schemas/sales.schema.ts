export const createSaleSchema = {
  type: "object",
  required: ["quantity"],
  properties: {
    quantity: { type: "number", minimum: 1 }, 
  },
} as const;

export const createSaleParamsSchema = {
  type: "object",
  required: ["productId"],
  properties: {
    productId: { type: "string" }, 
  },
} as const;

export const getSalesByMonthQuerySchema = {
  type: "object",
  required: ["month", "year"],
  properties: {
    month: { type: "number", minimum: 1, maximum: 12 },
    year: { type: "number", minimum: 1900 }, 
  },
} as const;