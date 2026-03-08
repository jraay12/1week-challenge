
export const createCustomerSchema = {
  type: "object",
  required: ["name", "email", "password"],
  properties: {
    name: { type: "string", maxLength: 100 },
    email: { type: "string", format: "email" },
    password: { type: "string", minLength: 6 },
    address: { type: "string", nullable: true },
    phone: { type: "string", nullable: true, pattern: "^(\\+63|0)?9\\d{9}$" },
  },
} as const;

export const loginSchema = {
  type: "object",
  required: ["email", "password"],
  properties: {
    email: { type: "string", format: "email" },
    password: { type: "string" },
  },
} as const;