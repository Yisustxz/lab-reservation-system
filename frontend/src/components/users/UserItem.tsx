import type { User } from "../../types/models";

interface UserItemProps {
  user: User;
  onEdit: () => void;
  onDelete: () => void;
}

export default function UserItem({ user, onEdit, onDelete }: UserItemProps) {
  const roleColors = {
    user: "bg-green-100 text-green-800",
    administrador: "bg-purple-100 text-purple-800",
    encargado: "bg-blue-100 text-blue-800",
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg">{user.nombre}</h3>
          <p className="text-gray-600 text-sm">{user.email}</p>
          <p className="text-gray-500 text-xs">Cédula: {user.cedula}</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={onEdit}
            className="text-blue-500 hover:text-blue-700 p-1"
            aria-label="Editar"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>
          <button
            onClick={onDelete}
            className="text-red-500 hover:text-red-700 p-1"
            aria-label="Eliminar"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="mt-3 pt-2 border-t border-gray-100">
        <span
          className={`text-xs px-2 py-1 rounded-full ${roleColors[user.rol]}`}
        >
          {user.rol.toUpperCase()}
        </span>
      </div>
    </div>
  );
}
