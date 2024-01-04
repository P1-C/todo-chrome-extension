import React from "react";
import Column from "./Column";
import { Box } from "@mui/material";
import EmptyTask from "../assets/images/EmptyTask.png";
import useTodoStore from "../store/todoStore";
import { shallow } from 'zustand/shallow';
import useConfigStore from "../store/configStore";


const TaskBoard = () => {

  const { selectedGroup } = useConfigStore();

  const tasks = useTodoStore(
    (store) => store.tasks.filter((task) => {
      return task.groupID === selectedGroup.id
    }),
    shallow
  );

  const scrollStyle = {
    overflowY: 'scroll',
    overflowZ: 'hidden',
    '&::-webkit-scrollbar': {
      width: '10px',
      height: '6px'
    },
    '&::-webkit-scrollbar-track': {
      background: 'inherit',
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#888',
      borderRadius: '5px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: '#555',
    },
  }

  const svgContainerStyles = {
    width: '100%',
    maxWidth: '200px',
    margin: '0 auto',
    paddingTop: '23vh'
  };

  return (
    <Box sx={{paddingLeft:1}}>
      {tasks.length > 0 ?
        <Box display='flex' sx={scrollStyle}>
          <Column state="PLANNED" />
          <Column state="ONGOING" />
          <Column state="COMPLETED" />
        </Box> :
        <Box sx={svgContainerStyles}>
          <img src={EmptyTask} alt="EmptyTask" width='100%' />
        </Box>

      }
    </Box>
  );
};

export default TaskBoard;
