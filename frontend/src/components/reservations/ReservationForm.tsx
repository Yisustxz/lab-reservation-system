import { useEffect, useState } from "react";
import { fetchComputers } from "../../api/computerService";
import { fetchUsers } from "../../api/userService";
import type { Reservation } from "../../types/models";

interface ReservationFormProps {
  reservation?: Reservation | null;
  onSubmit: (data: Omit<Reservation, "id">) => void;
  onCancel: () => void;
}

const statusOptions = [
  { value: "pendiente", label: "Pendiente" },
  { value: "confirmada", label: "Confirmada" },
  { value: "cancelada", label: "Cancelada" },
  { value: "completada", label: "Completada" },
];

const durationOptions = [
  { value: 30, label: "30 minutos" },
  { value: 60, label: "1 hora" },
  { value: 90, label: "1.5 horas" },
  { value: 120, label: "2 horas" },
  { value: 180, label: "3 horas" },
  { value: 240, label: "4 horas" },
];

export default function ReservationForm({
  reservation,
  onSubmit,
  onCancel,
}: ReservationFormProps) {
  const [formData, setFormData] = useState<Omit<Reservation, "id">>({
    user_id: 0,
    computer_id: 0,
    fecha: "",
    hora: "",
    duracion: 60,
    estado: "pendiente",
  });

  const [users, setUsers] = useState<{ id: number; nombre: string }[]>([]);
  const [computers, setComputers] = useState<{ id: number; nombre: string }[]>(
    []
  );
  type ReservationFormErrors = {
    user_id?: string;
    computer_id?: string;
    fecha?: string;
    hora?: string;
  };
  const [errors, setErrors] = useState<ReservationFormErrors>({});

  const normalizeDate = (dateString: string): string => {
    if (!dateString) return "";

    // If it's already in YYYY-MM-DD format, return as is
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
      return dateString;
    }

    // Try to parse and convert to YYYY-MM-DD
    try {
      const date = new Date(dateString);
      if (!isNaN(date.getTime())) {
        return date.toISOString().split("T")[0];
      }
    } catch (error) {
      console.error("Error parsing date:", error);
    }

    return "";
  };

  const normalizeTime = (timeString: string): string => {
    if (!timeString) return "";

    // If it's already in HH:MM format, return as is
    if (/^\d{2}:\d{2}$/.test(timeString)) {
      return timeString;
    }

    // Handle formats like "15:00:00", "15:00:00.000", "15:00:00.000Z"
    if (timeString.includes(":")) {
      const parts = timeString.split(":");
      if (parts.length >= 2) {
        const hours = parts[0].padStart(2, "0");
        const minutes = parts[1].split(".")[0].padStart(2, "0"); // Remove seconds/milliseconds

        // Validate that hours and minutes are valid
        const h = parseInt(hours);
        const m = parseInt(minutes);
        if (h >= 0 && h <= 23 && m >= 0 && m <= 59) {
          return `${hours}:${minutes}`;
        }
      }
    }

    // Handle single digit hours like "9:00" -> "09:00"
    if (/^\d:\d{2}$/.test(timeString)) {
      return `0${timeString}`;
    }

    // Try to parse as a time string with Date
    try {
      const date = new Date(`2000-01-01T${timeString}`);
      if (!isNaN(date.getTime())) {
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        return `${hours}:${minutes}`;
      }
    } catch (error) {
      console.error("Error parsing time:", error);
    }

    console.warn("Could not normalize time:", timeString);
    return timeString;
  };

  useEffect(() => {
    const loadData = async () => {
      const usersData = await fetchUsers();
      setUsers(usersData.map(user => ({ id: user.id, nombre: user.nombre })));

      const computersData = await fetchComputers();
      setComputers(
        computersData.map(comp => ({ id: comp.id, nombre: comp.nombre }))
      );
    };
    loadData();

    // Test normalizeTime function
    console.log("Testing normalizeTime:");
    console.log("15:00:00 ->", normalizeTime("15:00:00"));
    console.log("15:00:00.000 ->", normalizeTime("15:00:00.000"));
    console.log("15:00:00.000Z ->", normalizeTime("15:00:00.000Z"));
    console.log("9:00 ->", normalizeTime("9:00"));
    console.log("15:00 ->", normalizeTime("15:00"));
  }, []);

  useEffect(() => {
    if (reservation) {
      console.log("Editing reservation:", reservation);
      console.log("Original hora:", reservation.hora);
      console.log("Normalized hora:", normalizeTime(reservation.hora));
      setFormData({
        user_id: reservation.user_id,
        computer_id: reservation.computer_id,
        fecha: normalizeDate(reservation.fecha),
        hora: normalizeTime(reservation.hora),
        duracion: reservation.duracion || 60,
        estado: reservation.estado || "pendiente",
      });
    } else {
      setFormData({
        user_id: 0,
        computer_id: 0,
        fecha: "",
        hora: "",
        duracion: 60,
        estado: "pendiente",
      });
    }
  }, [reservation]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]:
        name.endsWith("_id") || name === "duracion" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: ReservationFormErrors = {};
    if (!formData.user_id) newErrors.user_id = "Usuario es requerido";
    if (!formData.computer_id)
      newErrors.computer_id = "Computadora es requerida";
    if (!formData.fecha) newErrors.fecha = "Fecha es requerida";
    if (!formData.hora) newErrors.hora = "Hora es requerida";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    console.log("Submitting form data:", formData);
    onSubmit(formData);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">
        {reservation ? "Editar Reservación" : "Nueva Reservación"}
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Usuario *
            </label>
            <select
              name="user_id"
              value={formData.user_id}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.user_id ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value={0}>Seleccione un usuario</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.nombre}
                </option>
              ))}
            </select>
            {errors.user_id && (
              <p className="text-red-500 text-xs mt-1">{errors.user_id}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Computadora *
            </label>
            <select
              name="computer_id"
              value={formData.computer_id}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.computer_id ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value={0}>Seleccione una computadora</option>
              {computers.map(comp => (
                <option key={comp.id} value={comp.id}>
                  {comp.nombre}
                </option>
              ))}
            </select>
            {errors.computer_id && (
              <p className="text-red-500 text-xs mt-1">{errors.computer_id}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha *
              </label>
              <input
                type="date"
                name="fecha"
                value={formData.fecha}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.fecha ? "border-red-500" : "border-gray-300"
                }`}
                min={new Date().toISOString().split("T")[0]}
              />
              {errors.fecha && (
                <p className="text-red-500 text-xs mt-1">{errors.fecha}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hora *
              </label>
              <input
                type="time"
                name="hora"
                value={formData.hora}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.hora ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.hora && (
                <p className="text-red-500 text-xs mt-1">{errors.hora}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duración
              </label>
              <select
                name="duracion"
                value={formData.duracion}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                {durationOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Estado
              </label>
              <select
                name="estado"
                value={formData.estado}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                {statusOptions.map(status => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            {reservation ? "Actualizar" : "Crear"}
          </button>
        </div>
      </form>
    </div>
  );
}
