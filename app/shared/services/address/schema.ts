import z, { UnknownKeysParam, ZodRawShape } from "zod";

const createAddressSchema = z.object({
  userId: z.string().min(2, {
    message: "Enter a valid userId",
  }),
  fullName: z.string().min(2, {
    message: "Enter a valid name",
  }),
  address1: z.string().min(2, {
    message: "Enter a valid address",
  }),
  address2: z
    .string()
    .min(0, {
      message: "Enter a valid address",
    })
    .optional(),
  city: z.string().min(2, {
    message: "Enter a valid city",
  }),
  state: z.string().min(2, {
    message: "Enter a valid state",
  }),
  zipCode: z.string().min(2, {
    message: "Enter a valid zip code",
  }),
  country: z.string().min(2, {
    message: "Enter a valid country",
  }),
  phoneNumber: z
    .string()
    .min(2, {
      message: "Enter a valid phone number",
    })
    .optional(),
  additionalInfo: z
    .string()
    .min(0, {
      message: "Enter a valid additional info",
    })
    .optional(),
});

const schemas: { [key: string]: z.ZodObject<ZodRawShape, UnknownKeysParam> } = {
  create: createAddressSchema,
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
