import './Task.css';
import useTodoStore from '../store/todoStore';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Box, Chip, IconButton, Paper, Stack, Tooltip, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import PendingActionsRoundedIcon from '@mui/icons-material/PendingActionsRounded';
import ContentPasteGoRoundedIcon from '@mui/icons-material/ContentPasteGoRounded';
import InventoryRoundedIcon from '@mui/icons-material/InventoryRounded';
import useConfigStore from '../store/configStore';
import useNotificationStore from '../store/NotificationStore';
import { capitalizeFirstLetter } from '../utils/StringUtils';


export default function Task({ title }) {

  const theme = useTheme()
  const { toggleTaskDrawer, setSelectedTask } = useConfigStore()
  const setDraggedTask = useTodoStore((store) => store.setDraggedTask);
  const deleteTodoTask = useTodoStore((store) => store.deleteTodoTask);
  const { showNotification } = useNotificationStore()
  
    const task = useTodoStore((store) =>
      store.tasks.find((task) => task?.title === title)
    );

  const handleTaskDrawerOpen = (taskObj) => { 
    toggleTaskDrawer()
    setSelectedTask(taskObj)
   }

   const handleDeleteTask = (e) => {
    deleteTodoTask(task.id)
    e.stopPropagation()
    showNotification('Task Deleted')
    }

  const getMonthName = (monthNumber) => {
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
  
    if (monthNumber >= 1 && monthNumber <= 12) {
      return months[monthNumber - 1];
    } else {
      return '-';
    }
  }
  return (
    <Paper
      onClick={()=>handleTaskDrawerOpen(task)}
      className="task"
      draggable
      onDragStart={() => setDraggedTask(task.id)}
    >
      <Stack direction={'row'} spacing={3} justifyContent={'space-between'}>
        <Typography gutterBottom noWrap>{capitalizeFirstLetter(task?.title)}</Typography>
        <Typography variant='subtitle2' color='GrayText'  >{`${task.dueDate.split('-')[2]}'${getMonthName(task.dueDate.split('-')[1])}`}</Typography>
      </Stack>
      {
        task.description &&
          <Stack direction={'row'} justifyContent={'space-between'}>
            <Typography variant='caption' color='GrayText' marginRight={2}  >{task.description}</Typography>
            {/* <Chip size='small' variant='outlined' label={task.priority} color={`${task.priority === 'HIGH' ? 'error' : task.priority === 'MEDIUM' ? 'warning' : 'success' }`} /> */}
          </Stack> 
      }


      <Box className="bottomWrapper">
        <Tooltip title='Delete Task'>
          <IconButton onClick={(e) => handleDeleteTask(e)} color='ButtonFace'>
            <DeleteOutlineOutlinedIcon color='action' sx={{
              "&:hover": {
                color: theme.palette.error.main,
              },
            }} />
          </IconButton>
        </Tooltip>
        <Chip size='small' variant='outlined' label={task.priority} color={`${task.priority === 'HIGH' ? 'error' : task.priority === 'MEDIUM' ? 'warning' : 'success' }`} />
        <Box>
          <Tooltip title={task.status} arrow>
            <IconButton disableRipple sx={{ "&:hover": { cursor: 'default' } }}>
              {task.status === 'PLANNED' ?
                <PendingActionsRoundedIcon color='info' />
                : task.status === 'ONGOING' ?
                  <ContentPasteGoRoundedIcon color='secondary' />
                  : <InventoryRoundedIcon color='success' />
              }
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Paper>
  );
}