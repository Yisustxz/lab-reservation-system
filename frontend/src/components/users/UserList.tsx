import { useEffect, useState } from "react";
import {
  createUser,
  deleteUser,
  fetchUsers,
  updateUser,
} from "../../api/userService";
import type { User } from "../../types/models";
import UserForm from "./UserForm";
import UserItem from "./UserItem";

const mockUsers: User[] = [
  {
    id: 1,
    nombre: "María González",
    email: "maria@universidad.edu",
    cedula: "V-12345678",
    rol: "admin",
  },
  {
    id: 2,
    nombre: "Prof. Carlos Rojas",
    email: "crojas@universidad.edu",
    cedula: "V-87654321",
    rol: "docente",
  },
  {
    id: 3,
    nombre: "Estudiante Pedro Pérez",
    email: "pperes@estudio.edu",
    cedula: "E-11223344",
    rol: "estudiante",
  },
];

export default function UserList() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm("¿Estás seguro de eliminar este usuario?")) {
      await deleteUser(id);
      setUsers(users.filter(user => user.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gestión de Usuarios</h2>
        <button
          onClick={() => {
            setEditingUser(null);
            setShowForm(true);
          }}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          + Nuevo Usuario
        </button>
      </div>

      {showForm && (
        <UserForm
          user={editingUser}
          onSubmit={async userData => {
            try {
              if (editingUser) {
                const updatedUser = await updateUser(editingUser.id, userData);
                setUsers(
                  users.map(u => (u.id === editingUser.id ? updatedUser : u))
                );
              } else {
                const newUser = await createUser(userData);
                setUsers([...users, newUser]);
              }
              setShowForm(false);
            } catch (error) {
              console.error("Error saving user:", error);
            }
          }}
          onCancel={() => setShowForm(false)}
        />
      )}

      {loading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map(user => (
            <UserItem
              key={user.id}
              user={user}
              onEdit={() => {
                setEditingUser(user);
                setShowForm(true);
              }}
              onDelete={() => handleDelete(user.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
