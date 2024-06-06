import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Box from '@mui/material/Box';
import BuildIcon from '@mui/icons-material/Build';
import PersonIcon from '@mui/icons-material/Person';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';

const HeaderWithIconRoot = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  '& span': {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    marginRight: theme.spacing(0.5),
  },
}));

const TasksContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '30px',
  border: '1px solid #e0e0e0',
  borderRadius: '10px',
  backgroundColor: '#fff',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  transition: 'opacity 0.5s ease',
  opacity: 1,
  '&.fade-enter': {
    opacity: 0,
  },
  '&.fade-enter-active': {
    opacity: 1,
  },
});

const SelectedTaskContainer = styled('div')({
  marginTop: '20px',
  padding: '20px',
  border: '1px solid #e0e0e0',
  borderRadius: '10px',
  backgroundColor: '#f9f9f9',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
});

const DeleteButton = styled('button')({
  backgroundColor: '#f44336',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  padding: '8px 15px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
  '&:hover': {
    backgroundColor: '#d32f2f',
  },
});

const AddButton = styled(Button)({
  marginTop: '20px',
  backgroundColor: '#4caf50',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  padding: '12px 24px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  '&:hover': {
    backgroundColor: '#388e3c',
  },
});

const LoadingContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100px',
  transition: 'opacity 0.5s ease',
  opacity: 1,
  '&.fade-enter': {
    opacity: 0,
  },
  '&.fade-enter-active': {
    opacity: 1,
  },
});


function HeaderWithIcon(props) {
  const { icon, ...params } = props;

  return (
    <HeaderWithIconRoot>
      <span>{params.headerName ?? params.groupId}</span> {icon}
    </HeaderWithIconRoot>
  );
}

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/tasks');
      setTasks(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  }

  async function deleteTask(id) {
    try {
      const confirmed = window.confirm('Are you sure you want to delete this task?');
      if (!confirmed) return;

      await axios.delete(`http://127.0.0.1:8000/api/tasks/delete/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
      alert('Task deleted successfully');
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  }

  function handleTaskClick(task) {
    setSelectedTask(task);
  }

  const taskColumns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'title', headerName: 'Title', width: 200 },
    { field: 'description', headerName: 'Description', width: 300 },
    { field: 'execution_date_estimation', headerName: 'Execution Date', width: 200 },
    { field: 'priority', headerName: 'Priority', width: 130 },
    { field: 'tags', headerName: 'Tags', width: 200 },
    { field: 'completed', headerName: 'Completed', width: 130 },
    {
      field: 'delete',
      headerName: 'Delete',
      width: 100,
      renderCell: (params) => (
        <DeleteButton
          onClick={(e) => {
            e.stopPropagation();
            deleteTask(params.row.id);
          }}
        >
          Delete
        </DeleteButton>
      ),
    },
  ];

  return (
    <TasksContainer>
      {loading ? (
        <LoadingContainer>
          <CircularProgress />
        </LoadingContainer>
      ) : (
        <DataGrid
          rows={tasks}
          columns={taskColumns}
          pageSize={5}
          onRowClick={(params) => handleTaskClick(params.row)}
          checkboxSelection
          disableRowSelectionOnClick
          columnGroupingModel={[
            {
              groupId: 'internal_data',
              headerName: 'Internal',
              description: '',
              renderHeaderGroup: (params) => (
                <HeaderWithIcon {...params} icon={<BuildIcon fontSize="small" />} />
              ),
              children: [{ field: 'id' }],
            },
            {
              groupId: 'character',
              description: 'Information about the character',
              headerName: 'Basic info',
              renderHeaderGroup: (params) => (
                <HeaderWithIcon {...params} icon={<PersonIcon fontSize="small" />} />
              ),
              children: [
                {
                  groupId: 'naming',
                  headerName: 'Names',
                  headerClassName: 'my-super-theme--naming-group',
                  children: [{ field: 'lastName' }, { field: 'firstName' }],
                },
                { field: 'age' },
              ],
            },
          ]}
        />
      )}
      {selectedTask && (
        <SelectedTaskContainer>
          <h2>Selected Task</h2>
          <p>Title: {selectedTask.title}</p>
          <p>Description: {selectedTask.description}</p>
          <p>Execution Date: {selectedTask.execution_date_estimation}</p>
          <p>Priority: {selectedTask.priority}</p>
          <p>Tags: {selectedTask.tags}</p>
          <p>Completed: {selectedTask.completed ? 'Yes' : 'No'}</p>
        </SelectedTaskContainer>
      )}

      <Link to="/Store">
        <AddButton>
          Add New Task
        </AddButton>
      </Link>
    </TasksContainer>
  );
}

export default Tasks;
