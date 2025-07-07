import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-300 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between">
        <div className="flex ">
          <Link
            to="/"
            className="text-2xl font-bold hover:text-blue-200 transition-colors"
          >
            LabReserve
          </Link>
        </div>

        <div className="flex space-x-4">
          <Link to="/labs" className="px-3 py-2 rounded text-xl font-bold">
            Laboratorios
          </Link>
          <Link
            to="/computers"
            className=" px-3 py-2 rounded text-xl font-bold"
          >
            Computadoras
          </Link>
          <Link
            to="/reservations"
            className=" px-3 py-2 rounded text-xl font-bold"
          >
            Reservas
          </Link>
          <Link to="/users" className=" px-3 py-2 rounded text-xl font-bold">
            Usuarios
          </Link>
        </div>
      </div>
    </nav>
  );
}
