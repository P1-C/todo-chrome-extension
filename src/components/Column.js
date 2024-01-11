import { useState } from 'react';
import { shallow } from 'zustand/shallow';
import { Box, Divider, Typography } from '@mui/material';
import useTodoStore from '../store/todoStore';
import Task from './Task';
import './Column.css';
import classNames from 'classnames';
import useConfigStore from '../store/configStore';


export default function Column({ state }) {
  const [drop, setDrop] = useState(false);
  const { setDraggedTask, draggedTask, moveTask } = useTodoStore();
  const { selectedGroup } = useConfigStore()

  const tasks = useTodoStore(
    (store) => store.tasks.filter((task) => {
      return task.status === state && task.groupID === selectedGroup.id
    }),
    shallow
  );

  return (
    <Box
      className={classNames('column', { drop: drop })}
      onDragOver={(e) => {
        setDrop(true);
        e.preventDefault();
      }}
      onDragLeave={(e) => {
        setDrop(false);
        e.preventDefault();
      }}
      onDrop={(e) => {
        setDrop(false);
        moveTask(draggedTask, state);
        setDraggedTask(null);
      }}
    >
      <Box className="titleWrapper">
        <Typography gutterBottom>{state} {tasks?.length !== 0 ? `- ${tasks?.length}` : ''}</Typography>
      </Box>
      <Divider />
      <Box pt={1}>
        {tasks?.map((task) => (
          <Task title={task.title} description={task.description} key={task.id} />
        ))}
      </Box>
    </Box>
  );
}
