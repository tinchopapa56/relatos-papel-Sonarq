import { Link } from "react-router-dom";
import { books } from "@/features/books/books";
import { useAuth } from "@/features/auth";
import FeaturedCarousel from "./FeaturedCarousel";

export default function LandingPage() {
  const { isAuthenticated, user } = useAuth();
  const featuredBooks = books.slice(0, 3);

  return (
    <main className="flex flex-1 flex-col overflow-x-clip">
      <section className="relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden px-4 sm:px-6 lg:px-16">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-surface to-secondary/5" />
          <div className="absolute -right-16 top-10 h-48 w-48 rounded-full bg-primary/6 blur-2xl sm:h-56 sm:w-56 sm:opacity-90" />
          <div className="absolute -left-16 bottom-0 h-48 w-48 rounded-full bg-secondary/6 blur-2xl sm:h-56 sm:w-56 sm:opacity-90" />

          <svg
            className="absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 opacity-10 lg:left-[66%] lg:-translate-x-0 lg:opacity-22 xl:h-[34rem] xl:w-[34rem]"
            viewBox="0 0 512 512"
            fill="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="bookGradientA" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#9729eb" />
                <stop offset="100%" stopColor="#6179d8" />
              </linearGradient>
              <linearGradient id="bookGradientB" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#d6711e" />
                <stop offset="100%" stopColor="#ccb685" />
              </linearGradient>
            </defs>

            {/* Primer libro - Morado */}
            <rect
              x="40"
              y="130"
              width="140"
              height="320"
              rx="28"
              fill="url(#bookGradientA)"
            />
            {/* Líneas blancas (arriba del primer libro) */}
            <path
              d="M45 180H175"
              stroke="white"
              strokeOpacity="0.3"
              strokeWidth="10"
              strokeLinecap="round"
            />
            <path
              d="M45 205H175"
              stroke="white"
              strokeOpacity="0.3"
              strokeWidth="10"
              strokeLinecap="round"
            />
            <path
              d="M45 230H175"
              stroke="white"
              strokeOpacity="0.3"
              strokeWidth="10"
              strokeLinecap="round"
            />

            {/* Segundo libro - Blanco */}
            <rect
              x="197"
              y="100"
              width="160"
              height="380"
              rx="28"
              fill="#ffffff"
              stroke="#b6b6b6"
              strokeWidth="4"
            />
            {/* Líneas grises (arriba del segundo libro) */}
            <path
              d="M200 150H355"
              stroke="#727077"
              strokeOpacity="0.25"
              strokeWidth="10"
              strokeLinecap="round"
            />
            <path
              d="M200 175H355"
              stroke="#727077"
              strokeOpacity="0.25"
              strokeWidth="10"
              strokeLinecap="round"
            />
            <path
              d="M200 200H355"
              stroke="#727077"
              strokeOpacity="0.25"
              strokeWidth="10"
              strokeLinecap="round"
            />

            {/* Tercer libro - Morado (alineado al borde derecho del viewBox) */}
            <rect
              x="372"
              y="140"
              width="140"
              height="300"
              rx="28"
              fill="url(#bookGradientB)"
            />
            {/* Líneas grises verticales (tercer libro) */}
            <path
              d="M410 145V435"
              stroke="white"
              strokeOpacity="0.25"
              strokeWidth="10"
              strokeLinecap="round"
            />
            <path
              d="M440 145V435"
              stroke="white"
              strokeOpacity="0.25"
              strokeWidth="10"
              strokeLinecap="round"
            />
            <path
              d="M470 145V435"
              stroke="white"
              strokeOpacity="0.25"
              strokeWidth="10"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-2 lg:items-center">
          <div className="flex flex-col py-6 sm:py-10 lg:py-0">
            <h1 className="order-2 text-4xl font-bold leading-tight text-text sm:text-5xl lg:text-7xl lg:mt-4">
              <span className="block lg:inline whitespace-nowrap">
                Tu próxima historia
              </span>{" "}
              <span className="block lg:inline text-primary italic">
                te está esperando
              </span>
            </h1>

            <p className="order-3 mt-6 max-w-lg rounded-lg bg-white/40 px-4 py-3 text-base leading-relaxed text-text backdrop-blur-sm dark:bg-transparent dark:px-0 dark:py-0 dark:backdrop-blur-none lg:text-lg">
              Explora una cuidada selección de miles de títulos. Desde clásicos
              inmortales hasta las últimas novedades digitales.
            </p>

            <div className="order-4 mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/books"
                title="Explorar el catálogo de libros"
                className="rounded-2xl bg-primary px-8 py-4 font-bold text-white shadow-xl shadow-primary/30 transition-all hover:bg-primary-hover hover:scale-105 active:scale-95"
              >
                Explorar Catálogo
              </Link>

              {!isAuthenticated ? (
                <Link
                  to="/login"
                  title="Iniciar sesión"
                  className="rounded-2xl border border-border bg-raised px-8 py-4 font-bold text-text transition-all hover:border-primary hover:text-primary"
                >
                  Crear Cuenta
                </Link>
              ) : (
                <Link
                  to={user?.role === "admin" ? "/admin" : "/profile"}
                  title={
                    user?.role === "admin" ? "Ir al Dashboard" : "Ver perfil"
                  }
                  className="rounded-2xl border border-border bg-raised px-8 py-4 font-bold text-text transition-all hover:border-primary hover:text-primary"
                >
                  {user?.role === "admin" ? "Ir al Dashboard" : "Mi Perfil"}
                </Link>
              )}
            </div>
          </div>

          <div className="hidden lg:block" />
        </div>
      </section>

      <section className="bg-raised/30 px-4 py-20 sm:px-6 lg:px-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <div className="group flex flex-col items-center rounded-3xl border border-border bg-surface p-8 text-center shadow-sm transition-all hover:shadow-md">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-500/10 text-3xl text-orange-500 transition-transform group-hover:scale-110">
              🚀
            </div>
            <h3 className="mb-3 text-xl font-bold text-text">Envío Flash</h3>
            <p className="text-sm leading-relaxed text-muted">
              Recibe tus libros físicos en la puerta de tu casa en menos de 24
              horas.
            </p>
          </div>

          <div className="group flex flex-col items-center rounded-3xl border border-border bg-surface p-8 text-center shadow-sm transition-all hover:shadow-md">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10 text-3xl text-blue-500 transition-transform group-hover:scale-110">
              📱
            </div>
            <h3 className="mb-3 text-xl font-bold text-text">
              Lectura Inmediata
            </h3>
            <p className="text-sm leading-relaxed text-muted">
              Compra la versión virtual y empieza a leer al instante.
            </p>
          </div>

          <div className="group flex flex-col items-center rounded-3xl border border-border bg-surface p-8 text-center shadow-sm transition-all hover:shadow-md">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 text-3xl text-emerald-500 transition-transform group-hover:scale-110">
              🔒
            </div>
            <h3 className="mb-3 text-xl font-bold text-text">Pago Seguro</h3>
            <p className="text-sm leading-relaxed text-muted">
              Tus transacciones están protegidas con los más altos estándares de
              seguridad.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-16 border-t border-border/30">
        <div className="mb-12 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <h2 className="mb-4 text-3xl font-bold text-text lg:text-4xl">
              Los más buscados
            </h2>
            <p className="text-muted">
              Descubre lo que todos están leyendo esta semana.
            </p>
          </div>

          <Link
            to="/books"
            title="Ver todos los libros"
            className="self-start font-bold text-primary hover:underline lg:self-auto"
          >
            ➔ Ver todos los libros
          </Link>
        </div>

        <div className="mt-16 pt-10 border-t border-border/20">
          <FeaturedCarousel items={featuredBooks} />
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-16">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-primary-hover p-8 text-center shadow-lg sm:p-10 lg:p-12">
          <div className="absolute right-0 top-1/2 h-40 w-40 -translate-y-1/2 translate-x-1/2 rounded-full bg-white/5 blur-2xl" />
          <div className="absolute left-0 top-1/2 h-40 w-40 -translate-y-1/2 -translate-x-1/2 rounded-full bg-black/5 blur-2xl" />

          <div className="relative z-10">
            <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
              {isAuthenticated
                ? `¿Qué vas a leer hoy, ${user?.name}?`
                : "¿Listo para empezar tu viaje?"}
            </h2>

            <p className="mx-auto mb-8 max-w-lg text-sm text-white/80 sm:text-base">
              {isAuthenticated
                ? "Explora las nuevas recomendaciones que tenemos preparadas para ti."
                : "Únete a nuestra comunidad de lectores y accede a ofertas exclusivas cada semana."}
            </p>

            <div className="flex justify-center">
              <Link
                to={isAuthenticated ? "/books" : "/login"}
                className="rounded-full bg-white px-8 py-3 font-semibold text-primary shadow-lg transition-all hover:shadow-xl hover:scale-105 active:scale-95 sm:px-10 sm:py-4"
                title={
                  isAuthenticated
                    ? "Explorar el catálogo de libros"
                    : "Iniciar sesión"
                }
              >
                {isAuthenticated ? "Explorar Catálogo" : "Registrarme ahora"}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
