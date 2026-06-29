import { Navigate ,Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { LandingPage } from "@/features/landing";
import { LoginPage, RegisterPage } from "@/features/auth";
import { BookDetailPage, BookCatalogPage } from "@/features/books";
import { CheckoutPage } from "@/features/cart";
import { ProfilePage } from "@/features/profile";
import {
  AdminLayout,
  DashboardPage,
  InventoryPage,
  UsersPage,
  OrdersPage,
} from "@/features/admin";

// import PendingPage from "@/features/pending/PendingPage";

export default function AppRouter() {
  return (
    <div className="flex flex-1 flex-col">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />{" "}
        <Route path="/books" element={<BookCatalogPage />} />
        <Route path="/books/:id" element={<BookDetailPage />} />
        <Route path="/book" element={<Navigate to="/books" replace />} />
        {/* <Route path="/pending" element={<PendingPage />} /> */}
        <Route element={<ProtectedRoute />}>
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
        <Route element={<ProtectedRoute adminOnly />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<DashboardPage />} />
            <Route path="/admin/inventory" element={<InventoryPage />} />
            <Route path="/admin/users" element={<UsersPage />} />
            <Route path="/admin/orders" element={<OrdersPage />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}
