import React from 'react';
import ExpandableText from './ExpandableText';
import { Box } from '@mui/material';

const SubLandingPage = () => {
  const grp = "Groups in a to-do app are organizational tools that help you  categorize your tasks, making it easier to manage and prioritize your responsibilities. These groups are customizable, allowing you to create a structure that best fits your workflow. These are descriptive tags or names that you assign to tasks to classify them based on their nature, context, or purpose."
    const taskText =
    "A task refers to a specific item or action that you need to complete. These are the fundamental units of work or activities that you enter into the app to help you manage your responsibilities and stay organized.The primary purpose of tasks is  to help you manage your daily, weekly, and long-term responsibilities efficiently, ensuring that nothing important falls through the cracks.";
   
  return (
    <Box>
        <Box sx={{
            paddingTop : "100px",
            width : "70%",
        }}>
            <ExpandableText text={taskText} grp={grp} maxChars={100} />
        </Box>
    </Box>
  )
}

export default SubLandingPage