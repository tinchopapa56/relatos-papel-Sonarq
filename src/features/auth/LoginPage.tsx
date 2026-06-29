import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Logo } from "@/shared";
import { useAuth } from "./AuthContext";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Ingresá un email válido")
    .required("El email es requerido"),
  password: Yup.string()
    .min(6, "Mínimo 6 caracteres")
    .required("La contraseña es requerida"),
});

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [loginError, setLoginError] = useState<string | null>(null);

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setLoginError(null);
      const success = login(values.email, values.password);

      if (success) {
        navigate("/profile");
      } else {
        setLoginError("Credenciales incorrectas. Por favor, intenta de nuevo.");
        setSubmitting(false);
      }
    },
  });

  return (
    <main className="flex flex-1">
      {/* ── Left panel ────────────────────────────────── */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-10 bg-gradient-to-br from-primary to-[#6d28d9]">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Logo className="h-8 w-8 sm:h-9 sm:w-9" />
          <span className="text-white font-semibold text-lg">
            Relatos de Papel
          </span>
        </div>

        {/* Tagline */}
        <div>
          <p className="text-white text-3xl font-semibold leading-snug mb-3">
            Tu próxima historia
            <br />
            te está esperando.
          </p>
          <p className="text-white/70 text-sm">
            Miles de libros, un solo lugar.
          </p>
        </div>
      </div>

      {/* ── Right panel — form ────────────────────────── */}
      <div className="flex flex-1 flex-col items-center justify-center p-8 bg-surface">
        <div className="w-full max-w-sm">
          <h1
            className="text-2xl font-semibold text-heading"
            style={{ margin: "0 0 4px" }}
          >
            Iniciar sesión
          </h1>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-5 mt-6"
          >
            {loginError && (
              <div className="rounded-lg bg-error/10 p-3 text-xs font-medium text-error border border-error/20 animate-in fade-in slide-in-from-top-1">
                {loginError}
              </div>
            )}

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-sm font-medium text-text">
                Correo electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="tu@email.com"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`rounded-lg border bg-surface px-4 py-2.5 text-sm text-text outline-none transition-colors placeholder:text-muted focus:border-primary ${
                  touched.email && errors.email
                    ? "border-error"
                    : "border-border"
                }`}
              />
              {touched.email && errors.email && (
                <p className="text-xs text-error">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="password"
                className="text-sm font-medium text-text"
              >
                Contraseña
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full rounded-lg border bg-surface px-4 py-2.5 pr-11 text-sm text-text outline-none transition-colors placeholder:text-muted focus:border-primary ${
                    touched.password && errors.password
                      ? "border-error"
                      : "border-border"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-text"
                  aria-label={
                    showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                  }
                >
                  {showPassword ? (
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M3 12s3.6-7 9-7 9 7 9 7-3.6 7-9 7-9-7-9-7Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  ) : (
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path
                        d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-5.4 0-9-7-9-7a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c5.4 0 9 7 9 7a18.5 18.5 0 0 1-2.16 3.19M3 3l18 18"
                        strokeLinecap="round"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {touched.password && errors.password && (
                <p className="text-xs text-error">{errors.password}</p>
              )}
            </div>

            {/* Remember + forgot */}
            <div className="flex items-center justify-between">
              <label className="flex cursor-pointer items-center gap-2 text-sm text-muted">
                <input type="checkbox" className="accent-primary rounded" />
                Recordarme
              </label>
              <a
                href="#"
                className="text-sm font-medium text-primary hover:text-primary-hover"
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {isSubmitting ? "Ingresando…" : "Ingresar"}
            </button>

            <p className="text-sm text-muted text-center">
              ¿No tenés cuenta?{" "}
              <Link
                to="/register"
                className="font-medium text-primary hover:text-primary-hover"
              >
                Registrate
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
