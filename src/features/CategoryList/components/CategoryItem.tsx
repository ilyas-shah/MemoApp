import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Box,
  useTheme,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FolderIcon from '@mui/icons-material/Folder';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import React from 'react';
import { MemoListView } from 'features/CategoryList/components';
import {CategoryItemViewProps} from 'types';

const CategoryItemView: React.FC<CategoryItemViewProps> = ({
  name,
  id,
  expanded,
  memos,
  handleChange,
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        flexGrow: 1,
        width: '100%',
        height: 'auto',
        padding: '8px',
        border: 'none',
        borderRadius: '0',
      }}>
      <Accordion
        key={id}
        expanded={expanded === id}
        onChange={handleChange(id)}
        elevation={0}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`${name}-content`}
          id={`${name}-header`}>
          <Box sx={{flexGrow: 1, display: 'flex'}}>
            {expanded === id ? (
              <FolderOpenIcon
                sx={{
                  color: theme.palette.primary.main,
                }}
              />
            ) : (
              <FolderIcon />
            )}
            <Typography
              sx={{
                width: '33%',
                flexShrink: 0,
                textTransform: 'capitalize',
                paddingLeft: '20px',
                color: expanded === id ? theme.palette.primary.main : 'inherit',
              }}>
              {name}
            </Typography>
          </Box>
        </AccordionSummary>
        {/* TODO: Memo List */}
        {expanded === id ?  <AccordionDetails>
          <MemoListView memos={memos} categoryId={id}/>
        </AccordionDetails> : null}
      </Accordion>
    </Box>
  );
};

export {CategoryItemView};
