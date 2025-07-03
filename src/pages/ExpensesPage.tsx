import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
} from "@mui/material";
import axiosClient from "../api/client";
import { Expense } from "../types";
import ExpensesTable from "./Tables/ExpensesTable";
const ExpensePage: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [formData, setFormData] = useState({
    category: "",
    amount: "",
    date: "",
    description: "",
  });
  const [file, setFile] = useState<File | any>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [accordionOpen, setAccordionOpen] = useState(false);
  const today = new Date();
  const currentYear = today.getFullYear();
  const minYear = currentYear - 5;
  const minDate = `${minYear}-01-01`;
  const maxDate = today.toISOString().split("T")[0]; // today's date in YYYY-MM-DD
  const categories = [
    "Food",
    "Transport",
    "Utilities",
    "Entertainment",
    "Healthcare",
    "Education",
    "Shopping",
    "Travel",
    "Rent",
    "Insurance",
    "Savings",
    "Investment",
    "Gifts & Donations",
    "Personal Care",
    "Taxes",
    "Others",
  ];

  const fetchExpenses = async () => {
    try {
      const res = await axiosClient.get("/expenses");
      if (res.data.success) {
        setExpenses(res.data.data);
      }
    } catch (err) {
      setError("Failed to fetch expenses");
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!formData.category || !formData.amount || !formData.date) {
      setError("Please fill in all required fields");
      return;
    }
    if (
      isNaN(parseFloat(formData.amount)) ||
      parseFloat(formData.amount) <= 0
    ) {
      setError("Amount must be a valid positive number");
      return;
    }
    if (formData.date) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(formData.date)) {
        setError("Date must be in the format YYYY-MM-DD");
        return;
      }

      const year = parseInt(formData.date.slice(0, 4), 10);
      const currentYear = new Date().getFullYear();
      const minYear = currentYear - 5;

      if (year < minYear || year > currentYear) {
        setError(`Year must be between ${minYear} and ${currentYear}`);
        return;
      }

      const parsedDate = new Date(formData.date);
      if (isNaN(parsedDate.getTime())) {
        setError("Invalid date");
        return;
      }
    }
    if (!formData.description || formData.description.length === 0) {
      setError("Description is required");
      return;
    }
    if (formData.description && formData.description.length > 200) {
      setError("Description cannot exceed 500 characters");
      return;
    }

    setLoading(true);
    try {
      const res = await axiosClient.post("/expenses", {
        category: formData.category,
        amount: parseFloat(formData.amount),
        date: formData.date,
        description: formData.description,
      });
      if (res.data.success) {
        setSuccess("Your expense has been submitted successfully.");
        setFormData({ category: "", amount: "", date: "", description: "" });
        fetchExpenses();
        setAccordionOpen(false); // Close accordion after success
        setFile(null);
        setFilePreview(null);
      }
    } catch (err) {
      setError("Failed to add expense");
    } finally {
      setLoading(false);
    }
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] || null;
    setFile(selected);
    if (selected) {
      const url = URL.createObjectURL(selected);
      setFilePreview(url);
    } else {
      setFilePreview(null);
    }
  };

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess(null);
        setError(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);
  const closeAccordion = () => {
    setAccordionOpen(false);
    setFormData({
      category: "",
      amount: "",
      date: "",
      description: "",
    });
    setFile(null);
    setFilePreview(null);
  };
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Expenses
      </Typography>

      {!accordionOpen && (
        <Button
          variant="contained"
          sx={{ backgroundColor: "#546cd6", color: "white",mb: 2  }}
          onClick={() => setAccordionOpen(true)}
        >
          Add Expense +
        </Button>
      )}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}
      <Accordion
        expanded={accordionOpen}
        sx={{
          borderRadius: 4,
          bgcolor: "#556cd6",
          transition: "all 0.3s ease-in-out",
          padding: accordionOpen ? "6px" : "0",
        }}
      >
        <AccordionSummary
          sx={{
            display: accordionOpen ? "flex" : "none",
            bgcolor: "#556cd6",
            color: "#fff",
            "& .MuiTypography-root": {
              fontWeight: "bold",
            },
            borderRadius: "4px 4px 0 0",
            borderBottom: "1px solid #556cd6",
          }}
        >
          <Typography>Add New Expense</Typography>
        </AccordionSummary>

        <AccordionDetails sx={{ bgcolor: "#ffffff", p: 3, borderRadius: 2 }}>
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              select
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              fullWidth
              required
              size="small"
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Amount $"
              name="amount"
              type="number"
              inputProps={{ step: "0.01" }}
              value={formData.amount}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
              size="small"
            />

            <TextField
              label="Date"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
              size="small"
              InputLabelProps={{ shrink: true }}
              inputProps={{ min: minDate, max: maxDate }}
            />

            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              fullWidth
              required
              multiline
              rows={3}
              margin="normal"
              size="small"
              inputProps={{ maxLength: 200 }}
              helperText={`${formData.description.length}/200 characters`}
            />

            <Box mt={2}>
              <Button variant="outlined" component="label" fullWidth>
                Upload File (Image or PDF)
                <input
                  type="file"
                  hidden
                  accept="image/*,application/pdf"
                  onChange={handleFileChange}
                />
              </Button>

              {file && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Selected: {file.name}
                </Typography>
              )}

              {filePreview && (
                <Box mt={2}>
                  {file.type.startsWith("image/") ? (
                    <Box
                      component="img"
                      src={filePreview}
                      alt="Preview"
                      sx={{
                        width: "100%",
                        maxHeight: 300,
                        objectFit: "contain",
                        borderRadius: 2,
                        boxShadow: 1,
                      }}
                    />
                  ) : file.type === "application/pdf" ? (
                    <iframe
                      src={filePreview}
                      title="PDF Preview"
                      width="100%"
                      height="300"
                      style={{ border: "1px solid #ccc", borderRadius: 4 }}
                    />
                  ) : null}
                </Box>
              )}
            </Box>

            <Grid
              container
              spacing={2}
              sx={{ mt: 2, justifyContent: "flex-end" }}
            >
              <Grid item>
                <Button variant="contained" type="submit" disabled={loading}>
                  {loading ? "Adding..." : "Submit Expense"}
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" onClick={closeAccordion}>
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Box>
        </AccordionDetails>
      </Accordion>

      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Your Expenses
      </Typography>

      {expenses.length === 0 ? (
        <Typography variant="body1" sx={{ mt: 2 }}>
          No expenses found. Please add some expenses.
        </Typography>
      ) : (
        <ExpensesTable expenses={expenses} />
      )}
    </Container>
  );
};

export default ExpensePage;
