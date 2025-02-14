"use client"; 

import { useState, useEffect } from "react";
import { Task } from "../types/task"; // Importing the Task type for type safety
import AddTask from "../components/AddTask"; // Importing the AddTask component
import TaskList from "../components/TaskList"; // Importing the TaskList component
import { Container, Grid, Box, Typography } from "@mui/material"; // Importing Material UI components for styling

export default function Home() {
  // State to manage the list of tasks
  const [tasks, setTasks] = useState<Task[]>([]);

  // Load saved tasks from localStorage when the component mounts
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks && savedTasks !== "[]") {
      setTasks(JSON.parse(savedTasks)); // 
    }
  }, []); 
  
  useEffect(() => {
    if (tasks.length > 0) { 
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]); 
  
  // Function to add a new task
  const addTask = (task: Task) => {
    setTasks((prevTasks) => [...prevTasks, task]); // Append the new task to the existing list
  };

  // Function to remove a task by filtering out the one with the given ID
  const removeTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <Box
      sx={{
        minHeight: "100vh", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center", 
        background: "linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 100%)", 
        padding: "2rem",
      }}
    >
      <Container maxWidth="lg">

        <Typography variant="h3" align="center" gutterBottom color="white">
          To-Do List
        </Typography>

        {/* Left side: AddTask */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <AddTask onAddTask={addTask} />
          </Grid>

         {/* Right side: TaskList */}
          <Grid item xs={12} md={6}>
            <TaskList tasks={tasks} onRemoveTask={removeTask} /> 
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
