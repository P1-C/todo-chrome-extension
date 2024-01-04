import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import useConfigStore from '../store/configStore';
import TaskUpdateForm from './TaskUpdateForm';

export default function TaskDrawer() {

const { isTaskDrawerOpen, toggleTaskDrawer } = useConfigStore()


  return (         
          <Drawer
            anchor='right'
            open={isTaskDrawerOpen}
            onClose={toggleTaskDrawer}
          >
            {<TaskUpdateForm />}
          </Drawer>
  );
}