import LabList from "../components/labs/LabList";

export default function LabsPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Gestión de Laboratorios</h1>
      <LabList />
    </div>
  );
}
