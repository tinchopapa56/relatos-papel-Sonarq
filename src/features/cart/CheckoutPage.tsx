import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCart } from "./CartContext";
import { QuantityCounter, Dialog } from "@/shared";

const SHIPPING_OPTIONS = [
  {
    value: "digital",
    label: "Envío digital",
    subtitle: "Entrega inmediata por email",
    cost: 0,
  },
  {
    value: "standard",
    label: "Envío estándar",
    subtitle: "3-5 días hábiles",
    cost: 10,
  },
];

const COUNTRIES = [
  "Argentina",
  "Bolivia",
  "Brasil",
  "Chile",
  "Colombia",
  "Ecuador",
  "México",
  "Paraguay",
  "Perú",
  "Uruguay",
  "Venezuela",
];

const isPhysical = (method: string) => method !== "digital";

const validationSchema = Yup.object({
  shippingMethod: Yup.string().oneOf(["digital", "standard"]).required(),

  deliveryEmail: Yup.string().when("shippingMethod", {
    is: "digital",
    then: (s) => s.email("Email inválido").required("Requerido"),
    otherwise: (s) => s.optional(),
  }),

  firstName: Yup.string().when("shippingMethod", {
    is: isPhysical,
    then: (s) => s.required("Requerido"),
    otherwise: (s) => s.optional(),
  }),
  lastName: Yup.string().when("shippingMethod", {
    is: isPhysical,
    then: (s) => s.required("Requerido"),
    otherwise: (s) => s.optional(),
  }),
  phone: Yup.string().when("shippingMethod", {
    is: isPhysical,
    then: (s) => s.required("Requerido"),
    otherwise: (s) => s.optional(),
  }),
  country: Yup.string().when("shippingMethod", {
    is: isPhysical,
    then: (s) => s.required("Requerido"),
    otherwise: (s) => s.optional(),
  }),
  city: Yup.string().when("shippingMethod", {
    is: isPhysical,
    then: (s) => s.required("Requerido"),
    otherwise: (s) => s.optional(),
  }),
  streetAddress: Yup.string().when("shippingMethod", {
    is: isPhysical,
    then: (s) => s.required("Requerido"),
    otherwise: (s) => s.optional(),
  }),
});

const inputBase =
  "w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-text placeholder:text-muted outline-none transition-colors focus:border-primary";
const inputError = "border-error";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, subtotal, updateQuantity, removeItem, clearCart } = useCart();
  const [orderTotal, setOrderTotal] = useState<number | null>(null);

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: {
      shippingMethod: "standard",
      deliveryEmail: "",
      firstName: "",
      lastName: "",
      phone: "",
      country: "",
      city: "",
      streetAddress: "",
    },
    validationSchema,
    onSubmit: async () => {
      // Simular procesamiento del pedido
      setOrderTotal(subtotal + shippingCost);
    },
  });

  const selectedOption = SHIPPING_OPTIONS.find(
    (o) => o.value === values.shippingMethod,
  );
  const shippingCost =
    values.shippingMethod === "standard" && subtotal >= 50
      ? 0
      : (selectedOption?.cost ?? 0);
  const isDigital = values.shippingMethod === "digital";

  const fieldError = (name: keyof typeof errors) =>
    touched[name] && errors[name] ? (
      <p className="mt-1 text-xs text-error">{String(errors[name])}</p>
    ) : null;

  return (
    <main className="flex flex-1 flex-col gap-8 px-6 py-8 sm:px-10 lg:px-16">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-muted">
        <span>Carrito</span>
        <span>›</span>
        <span className="font-medium text-text">Envío</span>
        <span>›</span>
        <span>Pago</span>
      </nav>

      <form noValidate onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_400px]">
          {/* ── Left: Delivery information ── */}
          <section className="flex flex-col gap-6">
            <h2>Información de entrega</h2>

            {/* ── Shipping method — PRIMERO ── */}
            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium text-muted">Método de envío</p>
              {SHIPPING_OPTIONS.map((opt) => (
                <label
                  key={opt.value}
                  className={`flex cursor-pointer items-center justify-between rounded-lg border px-4 py-3 transition-colors ${
                    values.shippingMethod === opt.value
                      ? "border-primary bg-primary-subtle"
                      : "border-border bg-surface hover:border-primary"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shippingMethod"
                      value={opt.value}
                      checked={values.shippingMethod === opt.value}
                      onChange={() =>
                        setFieldValue("shippingMethod", opt.value)
                      }
                      className="accent-primary"
                    />
                    <div>
                      <p className="text-sm font-medium text-text">
                        {opt.label}
                      </p>
                      <p className="text-xs text-muted">{opt.subtitle}</p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-text">
                    {opt.cost === 0 ? "Gratis" : `$${opt.cost.toFixed(2)}`}
                  </span>
                </label>
              ))}
            </div>

            {/* ── Campos condicionales ── */}
            {isDigital ? (
              /* Solo email para envío digital */
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted">
                  Email de entrega
                </label>
                <input
                  name="deliveryEmail"
                  type="email"
                  placeholder="tu@email.com"
                  value={values.deliveryEmail}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`${inputBase} ${touched.deliveryEmail && errors.deliveryEmail ? inputError : ""}`}
                />
                {fieldError("deliveryEmail")}
                <p className="mt-2 text-xs text-muted">
                  Recibirás el archivo del libro en esta dirección de correo.
                </p>
              </div>
            ) : (
              /* Campos de dirección física */
              <>
                {/* Name row */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-muted">
                      Nombre
                    </label>
                    <input
                      name="firstName"
                      placeholder="Ingresá tu nombre"
                      value={values.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`${inputBase} ${touched.firstName && errors.firstName ? inputError : ""}`}
                    />
                    {fieldError("firstName")}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-muted">
                      Apellido
                    </label>
                    <input
                      name="lastName"
                      placeholder="Ingresá tu apellido"
                      value={values.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`${inputBase} ${touched.lastName && errors.lastName ? inputError : ""}`}
                    />
                    {fieldError("lastName")}
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-muted">
                    Teléfono
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    placeholder="Ingresá tu número de teléfono"
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`${inputBase} ${touched.phone && errors.phone ? inputError : ""}`}
                  />
                  {fieldError("phone")}
                </div>

                {/* Country + City */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-muted">
                      País
                    </label>
                    <select
                      name="country"
                      value={values.country}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`${inputBase} ${touched.country && errors.country ? inputError : ""}`}
                    >
                      <option value="">Seleccioná un país</option>
                      {COUNTRIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                    {fieldError("country")}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-muted">
                      Ciudad
                    </label>
                    <input
                      name="city"
                      placeholder="Ingresá tu ciudad"
                      value={values.city}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`${inputBase} ${touched.city && errors.city ? inputError : ""}`}
                    />
                    {fieldError("city")}
                  </div>
                </div>

                {/* Street address */}
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-muted">
                    Dirección
                  </label>
                  <input
                    name="streetAddress"
                    placeholder="Calle, número, piso, depto."
                    value={values.streetAddress}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`${inputBase} ${touched.streetAddress && errors.streetAddress ? inputError : ""}`}
                  />
                  {fieldError("streetAddress")}
                </div>
              </>
            )}
          </section>

          {/* ── Right: Order summary ── */}
          <aside className="flex flex-col gap-4 rounded-xl border border-border bg-raised p-6">
            <h2>Resumen del pedido</h2>

            {items.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted">
                Tu carrito está vacío.
              </p>
            ) : (
              <ul className="flex flex-col divide-y divide-border">
                {items.map(({ book, quantity }) => (
                  <li key={book.id} className="flex items-center gap-3 py-3">
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className="h-14 w-10 flex-shrink-0 rounded object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-text">
                        {book.title}
                      </p>
                      <p className="truncate text-xs text-muted">
                        {book.author}
                      </p>
                      <p className="mt-0.5 text-sm font-semibold text-text">
                        ${book.price.toFixed(2)}
                      </p>
                    </div>
                    <QuantityCounter
                      quantity={quantity}
                      onDecrement={() => updateQuantity(book.id, quantity - 1)}
                      onIncrement={() => updateQuantity(book.id, quantity + 1)}
                      onRemove={() => removeItem(book.id)}
                    />
                  </li>
                ))}
              </ul>
            )}

            {/* Totals */}
            <div className="mt-2 flex flex-col gap-2 border-t border-border pt-4 text-sm">
              <div className="flex justify-between text-muted">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted">
                <span>Envío</span>
                <span>
                  {shippingCost === 0
                    ? "Gratis"
                    : `$${shippingCost.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between border-t border-border pt-2 text-base font-semibold text-text">
                <span>Total</span>
                <span>${(subtotal + shippingCost).toFixed(2)}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || items.length === 0}
              className="mt-2 w-full rounded-full bg-primary py-3 text-sm font-semibold text-white transition-opacity hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? "Procesando…" : "Continuar al pago"}
            </button>
          </aside>
        </div>
      </form>

      <Dialog
        open={orderTotal !== null}
        title="¡Pedido realizado con éxito!"
        footer={
          <button
            type="button"
            onClick={() => {
              setOrderTotal(null);
              clearCart();
              navigate("/books");
            }}
            className="rounded-full bg-primary px-6 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-85"
          >
            Volver al catálogo
          </button>
        }
        onClose={() => {
          setOrderTotal(null);
          clearCart();
          navigate("/books");
        }}
      >
        <p>Tu pedido fue procesado correctamente.</p>
        <p className="mt-2 text-base font-semibold text-heading">
          Total abonado: ${orderTotal?.toFixed(2)}
        </p>
      </Dialog>
    </main>
  );
}
