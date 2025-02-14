"use client";

import { useState } from "react";
import { Task, TaskType } from "@/types/task";
import { v4 as uuidv4 } from "uuid";
import {
  Paper,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel,
  Slider,
  Box,
  Typography,
} from "@mui/material";

interface AddTaskProps {
  onAddTask: (task: Task) => void; // Function to pass new task to parent
}

export default function AddTask({ onAddTask }: AddTaskProps) {
  // Local state for form inputs
  const [activity, setActivity] = useState("");
  const [price, setPrice] = useState<number | "">(""); // 
  const [type, setType] = useState<TaskType | "">(""); // 
  const [bookingRequired, setBookingRequired] = useState(false);
  const [accessibility, setAccessibility] = useState(0.5);

  // Handles form submission & validation
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activity.trim()) return; // 

    const newTask: Task = {
      id: uuidv4(), // Generate unique task ID
      activity,
      price: price === "" ? 0 : Number(price), 
      type: type as TaskType,
      bookingRequired,
      accessibility,
    };

    onAddTask(newTask); // Send new task to parent component
    setActivity("");
    setPrice("");
    setType("");
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: "16px",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)", 
        background: "white",
        border: "1px solid rgba(255, 255, 255, 0.18)",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Add New Task
      </Typography>

      <form onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {/* Task Name Input */}
          <TextField
            label="Activity"
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            required
            fullWidth
          />

          {/* Price Input */}
          <TextField
            type="number"
            label="Price (RM) (Optional)"
            value={price}
            onChange={(e) => setPrice(e.target.value === "" ? "" : Number(e.target.value))}
            fullWidth
            inputProps={{ min: 0 }}
          />

          {/* Task Type Dropdown */}
          <FormControl fullWidth required>
            <InputLabel>Task Type</InputLabel>
            <Select
              value={type}
              onChange={(e) => setType(e.target.value as TaskType)}
              label="Task Type"
            >
              <MenuItem value="" disabled>Select Task Type</MenuItem>
              {["education", "recreational", "social", "diy", "charity", "cooking", "relaxation", "music", "busywork"].map((t) => (
                <MenuItem key={t} value={t}>{t}</MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Checkbox for Booking Requirement */}
          <FormControlLabel
            control={<Checkbox checked={bookingRequired} onChange={(e) => setBookingRequired(e.target.checked)} />}
            label="Booking Required"
          />

          {/* Accessibility Slider */}
          <Box>
            <InputLabel>Accessibility: {accessibility}</InputLabel>
            <Slider
              value={accessibility}
              onChange={(_, value) => setAccessibility(value as number)}
              step={0.1}
              min={0}
              max={1}
            />
          </Box>

          {/* Submit Button */}
          <Button type="submit" variant="contained" fullWidth>
            Add Task
          </Button>
        </Box>
      </form>
    </Paper>
  );
}
