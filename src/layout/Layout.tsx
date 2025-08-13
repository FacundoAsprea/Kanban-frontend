import { Outlet } from 'react-router-dom'
import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";

export default function MainLayout() {
  return (
    <main className="bg-backgroundMain flex">
      <Sidebar />
      <section className="h-screen w-full flex flex-col overflow-scroll">
        <Navbar />

        <div className="h-max p-6">
          <Outlet />
        </div>
      </section>
    </main>
  );
}

