"use server";

import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { validateSchema } from "../schema";
import { revalidatePath } from "next/cache";
import { create, read, update } from "../model";
import {
  getSession,
  isAuthenticated,
  createUserSession,
} from "@/app/shared/services/auth";
import type {
  IUser,
  ILoginState,
  IRegisterState,
  IUpdateMyMainInfo,
  LanguageTypeForSchemas,
} from "@/app/shared/interfaces";

export async function login(_prevState: ILoginState, formData: FormData) {
  const lng = cookies().get("i18next")?.value ?? "en";

  const dataToValidate = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const errors = validateSchema(
    lng as LanguageTypeForSchemas,
    "login",
    dataToValidate
  );

  if (Object.keys(errors).length !== 0) {
    return {
      errors,
      message: {
        en: "",
        es: "",
      },
    };
  }

  try {
    const user = await read({ email: dataToValidate.email as string });

    if (
      !user ||
      !(await bcrypt.compare(
        dataToValidate.password as string,
        (user as IUser).password
      ))
    ) {
      return {
        message: {
          en: "Incorrect email or password.",
          es: "Correo electrónico o contraseña incorrecta.",
        },
      };
    }

    await createUserSession((user as IUser).id, (user as IUser).role);
  } catch (error) {
    console.error(error);
    return {
      message: {
        en: "An internal error occurred.",
        es: "Ocurrió un error interno.",
      },
    };
  }
  const session = await getSession();
  revalidatePath(session?.role === "ADMIN" ? `/${lng}/admin/home` : `/${lng}`);
  redirect(session?.role === "ADMIN" ? `/${lng}/admin/home` : `/${lng}`);
}

export async function register(_prevState: IRegisterState, formData: FormData) {
  const lng = cookies().get("i18next")?.value ?? "en";

  const dataToValidate = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };

  const errors = validateSchema(
    lng as LanguageTypeForSchemas,
    "register",
    dataToValidate
  );

  if (Object.keys(errors).length !== 0) {
    return {
      errors,
    };
  }

  if (dataToValidate.password !== dataToValidate.confirmPassword)
    return { message: "Las contraseñas no coinciden." };

  try {
    const userAlreadyExists = await read({
      email: dataToValidate.email as string,
    });
    if (userAlreadyExists) return { message: "El usuario ya existe." };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...data } = dataToValidate;

    const newUser = await create({ data });

    await createUserSession((newUser as IUser).id, (newUser as IUser).role);
  } catch (error) {
    console.error(error);
    return { message: "Ocurrió un error interno." };
  }
  const session = await getSession();
  revalidatePath(session?.role === "ADMIN" ? `/${lng}/admin/home` : `/${lng}`);
  redirect(session?.role === "ADMIN" ? `/${lng}/admin/home` : `/${lng}`);
}

export async function logout() {
  const lng = cookies().get("i18next")?.value ?? "en";
  cookies().set("session", "", { expires: new Date(0) });
  revalidatePath(`/${lng}`);
  redirect(`/${lng}`);
}

export async function getMe() {
  try {
    const session = await isAuthenticated();
    return await read({
      id: session.userId as string,
    });
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function updateMyMainInfo(
  _prevState: IUpdateMyMainInfo,
  formData: FormData
) {
  const session = await getSession();
  const lng = cookies().get("i18next")?.value ?? "en";

  const dataToValidate = {
    username: formData.get("username"),
    email: formData.get("email"),
  };

  const errors = validateSchema(
    lng as LanguageTypeForSchemas,
    "updateMainInfo",
    dataToValidate
  );

  if (Object.keys(errors).length !== 0) {
    return {
      errors,
      message: {
        en: "",
        es: "",
      },
    };
  }

  try {
    const me = (await read({ id: session?.userId as string })) as IUser;

    const usernameAlreadyTaken = (await read({
      username: dataToValidate.username as string,
    })) as IUser;

    if (usernameAlreadyTaken && usernameAlreadyTaken.username !== me.username) {
      return {
        message: {
          en: "Username already taken",
          es: "Nombre de usuario ya tomado",
        },
      };
    }

    const emailAlreadyTaken = (await read({
      email: dataToValidate.email as string,
    })) as IUser;

    if (emailAlreadyTaken && emailAlreadyTaken.email !== me.email) {
      return {
        message: {
          en: "Email already taken",
          es: "Correo electrónico ya tomado",
        },
      };
    }

    await update({
      id: session?.userId as string,
      data: dataToValidate,
    });
  } catch (error) {
    console.error(error);
    return {
      message: {
        en: "An internal error occurred",
        es: "Ocurrió un error interno",
      },
    };
  }

  revalidatePath(
    session?.role === "ADMIN"
      ? `/${lng}/admin/profile/home`
      : `/${lng}/profile/home`
  );
  return {
    message: {
      en: "OK",
      es: "OK",
    },
  };
}
