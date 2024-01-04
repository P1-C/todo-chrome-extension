import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, TextField, Typography, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, DialogActions } from '@mui/material';
import { Stack } from '@mui/system';
import useNotificationStore from '../store/NotificationStore';
import useTodoStore from '../store/todoStore';
import useConfigStore from '../store/configStore';

function TaskForm({ onClose, open }) {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Add 1 to the month because it's zero-based.
  const day = currentDate.getDate().toString().padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;

  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [selectedDate, setSelectedDate] = useState(formattedDate);
  const [priority, setPriority] = useState('LOW');
  const { showNotification } = useNotificationStore()
  const { addTodoTask } = useTodoStore()
  const { selectedGroup } = useConfigStore()

  const handleSubmit = (event) => {
    event.preventDefault()
    const newTask = {
      title: taskName,
      description: taskDescription,
      dueDate: selectedDate,
      priority: priority,
      groupID: selectedGroup.id,
      status: 'PLANNED'
    };

    addTodoTask(newTask);
    showNotification(`${taskName} added to tasks`)


    setTaskName('');
    setTaskDescription('');
    setSelectedDate(formattedDate);
    setPriority('LOW');
    onClose();
  };

  const handleClose = () => {
    setTaskName('');
    setTaskDescription('');
    setSelectedDate(currentDate);
    setPriority('LOW');
    onClose();
  };


  return (
      <Dialog component="form" open={open} onSubmit={(e)=>handleSubmit(e)} onClose={handleClose}>
        <DialogTitle style={{ textAlign: 'center' }}>
          <Typography variant="h5" component='span'>Add Task</Typography>
        </DialogTitle>
        <DialogContent>
            <Stack width={450}>
            <TextField
              required
              label="Task"
              variant="outlined"
              size="medium"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              style={{ margin: '15px 0px' }}
            />
            <TextField
              label="Description"
              multiline
              rows={3}
              variant="outlined"
              InputProps={{ maxLength: 62}}
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              style={{ marginBottom: '15px' }}
            />
            </Stack>
            
            <Stack direction="row" >
            <FormControl>
                <FormLabel id="priority-radio">Priority</FormLabel>
                <RadioGroup
                  required
                  row
                  aria-labelledby="priority-radio"
                  name="row-radio-buttons-group"
                  value={priority}
                  defaultValue="LOW"
                  style={{ width: '285px' }} 
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <FormControlLabel size="small" value="LOW"  control={<Radio />} label="Low" />
                  <FormControlLabel size="small" value="MEDIUM"  control={<Radio />} label="Medium" />
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
                variant="outlined"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
              </FormControl>
            </Stack>
        </DialogContent>
        <DialogActions>
              <Button type="button" variant="outlined" color="primary" onClick={handleClose} >
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary" >
                Submit
              </Button>
      </DialogActions>
      </Dialog>
  );
}

export default TaskForm;
