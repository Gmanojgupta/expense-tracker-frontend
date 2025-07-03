import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import RegisterPage from "./pages/RegisterPage";
import ExpensePage from "./pages/ExpensesPage";
import { useAppSelector } from "./store/hooks";
import Layout from "./components/Layout";
import ExpenseDetailPage from "./pages/ExpenseDetailPage";

const App = () => {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      {user ? (
        <>
          <Route element={<Layout />}>
            {user.role === "ADMIN" ? (
              <Route path="*" element={<DashboardPage />} />
            ) : (
              <Route path="*" element={<ExpensePage />} />
            )}
            {user.role === "ADMIN" && (
              <>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/expenses/:id" element={<ExpenseDetailPage />} />
              </>
            )}
            <Route path="/expenses" element={<ExpensePage />} />
           
          </Route>
        </>
      ) : (
        <Route path="*" element={<Navigate to="/login" />} />
      )}
    </Routes>
  );
};

export default App;
