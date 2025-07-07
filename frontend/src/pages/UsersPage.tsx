import UserList from "../components/users/UserList";

export default function UsersPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Administración de Usuarios</h1>
      <UserList />
    </div>
  );
}
