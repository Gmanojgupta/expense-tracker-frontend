import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchAnalytics } from "../store/analyticsSlice";
import {
  Box,
  Button,
  Container,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  TextField,
} from "@mui/material";
import { Expense } from "../types";
import client from "../api/client";
import DashboardTable from "./Tables/DashboardTable";
import DashboardCharts from "../components/Charts/DashboardCharts";

const DashboardPage = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [errorFetchExpenses, setErrorFetchExpenses] = useState<string | null>(
    null
  );
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  const dispatch = useAppDispatch();
  const { byCategory, byMonth, byStatus, loading, error } = useAppSelector(
    (state) => state.analytics
  );

  useEffect(() => {
    dispatch(fetchAnalytics());
  }, [dispatch]);

  const fetchExpenses = async (
startDate?: string, endDate?: string, category?: string, status?: string  ) => {
    try {
      const queryParams: any = {};
      if (startDate) queryParams.startDate = startDate;
      if (endDate) queryParams.endDate = endDate;
      if (category) queryParams.category = category;
      if (status) queryParams.status = status;

      const res = await client.get("/expenses", { params: queryParams });
      if (res.data.success) {
        setExpenses(res.data.data);
      }
    } catch (err) {
      setErrorFetchExpenses("Failed to fetch expenses");
    }
  };

  useEffect(() => {
    fetchExpenses(startDate, endDate, category, status);
  }, [startDate, endDate, category, status]);

  const getCategoryData = () => {
    return byCategory.map((item) => ({
      name: item.category,
      value: item._sum.amount,
    }));
  };

  if (loading) {
    return (
      <Container>
        <Typography variant="h5" align="center">
          Loading Analytics...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography
          variant="h5"
          color="error"
          align="center"
        >{`Error: ${error}`}</Typography>
      </Container>
    );
  }

  // Prepare PieChart data
  const categoryData = getCategoryData();

  // Function to handle status change

  return (
    <div>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4">Dashboard</Typography>
      </Box>
      <DashboardCharts
        categoryData={categoryData}
        byMonth={byMonth}
        byStatus={byStatus}
      />

      <Typography variant="h5" gutterBottom mt={8}>
        Team Expenses
      </Typography>
      {/* Filter Section */}
      <Box display="flex" mt={4}>
        <TextField
          label="Start Date"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{ marginRight: 2 }}
          size="small"
        />
        <TextField
          label="End Date"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{ marginRight: 2 }}
          size="small"
        />

        {/* Category Dropdown */}
        <FormControl sx={{ width: "120px", marginRight: 2, }} size="small">
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            label="Category"
            size="small"
          >
            {/* Default Option */}
            <MenuItem value="">None</MenuItem>

            {/* Dynamic Category Options from byCategory */}
            {byCategory?.map((cat) => (
              <MenuItem key={cat.category} value={cat.category}>
                {cat.category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {/* Status Dropdown */}
        <FormControl sx={{ width: "120px", marginRight: 2 }} size="small">
          <InputLabel>Status</InputLabel>
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            label="Status"
            size="small"
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="PENDING">Pending</MenuItem>
            <MenuItem value="APPROVED">Approved</MenuItem>
            <MenuItem value="REJECTED">Rejected</MenuItem>
            <MenuItem value="ONHOLD">On Hold</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="contained"
          color="primary"
          onClick={() => fetchExpenses(startDate, endDate, category, status)}
        >
          Apply Filters
        </Button>
      </Box>
      {errorFetchExpenses ? (
        <Typography
          variant="h6"
          color="error"
          align="center"
        >{`Error: ${errorFetchExpenses}`}</Typography>
      ) : (
        <DashboardTable expenses={expenses} />
      )}
    </div>
  );
};

export default DashboardPage;
