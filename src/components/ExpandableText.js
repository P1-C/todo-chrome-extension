import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box } from '@mui/material';

const ExpandableText = ({ text, maxChars = 500, grp }) => {
  const [expandedAccordion, setExpandedAccordion] = useState(null);

  const handleChange = (panel) => {
    setExpandedAccordion(panel === expandedAccordion ? null : panel);
  };

  return (
    <Box>
      <Accordion
        expanded={expandedAccordion === 'group'}
        onChange={() => handleChange('group')}
        style={{ borderRadius: '10px', background : "#5271ff"}}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="group-text-content"
          id="group-text-header"
        >
          <Typography variant="h6">Group</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1">
            {text}
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expandedAccordion === 'task'}
        onChange={() => handleChange('task')}
        style={{ borderRadius: '10px', marginTop : "5px", background : "#add8e6"}}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="task-text-content"
          id="task-text-header"
        >
          <Typography variant="h6">Task</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1">
            {grp}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default ExpandableText;
