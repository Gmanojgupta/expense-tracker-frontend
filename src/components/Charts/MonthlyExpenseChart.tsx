import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { Typography, Paper, Box } from "@mui/material";

interface MonthlyData {
  month: string;
  total: number;
}

interface Props {
  byMonth: MonthlyData[];
}

const MonthlyLineChart: React.FC<Props> = ({ byMonth }) => {
  return (
    <Paper elevation={0} sx={{ p: 0, mt: 0 }}>
      <Typography variant="h6" mb={2}>
        Monthly Expenses (Line Chart)
      </Typography>
      <Box sx={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={byMonth}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value: any) => `$${value}`} />
            <Line
              type="monotone"
              dataKey="total"
              stroke="#1976d2"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
};

export default MonthlyLineChart;
