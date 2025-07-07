import ReservationList from "../components/reservations/ReservationList";

export default function ReservationsPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Gestión de Reservaciones</h1>
      <ReservationList />
    </div>
  );
}
