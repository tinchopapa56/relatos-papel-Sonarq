import { useEffect, useRef, useState, type SyntheticEvent } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth";
import { useCart } from "@/features/cart";
import { useTheme } from "@/hooks/theme/useTheme";
import { Logo } from "@/shared";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Libros", href: "/books" },
  // { label: "Pendientes", href: "/pending" },
] as const;

export function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const { itemCount } = useCart();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [showSearch, setShowSearch] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [navQuery, setNavQuery] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (showSearch) inputRef.current?.focus();
  }, [showSearch]);

  useEffect(() => {
    if (!showMobileMenu) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setShowMobileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showMobileMenu]);

  const submitNavSearch = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const q = navQuery.trim();

    setShowSearch(false);
    setShowMobileMenu(false);

    if (!q) {
      setNavQuery("");
      navigate("/books");
      return;
    }

    navigate(`/books?q=${encodeURIComponent(q)}`);
    setNavQuery("");
  };

  const closeMobileMenu = () => setShowMobileMenu(false);

  return (
    <header className="w-full border-b border-border bg-surface text-text">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:h-16 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <NavLink
            to="/"
            onClick={closeMobileMenu}
            title="Ir al inicio"
            className="shrink-0 text-primary transition-opacity hover:opacity-75"
            aria-label="Relatos de Papel"
          >
            <Logo className="h-8 w-8 sm:h-9 sm:w-9" />
          </NavLink>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {navLinks.map(({ label, href }) => (
              <NavLink
                key={href}
                to={href}
                title={`Ir a ${label.toLowerCase()}`}
                className={({ isActive }) =>
                  isActive
                    ? "rounded-full bg-primary-subtle px-4 py-2 text-sm font-medium text-primary transition-colors"
                    : "rounded-full px-4 py-2 text-sm font-medium text-muted transition-colors hover:bg-primary-subtle hover:text-primary"
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-primary-subtle hover:text-primary"
            aria-label={`Cambiar a modo ${theme === "light" ? "oscuro" : "claro"}`}
          >
            {theme === "light" ? (
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
              >
                <circle
                  cx="12"
                  cy="12"
                  r="5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m5.08 5.08l4.24 4.24M1 12h6m6 0h6M4.22 19.78l4.24-4.24m5.08-5.08l4.24-4.24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
              >
                <path
                  d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>

          <form onSubmit={submitNavSearch} className="relative hidden lg:block">
            {showSearch ? (
              <div className="relative">
                <input
                  ref={inputRef}
                  value={navQuery}
                  onChange={(e) => setNavQuery(e.target.value)}
                  placeholder="Buscar libros..."
                  aria-label="Buscar libros en el catálogo"
                  className="w-40 rounded-full border border-border bg-surface px-4 py-2 pr-9 text-sm text-text outline-none transition-all focus:ring-2 focus:ring-primary-subtle lg:w-56"
                />
                <button
                  type="button"
                  onClick={() => {
                    setShowSearch(false);
                    setNavQuery("");
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-text"
                  aria-label="Cerrar búsqueda"
                >
                  ✕
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowSearch(true)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-primary-subtle hover:text-primary"
                aria-label="Abrir búsqueda"
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden
                >
                  <circle
                    cx="11"
                    cy="11"
                    r="6.25"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M16 16l4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            )}
          </form>

          <NavLink
            to="/checkout"
            onClick={closeMobileMenu}
            title="Ver carrito de compras"
            className="relative inline-flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-primary-subtle hover:text-primary"
            aria-label={`Carrito${itemCount > 0 ? ` (${itemCount})` : ""}`}
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden
            >
              <path
                d="M9 8V6.5a3 3 0 0 1 6 0V8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M7.5 8h9l1 12h-11l1-12Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                {itemCount > 9 ? "9+" : itemCount}
              </span>
            )}
          </NavLink>

          <div className="hidden items-center gap-2 lg:flex">
            {isAuthenticated ? (
              <>
                {user?.role === "admin" && (
                  <NavLink
                    to="/admin"
                    onClick={closeMobileMenu}
                    title="Acceder al panel de administración"
                    className="rounded-full bg-secondary-subtle px-3 py-2 text-xs font-medium text-secondary transition-colors hover:bg-secondary/20 lg:px-4 lg:text-sm"
                  >
                    Dashboard
                  </NavLink>
                )}
                <NavLink
                  to="/profile"
                  onClick={closeMobileMenu}
                  title="Ver perfil"
                  className="rounded-full border border-border px-3 py-2 text-xs font-medium text-text transition-colors hover:border-primary hover:text-primary lg:px-4 lg:text-sm"
                >
                  Perfil
                </NavLink>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    closeMobileMenu();
                  }}
                  title="Cerrar sesión"
                  className="rounded-full bg-primary px-3 py-2 text-xs font-medium text-white transition-opacity hover:opacity-85 lg:px-4 lg:text-sm"
                >
                  Salir
                </button>
              </>
            ) : (
              <NavLink
                to="/login"
                onClick={closeMobileMenu}
                title="Iniciar sesión"
                className="rounded-full bg-primary px-3 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-85 lg:px-4 lg:text-sm"
              >
                Ingresar
              </NavLink>
            )}
          </div>

          <div ref={mobileMenuRef} className="relative lg:hidden">
            <button
              type="button"
              onClick={() => setShowMobileMenu((current) => !current)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-primary-subtle hover:text-primary"
              aria-label="Abrir menú"
              aria-expanded={showMobileMenu}
              aria-haspopup="menu"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
              >
                <path
                  d="M4 6h16M4 12h16M4 18h16"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            {showMobileMenu && (
              <div className="absolute right-0 top-full z-50 mt-3 w-[min(20rem,calc(100vw-2rem))] rounded-2xl border border-border bg-surface p-4 shadow-xl">
                <form onSubmit={submitNavSearch} className="mb-4">
                  <div className="flex gap-2">
                    <label htmlFor="mobile-nav-search" className="sr-only">
                      Buscar libros
                    </label>
                    <input
                      id="mobile-nav-search"
                      ref={inputRef}
                      value={navQuery}
                      onChange={(e) => setNavQuery(e.target.value)}
                      placeholder="Buscar libros..."
                      aria-label="Buscar libros"
                      className="min-w-0 flex-1 rounded-full border border-border bg-raised px-4 py-2.5 text-sm text-text outline-none transition-all focus:ring-2 focus:ring-primary-subtle"
                    />
                    <button
                      type="submit"
                      className="rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-85"
                    >
                      Ir
                    </button>
                  </div>
                </form>

                <nav className="space-y-2 border-b border-border pb-4">
                  {navLinks.map(({ label, href }) => (
                    <NavLink
                      key={href}
                      to={href}
                      onClick={closeMobileMenu}
                      title={`Ir a ${label.toLowerCase()}`}
                      className={({ isActive }) =>
                        isActive
                          ? "block rounded-lg bg-primary-subtle px-4 py-2.5 text-sm font-medium text-primary transition-colors"
                          : "block rounded-lg px-4 py-2.5 text-sm font-medium text-text transition-colors hover:bg-primary-subtle hover:text-primary"
                      }
                    >
                      {label}
                    </NavLink>
                  ))}
                </nav>

                <div className="mt-4 space-y-2">
                  {isAuthenticated ? (
                    <>
                      {user?.role === "admin" && (
                        <NavLink
                          to="/admin"
                          onClick={closeMobileMenu}
                          title="Acceder al panel de administración"
                          className="block rounded-lg bg-secondary-subtle px-4 py-2.5 text-sm font-medium text-secondary transition-colors hover:bg-secondary/20"
                        >
                          Dashboard Admin
                        </NavLink>
                      )}
                      <NavLink
                        to="/profile"
                        onClick={closeMobileMenu}
                        title="Ver perfil"
                        className="block rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-text transition-colors hover:border-primary hover:text-primary"
                      >
                        Mi Perfil
                      </NavLink>
                      <button
                        type="button"
                        onClick={() => {
                          logout();
                          closeMobileMenu();
                        }}
                        title="Cerrar sesión"
                        className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-85"
                      >
                        Salir
                      </button>
                    </>
                  ) : (
                    <NavLink
                      to="/login"
                      onClick={closeMobileMenu}
                      title="Iniciar sesión"
                      className="block rounded-lg bg-primary px-4 py-2.5 text-center text-sm font-semibold text-white transition-opacity hover:opacity-85"
                    >
                      Ingresar
                    </NavLink>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
