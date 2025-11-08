import Navbar from "@/components/Navbar";
import EmployeeAttendance from "@/components/EmployeeAttendance";

const EmployeeAttendancePage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      {/* 👇 yahan margin-top add kiya */}
      <main className="flex-grow mt-8">
        <EmployeeAttendance />
      </main>
    </div>
  );
};

export default EmployeeAttendancePage;
