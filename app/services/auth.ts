"use server";

import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { JWTPayload, SignJWT, jwtVerify } from "jose";
import { create, read } from "@/app/services/user/model";
import { validateSchema } from "@/app/services/user/schema";
import type { IUser, ILoginState, IRegisterState } from "@/app/interfaces";

const SESSION_SECRET = process.env.SESSION_SECRET;
if (!SESSION_SECRET) throw new Error("SESSION_SECRET is not set");
const SESSION_SECRET_ENCODED = new TextEncoder().encode(SESSION_SECRET);

async function encrypt(payload: JWTPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(SESSION_SECRET_ENCODED);
}

async function decrypt(token: string): Promise<JWTPayload> {
  const { payload } = await jwtVerify(token, SESSION_SECRET_ENCODED, {
    algorithms: ["HS256"],
  });
  return payload;
}

async function createUserSession(userId: string, role: string) {
  const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
  const session = await encrypt({ userId, role, expires });
  cookies().set("session", session, { expires, httpOnly: true });
}

export async function login(_prevState: ILoginState, formData: FormData) {
  const lng = cookies().get("i18next")?.value ?? "en";

  const dataToValidate = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const errors = validateSchema("login", dataToValidate);

  if (Object.keys(errors).length !== 0) {
    return {
      errors,
      message: "",
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
        message: "Correo electrónico o contraseña incorrecta.",
      };
    }

    await createUserSession((user as IUser).id, (user as IUser).role);
  } catch (error) {
    console.error(error);
    return { message: "Ocurrió un error interno." };
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

  const errors = validateSchema("register", dataToValidate);

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

export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function isAuthenticated() {
  const session = await getSession();
  if (!session || !session.userId) {
    throw new Error("Unauthorized access.");
  }
  return session;
}

export async function isAdmin() {
  const session = await getSession();
  if (!session || !session.role || session.role !== "ADMIN") {
    throw new Error("Unauthorized access.");
  }
  return session;
}
