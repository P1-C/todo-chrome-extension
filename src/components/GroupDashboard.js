import React, { useEffect, useState } from "react";
// import useTodoStore from "../store/todoStore";
import { useTheme } from '@mui/material/styles';
import { Box, Fab, IconButton, Paper, Tooltip, Typography } from "@mui/material";
import TaskForm from "./TaskForm";
import { Stack } from "@mui/system";
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import useConfigStore from "../store/configStore";
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { capitalizeFirstLetter } from "../utils/StringUtils";
import useTodoStore from "../store/todoStore";
import { shallow } from 'zustand/shallow';

const GroupDashboard = () => {
  const theme = useTheme();
  const [isDialogFromOpen, setIsDialogFromOpen] = useState(false);
  const { toggleSideBar, isSideBarOpen, isDarkTheme, toggleTheme, selectedGroup } = useConfigStore()
  const [openAddTaskHelper, setOpenAddTaskHelper] = useState(false)
  const { tasks } = useTodoStore()

  const taskList = useTodoStore(
    (store) => store.tasks.filter((task) => {
      return task.groupID === selectedGroup.id
    }),
    shallow
  );

  const handleNewUser = () => {
    if (selectedGroup && taskList.length === 0 && !isDialogFromOpen) {
      setOpenAddTaskHelper(true)
    } else {
      setOpenAddTaskHelper(false)
    }
  }
  useEffect(() => {
    handleNewUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedGroup, taskList, isDialogFromOpen, tasks])

  const fabStyle = {
    position: 'absolute',
    bottom: 16,
    right: 16,
  };

  const openAddTask = () => {
    setIsDialogFromOpen(true)
  }

  return (
    <Paper
      variant="outlined"
      sx={{
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: "0px",
        display: "block",
      }}
    >
      <Stack direction='row' spacing={3} justifyContent='space-between' minHeight={43} maxHeight={43} width='auto'>
        <Tooltip title={`${isSideBarOpen ? 'Hide' : 'Show'} side panel`} arrow>
          <IconButton size="small" onClick={toggleSideBar} sx={{ width: '42px' }}>
            {isSideBarOpen ? <KeyboardArrowLeftRoundedIcon /> : <KeyboardArrowRightRoundedIcon />}
          </IconButton>
        </Tooltip>
        <Typography noWrap variant="h5" style={{ maxWidth: '20vw', borderBottom: `3px solid ${theme.palette.primary.light}`, borderRadius: '2px', marginTop: 3 }}>
          {capitalizeFirstLetter(selectedGroup.name)}
        </Typography>
        <Box justifySelf='center' display='flex'>
          <Tooltip title={`Turn ${isDarkTheme ? 'on' : 'off'} the light`} arrow>
            <IconButton size="small" color="primary" aria-label="change theme" onClick={toggleTheme} sx={{ width: '42px' }} >
              {isDarkTheme ?
                <LightModeOutlinedIcon />
                :
                <DarkModeOutlinedIcon />
              }
            </IconButton>

          </Tooltip>
        </Box>
        <TaskForm open={isDialogFromOpen} onClose={() => setIsDialogFromOpen(false)} />
            <Tooltip title={'It appears that there are no tasks assigned to this group. Please add new tasks from here'} open={openAddTaskHelper} arrow placement='top-start'>
              <Fab size="medium" color="primary" aria-label="add" sx={fabStyle} onClick={openAddTask} >
                <AddRoundedIcon fontSize="medium" />
              </Fab>
            </Tooltip> 
            {
              !openAddTaskHelper &&
            <Tooltip title='Add new task' arrow placement='left-start'>
              <Fab size="medium" color="primary" aria-label="add" sx={fabStyle} onClick={openAddTask} >
                <AddRoundedIcon fontSize="medium" />
              </Fab>
            </Tooltip>
            }
      </Stack>
    </Paper>
  );
};

export default GroupDashboard;
