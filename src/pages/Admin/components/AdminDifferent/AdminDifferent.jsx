import AdminImage from "./AdminImage";
import AdminVideo from "./AdminVideo";

export default function AdminDifferent() {
  return (
    <main className="relative container mx-auto flex p-0 my-0 items-start justify-between  gap-x-4 min-h-[100vh] gap-y-2 mt-4">
      <AdminImage />
      <AdminVideo />
    </main>
  );
}
