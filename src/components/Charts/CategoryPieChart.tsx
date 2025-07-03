import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Paper, Typography, Box } from "@mui/material";

const COLORS = ["#42a5f5", "#66bb6a", "#ffa726", "#ef5350", "#ab47bc"];

interface DataItem {
  name: string;
  value: number;
}

interface Props {
  title?: string;
  categoryData: DataItem[];
}

const CategoryPieChart: React.FC<Props> = ({ categoryData, title = "Category Breakdown" }) => {
  return (
    <Paper elevation={0} sx={{ borderRadius: 3, p: 0 , width: "100%", height: "100%" }}>
      <Typography variant="subtitle1" mb={1}>
        {title}
      </Typography>
      <Box sx={{ width: "100%", height: 220 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              outerRadius={35}
              label={({ name, percent = 0 }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
              dataKey="value"
              isAnimationActive
            >
              {categoryData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ borderRadius: 8 }}
              formatter={(value: number) => `$${value.toFixed(2)}`}
            />
            <Legend verticalAlign="bottom" height={24} />
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
};

export default CategoryPieChart;
