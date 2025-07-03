import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import RegisterPage from "./pages/RegisterPage";
import ExpensePage from "./pages/ExpensesPage";
import { useAppSelector } from "./store/hooks";
import Layout from "./components/Layout"; // Import Layout component
import ExpenseDetailPage from "./pages/ExpenseDetailPage";

const App = () => {
  const user = useAppSelector((state) => state.auth.user);
console.log('Test URL:', process.env.REACT_APP_API_URL);


  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      {user ? (
        <>
          <Route element={<Layout />}>
            <Route path="*" element={<ExpensePage />} />
            {user.role !== "ADMIN" && (
              <Route path="/expenses" element={<ExpensePage />} />
            )}
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/expenses/:id" element={<ExpenseDetailPage />} />
          </Route>
        </>
      ) : (
        <Route path="*" element={<Navigate to="/login" />} />
      )}
    </Routes>
  );
};

export default App;
