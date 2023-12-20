import AdminStudentStats from "../AdminStudent/AdminStudentStats";
import AdminTeacherStats from "../AdminTeacher/AdminTeacherStats";

export default function AdminStats() {
  return (
    <main className="relative container mx-auto flex  p-0 my-0 gap-x-4 min-h-[100vh] gap-y-2 mt-4">
      <div className="basis-1/2 max-w-[50%]">
        <h2 className="-mb-2 font-bold text-base">Thống kê học phí</h2>
        <AdminStudentStats />
      </div>
      <div className="basis-1/2 max-w-[50%]">
        <h2 className="-mb-2 font-bold text-base">Thống kê tiền lương</h2>
        <AdminTeacherStats />
      </div>
    </main>
  );
}
