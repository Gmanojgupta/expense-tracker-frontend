import { Grid, Paper, Box } from "@mui/material";
import CategoryPieChart from "./CategoryPieChart";
import MonthlyExpenseChart from "./MonthlyExpenseChart";
import StatusPieChart from "./StatusPieChart";

const DashboardCharts = ({ categoryData, byMonth, byStatus }: any) => {
  return (
    <Grid container spacing={1}>
      {/* Category Pie Chart */}
      <Grid item xs={12} md={4}>
        <Paper elevation={3} sx={{ p: 3, borderRadius: 3, height: "100%" }}>
          <Box display="flex" justifyContent="center">
            <CategoryPieChart
              categoryData={categoryData}
              title="Monthly Expenses by Category"
            />
          </Box>
        </Paper>
      </Grid>

      {/* Monthly Line Chart */}
      <Grid item xs={12} md={4}>
        <Paper elevation={3} sx={{ p: 3, borderRadius: 3, height: "100%" }}>
          <MonthlyExpenseChart byMonth={byMonth} />
        </Paper>
      </Grid>

      {/* Status Pie Chart */}
      <Grid item xs={12} md={4}>
        <Paper elevation={3} sx={{ p: 3, borderRadius: 3, height: "100%" }}>
          <StatusPieChart byStatus={byStatus} />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default DashboardCharts;
