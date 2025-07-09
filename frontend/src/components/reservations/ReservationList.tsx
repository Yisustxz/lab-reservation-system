import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  createReservation,
  deleteReservation,
  fetchReservations,
  updateReservation,
} from "../../api/reservationService";
import type { Reservation } from "../../types/models";
import { extractErrorMessage } from "../../utils/errorHandler";
import ReservationForm from "./ReservationForm";
import ReservationItem from "./ReservationItem";

const mockReservations: Reservation[] = [
  {
    id: 1,
    user_id: 2,
    computer_id: 3,
    fecha: new Date().toISOString().split("T")[0], // Fecha actual
    hora: "09:00",
    duracion: 90,
    estado: "confirmada",
  },
  {
    id: 2,
    user_id: 3,
    computer_id: 1,
    fecha: new Date(Date.now() + 86400000).toISOString().split("T")[0], // Mañana
    hora: "14:30",
    duracion: 60,
    estado: "pendiente",
  },
];

export default function ReservationList() {
  const [reservations, setReservations] =
    useState<Reservation[]>(mockReservations);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingReservation, setEditingReservation] =
    useState<Reservation | null>(null);

  useEffect(() => {
    const loadReservations = async () => {
      try {
        const data = await fetchReservations();
        setReservations(data);
      } catch (error) {
        toast.error(
          `Error al cargar reservaciones: ${extractErrorMessage(error)}`
        );
      } finally {
        setLoading(false);
      }
    };
    loadReservations();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm("¿Eliminar esta reservación?")) {
      try {
        await deleteReservation(id);
        setReservations(reservations.filter(r => r.id !== id));
        toast.success("Reservación eliminada exitosamente");
      } catch (error) {
        toast.error(
          `Error al eliminar reservación: ${extractErrorMessage(error)}`
        );
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Reservaciones</h2>
        <button
          onClick={() => {
            setEditingReservation(null);
            setShowForm(true);
          }}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          + Nueva Reservación
        </button>
      </div>

      {showForm && (
        <ReservationForm
          reservation={editingReservation}
          onSubmit={async formData => {
            try {
              if (editingReservation) {
                const updated = await updateReservation(
                  editingReservation.id,
                  formData
                );
                setReservations(
                  reservations.map(r =>
                    r.id === editingReservation.id ? updated : r
                  )
                );
                toast.success("Reservación actualizada exitosamente");
              } else {
                const newReservation = await createReservation(formData);
                setReservations([...reservations, newReservation]);
                toast.success("Reservación creada exitosamente");
              }
              setShowForm(false);
              setEditingReservation(null);
            } catch (error) {
              toast.error(
                `${
                  editingReservation
                    ? "Error al actualizar reservación"
                    : "Error al crear reservación"
                }: ${extractErrorMessage(error)}`
              );
            }
          }}
          onCancel={() => {
            setShowForm(false);
            setEditingReservation(null);
          }}
        />
      )}

      {loading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reservations.map(reservation => (
            <ReservationItem
              key={reservation.id}
              reservation={reservation}
              onEdit={() => {
                setEditingReservation(reservation);
                setShowForm(true);
              }}
              onDelete={() => handleDelete(reservation.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
