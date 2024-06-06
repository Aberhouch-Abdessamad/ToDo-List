import React, { useState } from 'react';
import {
  Button, CssBaseline, TextField, FormControlLabel, Link,
  Grid, Box, Typography, Container, Switch, InputLabel, MenuItem,
  FormControl, Select, createTheme, ThemeProvider
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import axios from 'axios';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
  typography: {
    h5: {
      fontWeight: 600,
    },
  },
});

export default function App() {
  const currentDate = new Date();
  const [value, setValue] = useState(dayjs(currentDate));
  const [checked, setChecked] = useState(false);
  const [priority, setPriority] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const taskData = {
      title: formData.get('title'),
      description: formData.get('description'),
      execution_date_estimation: formData.get('execution_date'),
      completed: checked,
      priority: priority,
      tags: tags
    };

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/tasks/store', taskData);
      console.log(response.data.message); 
      alert("Task created successfully");
      window.location.reload();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleCheckboxChange = () => {
    setChecked((prev) => !prev);
  };

  const handlePriorityChange = (event) => {
    setPriority(event.target.value);
  };

  const handleTagsChange = (event) => {
    setTags(event.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Container component="main" maxWidth="sm">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: '#ffffff',
              padding: 4,
              borderRadius: 2,
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Typography component="h1" variant="h5" sx={{ marginBottom: 2 }}>
              Add New Task
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    name="title"
                    required
                    fullWidth
                    id="title"
                    label="Title"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="description"
                    required
                    fullWidth
                    id="description"
                    label="Description"
                  />
                </Grid>
                <Grid item xs={12}>
                  <DatePicker
                    label="Execution Date"
                    name="execution_date"
                    value={value}
                    onChange={(newValue) => setValue(newValue)}
                    renderInput={(params) => <TextField {...params} required fullWidth />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth required>
                    <InputLabel id="priority-label">Priority</InputLabel>
                    <Select
                      labelId="priority-label"
                      id="priority"
                      value={priority}
                      onChange={handlePriorityChange}
                      label="Priority"
                    >
                      <MenuItem value={1}>High</MenuItem>
                      <MenuItem value={2}>Medium</MenuItem>
                      <MenuItem value={3}>Low</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="tags"
                    required
                    fullWidth
                    id="tags"
                    label="Tags"
                    onChange={handleTagsChange}
                    value={tags}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Switch checked={checked} onChange={handleCheckboxChange} color="primary" />}
                    label="Completed"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, py: 1.5 }}
                color="primary"
              >
                Submit
              </Button>
              <Link href="/Tasks" variant="body2" sx={{ display: 'block', textAlign: 'center' }}>
                View all tasks
              </Link>
            </Box>
          </Box>
        </Container>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
