```markdown
# 💼 Expense Tracker Frontend

Frontend client for the **Expense Tracker** web application where employees can submit expenses and admins can manage approvals and view analytics.

Built using **React**, **TypeScript**, **Redux Toolkit**, and **Material UI**.

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
- **Chart.js / Recharts**
- **Material UI (MUI)**

---

## 🗂 Project Structure

```

src/
├── components/       # Shared UI components and charts
├── pages/            # Page-level views (Login, Dashboard, etc.)
├── store/            # Redux store and slices
├── hooks/            # Typed Redux hooks
├── api/              # Axios instance and API calls
├── App.tsx           # Main app with routing
└── index.tsx         # App entry point

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

🔒 **Authenticated access only.** Employees and admins see different views based on their roles.

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

Create a `.env` file in the root with:

```env
REACT_APP_API_URL=http://localhost:3001
```

4. **Run locally**

```bash
npm start
```

---

## 🧪 Test Credentials

Use these to log in (mocked or connected to backend):

### 👤 Admin

* **Email**: `admin@example.com`
* **Password**: `admin123`

### 👥 Employee

* **Emails**: `employee1@example.com` – `employee5@example.com`
* **Passwords**: `employee1123` – `employee5123`

---

## 📦 Deployment

You can deploy the build using **Vercel**, **Netlify**, or any static hosting provider.

To create a production build:

```bash
npm run build
```

Then upload the `build/` folder to your chosen platform.

---

## 🔗 Live Demo

* 🌐 **Frontend**: [http://23.23.28.100:3000](http://23.23.28.100:3000)
* ⚙️ **Backend**: [http://23.23.28.100:3001](http://23.23.28.100:3001/)

---

## 📌 Roles

| Role     | Capabilities                                      |
| -------- | ------------------------------------------------- |
| Employee | Submit and view own expenses                      |
| Admin    | View all expenses, approve/reject, view dashboard |

---

## 👨‍💻 Developed By

**Manoj Gupta**
