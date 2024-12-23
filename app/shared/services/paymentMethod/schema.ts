import z, { UnknownKeysParam, ZodRawShape } from "zod";

const createPaymentMethodSchema = z.object({
  userId: z.string().min(2, {
    message: "Enter a valid userId",
  }),
  stripePaymentMethodId: z.string().min(2, {
    message: "Enter a valid stripePaymentMethodId",
  }),
  last4Digits: z.string().min(2, {
    message: "Enter a valid last4Digits",
  }),
  brand: z.string().min(2, {
    message: "Enter a valid brand",
  }),
  expiryMonth: z.string().min(2, {
    message: "Enter a valid expMonth",
  }),
  expiryYear: z.string().min(2, {
    message: "Enter a valid expYear",
  }),
});

const schemas: { [key: string]: z.ZodObject<ZodRawShape, UnknownKeysParam> } = {
  create: createPaymentMethodSchema,
};

export function validateSchema(action: string, data: unknown) {
  const schema = schemas[action];

  if (!schema) {
    throw new Error("Invalid action");
  }

  const result = schema.safeParse(data);

  if (result.success) {
    return {};
  } else {
    const errors = result.error.errors.reduce(
      (acc: { [key: string]: string }, error) => {
        acc[error.path[0]] = error.message;
        return acc;
      },
      {}
    );
    return errors;
  }
}
