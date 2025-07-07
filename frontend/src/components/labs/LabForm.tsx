import { useEffect, useState } from "react";
import type { Lab } from "../../types/models";

interface LabFormProps {
  lab?: Lab | null;
  onSubmit: (labData: Omit<Lab, "id">) => Promise<void> | void;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function LabForm({
  lab,
  onSubmit,
  onCancel,
  isLoading = false,
}: LabFormProps) {
  const [formData, setFormData] = useState<Omit<Lab, "id">>({
    nombre: "",
  });

  const [errors, setErrors] = useState<Partial<Omit<Lab, "id">>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (lab) {
      setFormData({
        nombre: lab.nombre,
      });
    }
  }, [lab]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // Validación en tiempo real después de tocar el campo
    if (touched[name]) {
      validateField(name, value);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  const validateField = (name: string, value: string) => {
    let error = "";

    if (name === "nombre") {
      if (!value.trim()) {
        error = "El nombre es requerido";
      } else if (value.length > 50) {
        error = "Máximo 50 caracteres";
      }
    }

    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const validateForm = () => {
    const newErrors: Partial<Omit<Lab, "id">> = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es requerido";
    } else if (formData.nombre.length > 50) {
      newErrors.nombre = "Máximo 50 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await onSubmit(formData);
    } catch (error) {
      console.error("Error en el formulario:", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg animate-fade-in max-w-md mx-auto">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">
        {lab ? "Editar Laboratorio" : "Nuevo Laboratorio"}
      </h3>

      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-4">
          <label
            htmlFor="nombre"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Nombre del Laboratorio *
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none text-black focus:ring-2 ${
              errors.nombre
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:ring-blue-500"
            }`}
            required
            maxLength={50}
          />
          {errors.nombre && (
            <p className="mt-1 text-sm text-red-600">{errors.nombre}</p>
          )}
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className=" bg-blue-500 px-4 py-2 border border-gray-300 rounded-md"
          >
            Cancelar
          </button>

          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                {lab ? "Actualizando..." : "Creando..."}
              </span>
            ) : (
              <span>{lab ? "Actualizar" : "Crear"}</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
