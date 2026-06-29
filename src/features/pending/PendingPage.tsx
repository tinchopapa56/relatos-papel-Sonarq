export default function PendingPage() {
  return (
    <main className="flex flex-1 flex-col p-8 gap-8">
      <div>
        <h1 className="text-3xl font-bold text-heading">
          Guía de Estilos y Pendientes
        </h1>
        <p className="mt-2 text-muted">
          Referencia de diseño para el equipo de Relatos de Papel.
        </p>
      </div>

      <section className="grid gap-6 md:grid-cols-2">
        {/* Colores y Tokens */}
        <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-heading mb-4">
            Tokens de Diseño
          </h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-6 w-6 rounded bg-heading" />
              <p className="text-heading font-medium text-sm">
                text-heading — Títulos y encabezados (#08060d)
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-6 w-6 rounded bg-muted" />
              <p className="text-muted text-sm">
                text-muted — Texto secundario y descripciones (#6b6375)
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-6 w-6 rounded bg-primary" />
              <p className="text-primary font-medium text-sm">
                text-primary — Acciones, links y énfasis (#aa3bff)
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-6 w-6 rounded bg-error" />
              <p className="text-error text-sm font-medium">
                text-error — Errores y alertas (#dc2626)
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-6 w-6 rounded bg-success" />
              <p className="text-success text-sm font-medium">
                text-success — Confirmaciones y éxito (#16a34a)
              </p>
            </div>
          </div>
        </div>

        {/* Lista de Tareas según TAREAS.md */}
        <div className="rounded-xl border border-border bg-raised p-6">
          <h2 className="text-xl font-semibold text-heading mb-4">Módulos:</h2>
          <ul className="space-y-4">
            <li className="flex items-start gap-2">
              <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-success text-[10px] text-white">
                ✓
              </span>
              <div className="text-sm">
                <span className="font-bold text-heading">
                  Catálogo de Libros:
                </span>{" "}
                Finalizado. Incluye búsqueda y grid responsivo.
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-success text-[10px] text-white">
                ✓
              </span>
              <div className="text-sm">
                <span className="font-bold text-heading">Vista de Libro:</span>{" "}
                Finalizada. Muestra detalle y botón de compra.
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-success text-[10px] text-white">
                ✓
              </span>
              <div className="text-sm">
                <span className="font-bold text-heading">
                  Carrito / Checkout:
                </span>{" "}
                Finalizado. Incluye contexto global, contador en navbar, ajuste
                de cantidades y formulario de entrega con Formik.
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-success text-[10px] text-white">
                ✓
              </span>
              <div className="text-sm">
                <span className="font-bold text-heading">
                  Perfil de Usuario:
                </span>{" "}
                Finalizado. Muestra información del lector y los últimos 5
                pedidos realizados.
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-success text-[10px] text-white">
                ✓
              </span>
              <div className="text-sm">
                <span className="font-bold text-heading">Dashboard Admin:</span>{" "}
                Finalizado. Gestión de inventario, usuarios y pedidos físicos
                con paginación y búsqueda.
              </div>
            </li>
          </ul>
        </div>
      </section>

      <div className="rounded-lg bg-primary-subtle p-4 text-primary text-sm">
        <strong>Nota:</strong> Todos los componentes nuevos deben usar las
        clases de Tailwind definidas arriba para mantener la coherencia visual.
      </div>
    </main>
  );
}
