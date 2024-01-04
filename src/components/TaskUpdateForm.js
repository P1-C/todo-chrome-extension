import { Button, Divider, FormControl, FormControlLabel, FormLabel, MenuItem, Radio, RadioGroup, Select, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import useConfigStore from '../store/configStore'
import useTodoStore from '../store/todoStore'
import useNotificationStore from '../store/NotificationStore'

const TaskUpdateForm = () => {
  const { selectedTask, toggleTaskDrawer } = useConfigStore()
  const { updateTodoTask } = useTodoStore()
  const { showNotification } = useNotificationStore()
  const [taskDetails, setTaskDetails] = useState(selectedTask)

  const handleTaskDetailsChange = (e) => {
    
    setTaskDetails(() => ({
      ...taskDetails,
      [e.target.name]: e.target.value,
    }));
  };

  const handleTaskUpdate = (e) => { 
    updateTodoTask(taskDetails.id, taskDetails)
    showNotification('Task updated Succcessfully')
    toggleTaskDrawer()
   }

   const statusOptions = [
    { value: 'PLANNED', label: 'Planned' },
    { value: 'ONGOING', label: 'Ongoing' },
    { value: 'COMPLETED', label: 'Completed' }
  ];

  return (
    <Stack spacing={2} paddingX={2} component='form' >
      {taskDetails &&
        <>
          <Typography variant='h6' color='primary' textAlign='center' sx={{ paddingTop: '0.5rem' }}> Task Info</Typography>
          <Divider />
          <TextField
            required
            label="Task"
            variant="standard"
            name="title"
            size="medium"
            value={taskDetails.title}
            onChange={handleTaskDetailsChange}
            style={{ margin: '15px 0px' }}
          />
          <FormControl>
            <TextField
              id='description'
              label="Description"
              multiline
              rows={2}
              variant="standard"
              name='description'
              value={taskDetails.description}
              onChange={handleTaskDetailsChange}
              style={{ marginBottom: '15px' }}
            />
          </FormControl>
          <FormControl>
            <FormLabel id="priority-radio">Priority</FormLabel>
            <RadioGroup
              required
              row
              aria-labelledby="priority-radio"
              name="priority"
              value={taskDetails.priority}
              onChange={handleTaskDetailsChange}
              style={{ width: '285px' }}
            >
              <FormControlLabel size="small" value="LOW" control={<Radio />} label="Low" />
              <FormControlLabel size="small" value="MEDIUM" control={<Radio />} label="Medium" />
              <FormControlLabel size="small" value="HIGH" control={<Radio />} label="High" />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormLabel id="due-date">Due Date</FormLabel>
            <TextField
              size='small'
              required
              id='due-date'
              type="date"
              variant="standard"
              name='dueDate'
              value={taskDetails.dueDate}
              onChange={handleTaskDetailsChange}
            />
          </FormControl>
          <FormControl>
      <FormLabel id="status">Status</FormLabel>
      <Select
        size="small"
        required
        id="status"
        variant="standard"
        name="status"
        value={taskDetails.status}
        onChange={handleTaskDetailsChange}
      >
        {statusOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
          <Stack direction='row' flexDirection='row-reverse' >
            <Button type="button" variant="contained" color="primary" onClick={handleTaskUpdate} sx={{ marginLeft: '5px'}}>
              update
            </Button>
            <Button type="button" variant="outlined" color="primary" onClick={toggleTaskDrawer} >
              Close
            </Button>
          </Stack>
        </>}
    </Stack>
  )
}

export default TaskUpdateForm