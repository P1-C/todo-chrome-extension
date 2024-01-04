import React, { useEffect, useState } from "react";
import GroupDashboard from "./GroupDashboard";
import { Box } from "@mui/material";
import TaskBoard from "./TaskBoard";
import useTodoStore from "../store/todoStore";
import useConfigStore from "../store/configStore";
import EmptyTask from "../assets/images/EmptyTask.png";

const MainSection = () => {
  const { groups } = useTodoStore();
  const { selectedGroup }  = useConfigStore()
  
  const svgContainerStyles = {
    width: '100%',
    maxWidth: '200px',
    margin: '0 auto',
    paddingTop: '29vh'
  };    

  return (
    <>
      {selectedGroup !== null && groups?.length > 0 ? (
        <>
          <GroupDashboard />
          <TaskBoard />
        </>
      ) : (
        <Box sx={svgContainerStyles}>
          <img src={EmptyTask} alt="EmptyTask" width='100%' />
        </Box>
      )}
    </>
  );
};

export default MainSection;
