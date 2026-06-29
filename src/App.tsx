import { Navbar } from "./shared";
import AppRouter from "./router/AppRouter";
import { CartProvider } from "@/features/cart";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();

  return (
    <CartProvider>
      <div className="flex min-h-screen flex-col">
        <Navbar key={location.pathname} />
        <AppRouter />
      </div>
    </CartProvider>
  );
}

export default App;
