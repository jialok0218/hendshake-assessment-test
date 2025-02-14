"use client"; 

import { Task } from "@/types/task";
import {
  Paper,
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface TaskListProps {
  tasks: Task[]; 
  onRemoveTask: (id: string) => void; // Function to remove a task by ID
}

export default function TaskList({ tasks, onRemoveTask }: TaskListProps) {
  return (
    <Paper
      elevation={3}
      sx={{
        padding: 3,
        borderRadius: "16px", 
        background: "white",
        border: "2px solid #ddd",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Task List ({tasks.length})
      </Typography>

      <Box sx={{ maxHeight: "500px", overflowY: "auto" }}>
        {tasks.length === 0 ? (
          <Typography variant="body2" color="textSecondary">
            No tasks added yet.
          </Typography>
        ) : (
          tasks.map((task) => (
            <Card
              key={task.id}
              sx={{
                mb: 2,
                borderRadius: "12px", 
                border: "2px solid #ccc", 
                backgroundColor: "#f9f9f9",
                boxShadow: "0 2px 6px rgba(0, 0, 0, 0.08)",
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {/*  Task details */}
                <Box>
                  <Typography variant="h6">{task.activity}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Price: RM {task.price}
                  </Typography>
                  <Typography variant="body2">Type: {task.type}</Typography>
                  <Typography variant="body2">
                    {task.bookingRequired ? "Booking Required" : "No Booking"}
                  </Typography>
                  <Typography variant="body2">Accessibility: {task.accessibility}</Typography>
                </Box>

                {/* Delete task function */}
                <Tooltip title="Delete Task">
                  <IconButton
                    color="error"
                    onClick={() => onRemoveTask(task.id)}
                    sx={{
                      "&:hover": {
                        transform: "scale(1.1)",
                        backgroundColor: "error.light",
                      },
                      transition: "all 0.2s",
                    }}
                  >
                    <DeleteIcon sx={{ fontSize: 28 }} />
                  </IconButton>
                </Tooltip>
              </CardContent>
            </Card>
          ))
        )}
      </Box>
    </Paper>
  );
}
