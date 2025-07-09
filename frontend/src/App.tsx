import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ComputersPage from "./pages/ComputersPage";
import LabsPage from "./pages/LabsPage";
import ReservationsPage from "./pages/ReservationsPage";
import UsersPage from "./pages/UsersPage";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen min-w-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto p-4">
          <Routes>
            <Route
              path="/"
              element={
                <h1 className="text-3xl font-bold">Bienvenido a LabReserve</h1>
              }
            />
            <Route path="/labs" element={<LabsPage />} />
            <Route path="/computers" element={<ComputersPage />} />
            <Route path="/reservations" element={<ReservationsPage />} />
            <Route path="/users" element={<UsersPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
