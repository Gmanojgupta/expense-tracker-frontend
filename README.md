```markdown
# 💼 Expense Tracker Frontend

Frontend client for the **Expense Tracker** web application where employees can submit expenses and admins can manage approvals and view analytics.

Built using **React**, **TypeScript**, **Redux Toolkit**, UI library (Material UI).

---

## 🚀 Features

- 🔐 Mock login with role-based UI
- 🧾 Submit expenses (amount, category, description, date)
- 📋 View expenses (own for employees, all for admins)
- 🔎 Filter expenses by category/date
- 📊 Dashboard with total expenses by category (chart)
- ✅ Admin-only approval queue
- ⚙️ Redux for state management and persistence
- 🧼 Clean, responsive UI

---

## 🧰 Tech Stack

- **React + TypeScript**
- **Redux Toolkit**
- **React Router**
- **Axios**
- **Chart.js / Recharts** for dashboard
- **UI Library** (Material-UI)

---

## 🗂 Project Structure

```

src/
├── components/       # Shared UI components and Charts
├── pages/            # Page-level views (Login, Register, Dashboard, etc.)
├── store/            # Redux store and slices
├── hooks/            # Typed redux hooks
├── Api/            # Axios,
├── App.tsx           # Routing and route guards
└── index.tsx          # App entry

````

---

## 🚦 Routing Overview

```tsx
<Route path="/login" element={<LoginPage />} />
<Route path="/register" element={<RegisterPage />} />
<Route element={<Layout />}>
  <Route path="/dashboard" element={<DashboardPage />} />
  <Route path="/expenses" element={<ExpensePage />} />
  <Route path="/expenses/:id" element={<ExpenseDetailPage />} />
</Route>
````

🔒 **Authenticated access only.** Employees and Admins see different views.

---

## ⚙️ Setup Instructions

1. **Clone the repo**

```bash
git clone https://github.com/Gmanojgupta/expense-tracker-frontend
cd expense-tracker-frontend
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment**

Create a `.env` file:

```env
REACT_APP_API_URL=
```

4. **Run locally**

```bash
npm start
```

---

## 🧪 Test Credentials

Use these to login (mocked or connected to backend):

### 👤 Admin

* **Email**: `admin@example.com`
* **Password**: `admin123`

### 👥 Employee

* **Email**: `employee1@example.com` – `employee5@example.com`
* **Password**: `employee1123` – `employee5123`

---

## 📦 Deployment

You can deploy to **Vercel**, **Netlify**, or any static hosting provider.

```bash
npm run build
```

Then upload the `dist` or `build` folder depending on your bundler.

---

## 🔗 Live Demo (Required)

* 🌐 **Frontend**: [http://23.23.28.100:3000](http://23.23.28.100:3000)
* ⚙️ **Backend**: [http://23.23.28.100:3001](http://23.23.28.100:3001/)

---

## 📌 Roles

| Role     | Capabilities                                         |
| -------- | ---------------------------------------------------- |
| Employee | Submit/view own expenses                             |
| Admin    | View all, approve/reject, access analytics dashboard |

---

---

## 👨‍💻 Developed by

**Manoj Gupta**

---
