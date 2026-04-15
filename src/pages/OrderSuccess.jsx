import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function OrderSuccess() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center">
        <div className="text-center p-10 border rounded-2xl">
          <h1 className="text-3xl font-bold text-green-600">
            🎉 Order Successful
          </h1>

          <div className="mt-6 flex gap-4 justify-center">
            <Link to="/orders" className="bg-orange-500 text-white px-6 py-3 rounded-xl">
              View Orders
            </Link>

            <Link to="/products" className="border px-6 py-3 rounded-xl">
              Shop Again
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
