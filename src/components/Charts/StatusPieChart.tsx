import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Paper, Typography, Box } from "@mui/material";

interface StatusData {
  status: string;
  _count: { id: number };
}

interface Props {
  byStatus: StatusData[];
}

const STATUS_COLORS: Record<string, string> = {
  APPROVED: "#4caf50", // green
  PENDING: "#ff9800",  // orange
  REJECTED: "#f44336", // red
  ONHOLD: "#000000",   // black
};

const StatusPieChart: React.FC<Props> = ({ byStatus }) => {
  const chartData = byStatus.map((item) => ({
    name: item.status,
    value: item._count.id,
  }));

  return (
    <Paper elevation={0} sx={{ p: 0, mt: 0 }}>
      <Typography variant="h6" mb={2}>
        Expense Status Breakdown
      </Typography>
      <Box sx={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={STATUS_COLORS[entry.name] || "#8884d8"} // fallback color
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
};

export default StatusPieChart;
