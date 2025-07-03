import React, { useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  TablePagination,
  TableSortLabel,
  Chip,
  Box,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
interface Expense {
  remarks: string;
  id: string;
  category: string;
  amount: number;
  date: string;
  description: string;
  status: string;
  user: {
    name: string;
    email: string;
  };
}

interface Props {
  expenses: Expense[];
}

const DashboardTable: React.FC<Props> = ({ expenses }) => {
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<keyof Expense>("date");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleSort = (property: keyof Expense) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getComparator = (order: "asc" | "desc", orderBy: keyof Expense) => {
    return order === "desc"
      ? (a: Expense, b: Expense) => (b[orderBy] < a[orderBy] ? -1 : 1)
      : (a: Expense, b: Expense) => (a[orderBy] < b[orderBy] ? -1 : 1);
  };

  const stableSort = (
    array: Expense[],
    comparator: (a: Expense, b: Expense) => number
  ) => {
    const stabilized = array.map(
      (el, index) => [el, index] as [Expense, number]
    );
    stabilized.sort((a, b) => {
      const cmp = comparator(a[0], b[0]);
      return cmp !== 0 ? cmp : a[1] - b[1];
    });
    return stabilized.map((el) => el[0]);
  };

  const sortedExpenses = stableSort(expenses, getComparator(order, orderBy));
  const navigate = useNavigate();
  return (
    <TableContainer
      component={Paper}
      elevation={3}
      sx={{ mt: 2, borderRadius: 2, maxHeight: 600 ,marginTop: 4}}
    >
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {[
              "category",
              "amount",
              "date",
              "description",
              "user",
              "email",
              "remarks",
              "status",
            ].map((column) => (
              <TableCell
                key={column}
                sortDirection={orderBy === column ? order : false}
                sx={{
                  fontWeight: "bold",
                  backgroundColor: "#546cd6",
                  color: "white",
                }}
              >
                <TableSortLabel
                  active={orderBy === column}
                  direction={orderBy === column ? order : "asc"}
                  onClick={() => handleSort(column as keyof Expense)}
                >
                  {column.charAt(0).toUpperCase() + column.slice(1)}
                  {orderBy === column && (
                    <Box component="span" sx={visuallyHidden}>
                      {order === "desc"
                        ? "sorted descending"
                        : "sorted ascending"}
                    </Box>
                  )}
                </TableSortLabel>
              </TableCell>
            ))}
            <TableCell
              sx={{
                fontWeight: "bold",
                backgroundColor: "#546cd6",
                color: "white",
              }}
            >
              Action
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {sortedExpenses
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((exp, ind) => (
              <TableRow
                key={ind}
                sx={{
                  "&:nth-of-type(odd)": { backgroundColor: "#fafafa" },
                  "&:hover": { backgroundColor: "#e3f2fd", cursor: "pointer" },
                }}
              >
                <TableCell>{exp.category}</TableCell>
                <TableCell>${exp.amount.toFixed(2)}</TableCell>
                <TableCell>{new Date(exp.date).toLocaleDateString()}</TableCell>
                <TableCell>{exp.description}</TableCell>
                <TableCell>{exp.user?.name}</TableCell>
                <TableCell>{exp.user?.email}</TableCell>
                <TableCell>{exp.remarks}</TableCell>
                <TableCell>
                  <Chip
                    label={exp.status}
                    sx={{
                      backgroundColor:
                        exp.status === "APPROVED"
                          ? "green"
                          : exp.status === "PENDING"
                          ? "orange"
                          : exp.status === "REJECTED"
                          ? "red"
                          : "gray",

                      color: "white",
                    }}
                  />
                </TableCell>
                <TableCell>
                  {/* You can add action buttons here like View/Edit/Delete */}
                  <Chip
                    label={<VisibilityIcon />}
                    onClick={() => navigate(`/expenses/${exp.id}`)}
                    sx={{ cursor: "pointer" }}
                  />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      <TablePagination
        component="div"
        count={expenses.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </TableContainer>
  );
};

export default DashboardTable;
