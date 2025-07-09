import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  createLab,
  deleteLab,
  fetchLabs,
  updateLab,
} from "../../api/labServices";
import type { Lab } from "../../types/models";
import { extractErrorMessage } from "../../utils/errorHandler";
import LabForm from "./LabForm";
import LabItem from "./LabItem";

const mockLabs = [
  { id: 1, nombre: "Laboratorio de Computación #1" },
  { id: 2, nombre: "Lab. Redes Avanzadas" },
  { id: 3, nombre: "Sala de Desarrollo" },
  { id: 4, nombre: "Laboratorio Multimedia" },
  { id: 5, nombre: "Centro de Cómputo Principal" },
];

export default function LabList() {
  const [labs, setLabs] = useState<Lab[]>(mockLabs);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingLab, setEditingLab] = useState<Lab | null>(null);

  useEffect(() => {
    const loadLabs = async () => {
      try {
        const data = await fetchLabs();
        setLabs(data);
      } catch (error) {
        toast.error(
          `Error al cargar laboratorios: ${extractErrorMessage(error)}`
        );
      } finally {
        setLoading(false);
      }
    };
    loadLabs();
  }, []);

  const handleSubmit = async (labData: Omit<Lab, "id">) => {
    try {
      if (editingLab) {
        const updatedLab = await updateLab(editingLab.id, labData);
        setLabs(labs.map(l => (l.id === editingLab.id ? updatedLab : l)));
        toast.success("Laboratorio actualizado exitosamente");
      } else {
        const newLab = await createLab(labData);
        setLabs([...labs, newLab]);
        toast.success("Laboratorio creado exitosamente");
      }
      setShowForm(false);
    } catch (error) {
      toast.error(
        `${
          editingLab
            ? "Error al actualizar laboratorio"
            : "Error al crear laboratorio"
        }: ${extractErrorMessage(error)}`
      );
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("¿Estás seguro de eliminar este laboratorio?")) {
      try {
        await deleteLab(id);
        setLabs(labs.filter(lab => lab.id !== id));
        toast.success("Laboratorio eliminado exitosamente");
      } catch (error) {
        toast.error(
          `Error al eliminar laboratorio: ${extractErrorMessage(error)}`
        );
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Laboratorios</h2>
        <button
          onClick={() => {
            setEditingLab(null);
            setShowForm(true);
          }}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          + Nuevo Laboratorio
        </button>
      </div>

      {showForm && (
        <LabForm
          lab={editingLab}
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}

      {loading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {labs.map(lab => (
            <LabItem
              key={lab.id}
              lab={lab}
              onEdit={() => {
                setEditingLab(lab);
                setShowForm(true);
              }}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
