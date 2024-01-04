import React, { useEffect, useState } from "react";
import useTodoStore from "../store/todoStore";
import useNotificationStore from "../store/NotificationStore";
import GroupMenu from "./GroupMenu";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import { DeleteForever } from "@mui/icons-material";
import DriveFileRenameOutlineRoundedIcon from '@mui/icons-material/DriveFileRenameOutlineRounded';
import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import GroupFormDialog from "./GroupForm";
import { useTheme } from '@mui/material/styles';
import useConfigStore from "../store/configStore";
import { capitalizeFirstLetter  } from "../utils/StringUtils";

const Sidebar = ({toggleTheme, isDarkTheme}) => {
   const theme = useTheme()
  const {  groups, deleteGroup } = useTodoStore();
  const { selectedGroup, setSelectedGroup, } = useConfigStore()
  const { showNotification } = useNotificationStore();
  const [anchorEls, setAnchorEls] = useState({});
  const [ isOpenEditForm, setIsOpenEditForm] = useState(false)
  const [ indexOfSelectedGroup, setIndexOfSelectedGroup] = useState(false)


  useEffect(()=>{
    setIndexOfSelectedGroup(groups.indexOf(selectedGroup))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[selectedGroup])

  useEffect(()=>{
    if(groups.length>0){
      if(groups[indexOfSelectedGroup]){
        handleGroupSelection(groups[indexOfSelectedGroup])
      } else {
        handleGroupSelection(groups[indexOfSelectedGroup - 1])
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[groups])
  
  const handleGroupSelection = (group) => {
    setSelectedGroup(group);
  };

  const handleClick = (event, group) => {
    setAnchorEls({ ...anchorEls, [group.id]: event.currentTarget });
  };

  const handleClose = (group) => {
    setAnchorEls({ ...anchorEls, [group.id]: null });
  };

  const handleDeleteGroup = (group) => {
    deleteGroup(group.id);
    handleClose(group);
    showNotification(`Group '${group.name}' has been deleted`)
  };

  const handleEditFormOpen = (group) => { 
    setIsOpenEditForm(true);
    handleClose(group)
   }

  return (
    <Box
      sx={{
        background: theme.palette.grey,
        "& .MuiDrawer-paper": {
          width: 240,
          boxShadow: 4,
          display: "flex",
          pt: 0,
        },
      }}
      
    >
      <Box
        sx={{
          position: "relative",
          paddingY: '7.5px' 
        }}
      >
        <GroupMenu />
        <Divider />
      </Box> 
      <List
        disablePadding >
        {groups?.map(group => {
          return (
            <span key={group.id}>
              <ListItem
                onClick={() => handleGroupSelection(group)}
                dense
                sx={{
                  background: group?.id === selectedGroup?.id ? theme.palette.action.disabled : "",
                  margin: '5px 0px',
                  borderRadius: "8px",
                  "&:hover": group?.name !== selectedGroup?.name ? {
                    background: theme.palette.divider,
                    cursor: 'pointer'
                  } : {},
                }}
                secondaryAction={
                  <>
                    <IconButton
                      onClick={(event) => handleClick(event, group)}
                      size="small"
                      edge="end"
                      aria-label="option"
                      color="inherit"
                    >
                      <MoreHorizRoundedIcon  />
                    </IconButton>
                    <Menu
                      id={`basic-menu-${group.id}`}
                      anchorEl={anchorEls[group.id]}
                      open={Boolean(anchorEls[group.id])}
                      onClose={() => handleClose(group)}
                      MenuListProps={{
                        "aria-labelledby": `basic-button-${group.id}`,
                      }}
                    >
                      <MenuItem dense onClick={()=>handleEditFormOpen(group)}>
                        <ListItemIcon>
                          <DriveFileRenameOutlineRoundedIcon color="info" fontSize="small" />
                        </ListItemIcon>
                        Edit
                      </MenuItem>
                      <MenuItem dense onClick={() => handleDeleteGroup(group)}>
                        <ListItemIcon>
                          <DeleteForever color="error" fontSize="small" />
                        </ListItemIcon>
                        Delete
                      </MenuItem>
                    </Menu>
                  </>
                }
              >
                <ListItemText>
                  <Typography noWrap>{capitalizeFirstLetter(group.name)}</Typography>
                </ListItemText>
              </ListItem>
            </span>
          );
        })}
      </List>
      <GroupFormDialog open={isOpenEditForm} isEdit={true} onClose={()=>setIsOpenEditForm(false)}  />
    </Box>
  );
};

export default Sidebar;
