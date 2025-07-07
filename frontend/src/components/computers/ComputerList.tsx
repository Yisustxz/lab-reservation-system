import { useEffect, useState } from "react";
import {
  createComputer,
  deleteComputer,
  fetchComputers,
  updateComputer,
} from "../../api/computerService";
import type { Computer } from "../../types/models";
import ComputerForm from "./ComputerForm";
import ComputerItem from "./ComputerItem";

const mockComputers = [
  { id: 1, nombre: "PC-001", lab_id: 1 },
  { id: 2, nombre: "PC-002", lab_id: 1 },
  { id: 3, nombre: "WS-101", lab_id: 2 },
  { id: 4, nombre: "MAC-202", lab_id: 3 },
  { id: 5, nombre: "PC-GAMER", lab_id: 4 },
  { id: 6, nombre: "SERVER-01", lab_id: 5 },
];

export default function ComputerList() {
  const [computers, setComputers] = useState<Computer[]>(mockComputers);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingComputer, setEditingComputer] = useState<Computer | null>(null);

  useEffect(() => {
    const loadComputers = async () => {
      try {
        const data = await fetchComputers();
        setComputers(data);
      } finally {
        setLoading(false);
      }
    };
    loadComputers();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm("¿Eliminar esta computadora?")) {
      await deleteComputer(id);
      setComputers(computers.filter(c => c.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Computadoras</h2>
        <button
          onClick={() => {
            setEditingComputer(null);
            setShowForm(true);
          }}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          + Nueva Computadora
        </button>
      </div>

      {showForm && (
        <ComputerForm
          computer={editingComputer}
          onSubmit={async formData => {
            if (editingComputer) {
              const updated = await updateComputer(
                editingComputer.id,
                formData
              );
              setComputers(
                computers.map(c => (c.id === editingComputer.id ? updated : c))
              );
            } else {
              const newComputer = await createComputer(formData);
              setComputers([...computers, newComputer]);
            }
            setShowForm(false);
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
          {computers.map(computer => (
            <ComputerItem
              key={computer.id}
              computer={computer}
              onEdit={() => {
                setEditingComputer(computer);
                setShowForm(true);
              }}
              onDelete={() => handleDelete(computer.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
