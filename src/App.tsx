import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import MainLayout from "./layout/Layout";
import Kanban from "./views/kanban";
import Calendar from "./views/calendar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index path="/" element={<Navigate to="kanban" replace />} />

          <Route path="kanban" element={<Kanban />} />
          <Route path="calendar" element={<Calendar />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
