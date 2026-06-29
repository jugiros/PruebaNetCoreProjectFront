import { z } from 'zod';

const BASE_URL = process.env.NEXT_PUBLIC_AUTH_API_URL;

// ─── Schemas de respuesta (Zod) ──────────────────────────────────────────────

const LoginResponseSchema = z.object({
  accessToken:  z.string(),
  refreshToken: z.string(),
  userId:       z.string().uuid(),
  fullName:     z.string(),
});

const RegisterResponseSchema = z.object({
  userId: z.string().uuid(),
});

// ─── Tipos inferidos ─────────────────────────────────────────────────────────

export type LoginResponseDto    = z.infer<typeof LoginResponseSchema>;
export type RegisterResponseDto = z.infer<typeof RegisterResponseSchema>;

// ─── Endpoints ───────────────────────────────────────────────────────────────

export const AUTH_ENDPOINTS = {
  login:    `${BASE_URL}/api/v1/auth/login`,
  register: `${BASE_URL}/api/v1/auth/register`,
} as const;

// ─── Clientes HTTP tipados ───────────────────────────────────────────────────

export async function loginUser(
  email: string,
  password: string
): Promise<LoginResponseDto> {
  const response = await fetch(AUTH_ENDPOINTS.login, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({})) as { error?: string; title?: string };
    throw new Error(body?.error ?? body?.title ?? 'Credenciales incorrectas. Intenta de nuevo.');
  }

  const data: unknown = await response.json();
  return LoginResponseSchema.parse(data);
}

export async function registerUser(
  email: string,
  password: string,
  firstName: string,
  lastName: string
): Promise<RegisterResponseDto> {
  const response = await fetch(AUTH_ENDPOINTS.register, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ email, password, firstName, lastName }),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({})) as { error?: string; title?: string };
    throw new Error(body?.error ?? body?.title ?? 'No se pudo completar el registro. Intenta de nuevo.');
  }

  const data: unknown = await response.json();
  return RegisterResponseSchema.parse(data);
}
