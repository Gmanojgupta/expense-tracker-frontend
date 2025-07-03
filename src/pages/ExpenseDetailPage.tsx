import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import client from "../api/client";
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  Divider,
  Grid,
  Chip,
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { CurrencyExchange, Event, Info, Person } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { updateStatus } from "../store/expenseSlice";

const ExpenseDetailPage: React.FC = () => {
  const { id } = useParams();
  const [expense, setExpense] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [statusUpdating, setStatusUpdating] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [updateError, setUpdateError] = useState("");
  const [remarksDialogOpen, setRemarksDialogOpen] = useState(false);
  const [remarks, setRemarks] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const res = await client.get(`/expenses/${id}`);
        setExpense(res.data.data);
        setSelectedStatus(res.data.data.status);
      } catch (error) {
        console.error("Error fetching expense:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExpense();
  }, [id]);

  // Direct update for APPROVED (or any status without remarks)
  const handleStatusUpdateDirect = async (status: string) => {
    setSelectedStatus(status);
    setUpdateError("");
    setRemarksDialogOpen(false);
    setRemarks("");

    setStatusUpdating(true);
    try {
      if (!id) return;

      const res = await dispatch(
        updateStatus({
          id,
          status,
          remarks: "", // no remarks here
        }) as any
      );
      setStatusUpdating(false);

      if (res?.payload) {
        setExpense((prev: any) => ({
          ...prev,
          status,
          remarks: "",
        }));
      } else {
        throw new Error("Failed to update status");
      }
    } catch (err) {
      console.error(err);
      setUpdateError("Failed to update status.");
      setStatusUpdating(false);
    }
  };

  // Open dialog for REJECTED or ONHOLD
  const openRemarksDialog = (status: string) => {
    setSelectedStatus(status);
    setRemarksDialogOpen(true);
    setRemarks(""); // clear previous remarks
    setUpdateError("");
  };

  // Submit status update with remarks from dialog
  const submitStatusUpdate = async (remarksText: string) => {
    setStatusUpdating(true);
    setUpdateError("");
    try {
      if (!id) return;

      const res = await dispatch(
        updateStatus({
          id,
          status: selectedStatus,
          remarks: remarksText,
        }) as any
      );
      setStatusUpdating(false);
      setRemarksDialogOpen(false);
      setRemarks("");

      if (res?.payload) {
        setExpense((prev: any) => ({
          ...prev,
          status: selectedStatus,
          remarks: remarksText,
        }));
      } else {
        throw new Error("Failed to update status");
      }
    } catch (err) {
      console.error(err);
      setUpdateError("Failed to update status.");
      setStatusUpdating(false);
    }
  };

  if (loading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
      >
        <CircularProgress />
      </Box>
    );

  if (!expense)
    return (
      <Box p={4}>
        <Typography color="error">Error loading expense.</Typography>
      </Box>
    );

  return (
    <Box p={4} sx={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <Paper
        elevation={4}
        sx={{
          p: 4,
          borderRadius: 4,
          maxWidth: 1000,
          margin: "0 auto",
          background: "#ffffff",
        }}
      >
        <Typography variant="h4" fontWeight={700} gutterBottom color="primary">
          Expense Details
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" gutterBottom>
              <Info fontSize="small" sx={{ mr: 1 }} />
              Expense ID:
            </Typography>
            <Typography>{expense.id}</Typography>

            <Typography variant="subtitle2" mt={2}>
              <CurrencyExchange fontSize="small" sx={{ mr: 1 }} />
              Category:
            </Typography>
            <Chip label={expense.category} color="info" />

            <Typography variant="subtitle2" mt={2}>
              Amount:
            </Typography>
            <Typography fontWeight={600}>
              ${expense.amount.toFixed(2)}
            </Typography>

            <Typography variant="subtitle2" mt={2}>
              Description:
            </Typography>
            <Typography>{expense.description}</Typography>

            <Typography variant="subtitle2" mt={2}>
              <Event fontSize="small" sx={{ mr: 1 }} />
              Date:
            </Typography>
            <Typography>{new Date(expense.date).toLocaleString()}</Typography>

            <Typography variant="subtitle2" mt={2}>
              Status:
            </Typography>
            <Chip
              label={expense.status}
              color={
                expense.status === "APPROVED"
                  ? "success"
                  : expense.status === "PENDING"
                  ? "warning"
                  : expense.status === "ONHOLD"
                  ? "default"
                  : "error"
              }
              sx={{ mb: 1 }}
            />

            {/* Status Update Buttons */}
            {expense.status !== "APPROVED" && (<Box mt={2}>
              <Typography variant="subtitle1" gutterBottom>
                Update Status
              </Typography>

              <Box sx={{ display: "flex", gap: 2 }}>
                {/* APPROVED button */}
                <Button
                  size="small"
                  variant="contained"
                  color="success"
                  disabled={statusUpdating}
                  onClick={() => handleStatusUpdateDirect("APPROVED")}
                >
                  APPROVED
                </Button>

                {/* REJECTED button */}
                <Button
                  size="small"
                  variant="contained"
                  color="error"
                  disabled={statusUpdating}
                  onClick={() => openRemarksDialog("REJECTED")}
                >
                  REJECTED
                </Button>

                {/* ONHOLD button */}
                <Button
                  size="small"
                  variant="contained"
                  color="inherit"
                  disabled={statusUpdating}
                  onClick={() => openRemarksDialog("ONHOLD")}
                >
                  ONHOLD
                </Button>
              </Box>

              {updateError && (
                <Typography color="error" mt={1}>
                  {updateError}
                </Typography>
              )}
            </Box>)}
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" gutterBottom>
              Created At:
            </Typography>
            <Typography>{new Date(expense.createdAt).toLocaleString()}</Typography>

            <Typography variant="subtitle2" mt={2}>
              Updated At:
            </Typography>
            <Typography>{new Date(expense.updatedAt).toLocaleString()}</Typography>

            <Typography variant="subtitle2" mt={2}>
              User ID:
            </Typography>
            <Typography>{expense.userId}</Typography>

            <Typography variant="subtitle2" mt={2}>
              Remarks:
            </Typography>
            <Typography>{expense.remarks}</Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h5" fontWeight={600} gutterBottom>
          <Person sx={{ mr: 1 }} />
          User Information
        </Typography>

        <Box display="flex" alignItems="center" gap={2} mt={2}>
          <Avatar sx={{ bgcolor: "primary.main", width: 56, height: 56 }}>
            {expense.user?.name?.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="subtitle1" fontWeight={600}>
              {expense.user?.name}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {expense.user?.email}
            </Typography>
            <Chip label={expense.user?.role} size="small" sx={{ mt: 1 }} />
          </Box>
        </Box>
      </Paper>

      {/* Remarks Dialog */}
      <Dialog
        open={remarksDialogOpen}
        onClose={() => setRemarksDialogOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Remarks</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Remarks"
            multiline
            minRows={3}
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            autoFocus
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setRemarksDialogOpen(false)}
            disabled={statusUpdating}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => submitStatusUpdate(remarks)}
            disabled={statusUpdating || !remarks.trim()}
          >
            {statusUpdating ? "Submitting..." : "Submit"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ExpenseDetailPage;
