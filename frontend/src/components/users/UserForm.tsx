import { useEffect, useState } from "react";
import type { User } from "../../types/models";

interface UserFormProps {
  user?: User | null;
  onSubmit: (userData: Omit<User, "id">) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

const roles = [
  { value: "user", label: "Usuario" },
  { value: "administrador", label: "Administrador" },
  { value: "encargado", label: "Encargado" },
];

export default function UserForm({
  user,
  onSubmit,
  onCancel,
  isLoading,
}: UserFormProps) {
  const [formData, setFormData] = useState<Omit<User, "id">>({
    nombre: "",
    email: "",
    cedula: "",
    rol: "user",
    password: "",
  });

  const [errors, setErrors] = useState<Partial<User>>({});

  useEffect(() => {
    if (user) {
      setFormData({
        nombre: user.nombre,
        email: user.email,
        cedula: user.cedula,
        rol: user.rol,
        password: "",
      });
    }
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof User]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors: Partial<User> = {};
    if (!formData.nombre.trim()) newErrors.nombre = "Nombre es requerido";
    if (!formData.email.includes("@")) newErrors.email = "Email inválido";
    if (!formData.cedula.trim()) newErrors.cedula = "Cédula es requerida";
    if (!user && !formData.password)
      newErrors.password = "Contraseña es requerida";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const dataToSubmit = {
      nombre: formData.nombre,
      email: formData.email,
      cedula: formData.cedula,
      rol: formData.rol,
      ...((!user || formData.password?.trim()) && {
        password: formData.password,
      }),
    };

    await onSubmit(dataToSubmit);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto animate-fade-in">
      <h2 className="text-xl font-semibold mb-4">
        {user ? "Editar Usuario" : "Nuevo Usuario"}
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre *
            </label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.nombre ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.nombre && (
              <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cédula *
            </label>
            <input
              type="text"
              name="cedula"
              value={formData.cedula}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.cedula ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.cedula && (
              <p className="text-red-500 text-xs mt-1">{errors.cedula}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rol *
            </label>
            <select
              name="rol"
              value={formData.rol}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              {roles.map(role => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {user ? "Nueva Contraseña" : "Contraseña *"}
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              placeholder={user ? "Dejar en blanco para no cambiar" : ""}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </form>
    </div>
  );
}
