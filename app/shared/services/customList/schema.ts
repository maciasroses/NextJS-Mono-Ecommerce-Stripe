import z, { UnknownKeysParam, ZodRawShape } from "zod";

const baseCustomListSchema = z.object({
  name: z.string().min(2, {
    message: "Enter a valid name",
  }),
  description: z
    .string()
    .min(0, {
      message: "Enter a valid description",
    })
    .optional(),
});

const baseCustomProductsListSchema = z.object({
  customListId: z.string().min(2, {
    message: "Enter a valid customListId",
  }),
  productId: z.string().min(2, {
    message: "Enter a valid productId",
  }),
});

const createCustomListSchema = baseCustomListSchema.extend({
  userId: z.string().min(2, {
    message: "Enter a valid userId",
  }),
});

const updateCustomListSchema = baseCustomListSchema.extend({});

const schemas: { [key: string]: z.ZodObject<ZodRawShape, UnknownKeysParam> } = {
  create: createCustomListSchema,
  update: updateCustomListSchema,
  addProduct: baseCustomProductsListSchema,
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
