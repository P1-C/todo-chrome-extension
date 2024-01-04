import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useTodoStore from '../store/todoStore';
import { useState, useEffect } from 'react';
import useNotifictaionStore from '../store/NotificationStore'
import useConfigStore from '../store/configStore';

function GroupFormDialog({ open, onClose, isEdit }) {
  const [groupName, setGroupName] = useState('');
  const [validationError, setValidationError] = useState(false);
  const { addGroup, updateGroupName } = useTodoStore();
  const { selectedGroup } = useConfigStore()
  const { showNotification } = useNotifictaionStore()
  // const [initialGroupName, setInitialGroupName] = useState(selectedGroup.name); // For editing

  useEffect(() => {
    if (isEdit) {
      // If editing, set the initial group name
      setGroupName(selectedGroup?.name);
    }
  }, [isEdit, selectedGroup]);

  const handleClose = () => {
    onClose();
    setValidationError(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (groupName.trim() === '') {
      setValidationError(true);
    } else {
      if (isEdit) {
        // If editing, call the editGroup function
        updateGroupName(selectedGroup.id, groupName);
        showNotification('Group name updated')
      } else {
        // If not editing, call the addGroup function
        addGroup(groupName);
        showNotification('New group added')

      }
      setGroupName('');
      onClose();
    }
  };

  const handleGroupNameChange = (e) => {
    setGroupName(e.target.value);
    setValidationError(false);
  }

  return (
    <Dialog component='form' onSubmit={handleSubmit} open={open} onClose={handleClose} >
      <DialogTitle align='center'>{isEdit ? 'Edit Group' : 'Add New Group'}</DialogTitle>
      <DialogContent>
        <TextField
          sx={{ width: '300px'}}
          margin='dense'
          id='group'
          label='Enter group name'
          type='text'
          value={groupName}
          onChange={handleGroupNameChange}
          fullWidth
          size='small'
          variant='outlined'
          error={validationError}
          helperText={validationError ? 'Group name cannot be empty' : ''}
        />
      </DialogContent>
      <DialogActions>
        <Button variant='outlined' onClick={handleClose}>
          Cancel
        </Button>
        <Button variant='contained' type='submit'>
          {isEdit ? 'Update' : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default GroupFormDialog;
