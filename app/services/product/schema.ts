import z, { UnknownKeysParam, ZodRawShape } from "zod";

const fileSchema = z.object({
  files: z.array(z.string()).min(1, {
    message: "Upload at least one file",
  }),
});

const baseSchema = z.object({
  name: z.string().min(2, {
    message: "Enter a valid name",
  }),
  description: z.string().min(2, {
    message: "Enter a valid description",
  }),
  priceInCents: z.number().int().positive({
    message: "Enter a valid price",
  }),
  category: z
    .string(z.enum(["ELCTRONICS", "CLOTHING", "BOOKS", "TOYS"]))
    .min(1, {
      message: "Select a valid category",
    }),
  quantity: z.number().int().positive({
    message: "Enter a valid quantity",
  }),
});

const createSchema = baseSchema.extend({}) && fileSchema.extend({});

const updateSchema = baseSchema.extend({});

const uploadFilesSchema = fileSchema.extend({});

const schemas: { [key: string]: z.ZodObject<ZodRawShape, UnknownKeysParam> } = {
  create: createSchema,
  update: updateSchema,
  uploadFiles: uploadFilesSchema,
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
