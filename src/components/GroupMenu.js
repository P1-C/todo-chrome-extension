import React, { useEffect, useState } from "react";
import { Box, Button, IconButton, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import GroupDialogForm from "./GroupForm";
import useTodoStore from "../store/todoStore";



const GroupMenu = () => {
  const { groups } = useTodoStore()
  const [isDialogFromOpen, setIsDialogFromOpen] = useState(false);
  const [openAddGroupHelper, setOpenAddGroupHelper] = useState(false)

   const handleNewUser = () => { 
     if(groups.length === 0 && !isDialogFromOpen){
       setOpenAddGroupHelper(true)
     } else {
      setOpenAddGroupHelper(false)
     }
    }
    useEffect(() => {
     handleNewUser()
    }, [groups, isDialogFromOpen])

  const handleAddGroup = () => { 
    setIsDialogFromOpen(true)
    if(openAddGroupHelper) setOpenAddGroupHelper(false)
   }

  return (
    <Box display="flex" justifyContent="space-between">
      <GroupDialogForm
        open={isDialogFromOpen}
        onClose={() => setIsDialogFromOpen(false)}
      />
      <Box paddingX={5}> 
      
      <Tooltip 
      title={`Please create a new group using above 'Add Group' button. Organizing tasks into groups enhances efficiency in task management`} 
      open={openAddGroupHelper} 
      arrow 
      placement="bottom-end"
      >
        <Button
          disableFocusRipple
          color="primary"
          onClick={handleAddGroup}
          variant="text"
          fullWidth
          startIcon={<AddIcon />}
        >
          Add Group
        </Button>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default GroupMenu;
