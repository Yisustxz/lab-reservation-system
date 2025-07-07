import { useEffect, useState } from "react";
import { fetchLabs } from "../../api/labServices";
import type { Computer } from "../../types/models";

interface ComputerFormProps {
  computer?: Computer | null;
  onSubmit: (formData: Omit<Computer, "id">) => void;
  onCancel: () => void;
}

export default function ComputerForm({
  computer,
  onSubmit,
  onCancel,
}: ComputerFormProps) {
  const [formData, setFormData] = useState<Omit<Computer, "id">>({
    nombre: "",
    lab_id: 0,
  });

  const [labs, setLabs] = useState<{ id: number; nombre: string }[]>([]);
  const [errors, setErrors] = useState<{ nombre?: string; lab_id?: string }>(
    {}
  );

  useEffect(() => {
    const loadLabs = async () => {
      const labsData = await fetchLabs();
      setLabs(labsData.map(lab => ({ id: lab.id, nombre: lab.nombre })));
    };
    loadLabs();

    if (computer) {
      setFormData({
        nombre: computer.nombre,
        lab_id: computer.lab_id,
      });
    }
  }, [computer]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "lab_id" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validación simple
    const newErrors: { nombre?: string; lab_id?: string } = {};
    if (!formData.nombre.trim()) newErrors.nombre = "Nombre es requerido";
    if (!formData.lab_id) newErrors.lab_id = "Laboratorio es requerido";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    onSubmit(formData);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">
        {computer ? "Editar Computadora" : "Nueva Computadora"}
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
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

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Laboratorio *
          </label>
          <select
            name="lab_id"
            value={formData.lab_id}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md ${
              errors.lab_id ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value={0}>Seleccione un laboratorio</option>
            {labs.map(lab => (
              <option key={lab.id} value={lab.id}>
                {lab.nombre}
              </option>
            ))}
          </select>
          {errors.lab_id && (
            <p className="text-red-500 text-xs mt-1">{errors.lab_id}</p>
          )}
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
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
            {computer ? "Actualizar" : "Crear"}
          </button>
        </div>
      </form>
    </div>
  );
}
