import type { LanguageTypeForSchemas } from "@/app/interfaces";
import z, { type UnknownKeysParam, type ZodRawShape } from "zod";

const messages = {
  en: {
    email: "Please enter a valid email address",
    password: "Please enter a valid password",
    username: "Username must be at least 2 characters long",
    confirmPassword:
      "The confirmation password must match the length of the password",
  },
  es: {
    email: "Introduce una dirección de correo electrónico válida",
    password: "Introduce una contraseña válida",
    username: "El nombre debe tener al menos 2 caracteres",
    confirmPassword:
      "La contraseña de confirmación debe tener la misma longitud que la contraseña",
  },
};

const baseSchema = (lng: LanguageTypeForSchemas) =>
  z.object({
    email: z.string().email({
      message: messages[lng].email,
    }),
    password: z.string().min(1, {
      message: messages[lng].password,
    }),
  });

const userLoginSchema = (lng: LanguageTypeForSchemas) =>
  baseSchema(lng).extend({});

const userRegisterSchema = (lng: LanguageTypeForSchemas) =>
  baseSchema(lng).extend({
    username: z.string().min(2, {
      message: messages[lng].username,
    }),
    confirmPassword: z.string().min(8, {
      message: messages[lng].confirmPassword,
    }),
  });

const updateMainInfoSchema = (lng: LanguageTypeForSchemas) =>
  z.object({
    username: z.string().min(2, {
      message: messages[lng].username,
    }),
    email: z.string().email({
      message: messages[lng].email,
    }),
  });

const schemas: {
  [key: string]: (
    lng: LanguageTypeForSchemas
  ) => z.ZodObject<ZodRawShape, UnknownKeysParam>;
} = {
  login: userLoginSchema,
  register: userRegisterSchema,
  updateMainInfo: updateMainInfoSchema,
};

export function validateSchema(
  lng: LanguageTypeForSchemas,
  action: string,
  data: unknown
) {
  const schema = schemas[action];

  if (!schema) {
    throw new Error("Invalid action");
  }

  const result = schema(lng).safeParse(data);

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
