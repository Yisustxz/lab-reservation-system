import ComputerList from "../components/computers/ComputerList";

export default function ComputersPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">
        Administración de Computadoras
      </h1>
      <ComputerList />
    </div>
  );
}
