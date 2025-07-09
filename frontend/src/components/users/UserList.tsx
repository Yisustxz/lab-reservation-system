import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  createUser,
  deleteUser,
  fetchUsers,
  updateUser,
} from "../../api/userService";
import type { User } from "../../types/models";
import { extractErrorMessage } from "../../utils/errorHandler";
import UserForm from "./UserForm";
import UserItem from "./UserItem";

const mockUsers: User[] = [];

export default function UserList() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers();
        console.log("data-->", data);
        setUsers(data);
      } catch (error) {
        toast.error(`Error al cargar usuarios: ${extractErrorMessage(error)}`);
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm("¿Estás seguro de eliminar este usuario?")) {
      try {
        await deleteUser(id);
        setUsers(users.filter(user => user.id !== id));
        toast.success("Usuario eliminado exitosamente");
      } catch (error) {
        toast.error(`Error al eliminar usuario: ${extractErrorMessage(error)}`);
      }
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
                toast.success("Usuario actualizado exitosamente");
              } else {
                const newUser = await createUser(userData);
                setUsers([...users, newUser]);
                toast.success("Usuario creado exitosamente");
              }
              setShowForm(false);
            } catch (error) {
              toast.error(
                `${
                  editingUser
                    ? "Error al actualizar usuario"
                    : "Error al crear usuario"
                }: ${extractErrorMessage(error)}`
              );
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
