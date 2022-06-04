import {
  Box,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import React from 'react';
import ReceiptIcon from '@mui/icons-material/Receipt';
import {useNewMemo} from 'features/Dashboard';
import {Memo} from 'types';

const MemoItemView: React.FC<Memo> = ({title, id, categoryId, content = ''}) => {
  const {saveMemo} = useNewMemo();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        width: '100%',
        height: 'auto',
      }}>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <ReceiptIcon />
          </ListItemIcon>
          <ListItemText
            primary={title}
            onClick={() => saveMemo({title, id, categoryId, content})}
          />
        </ListItemButton>
      </ListItem>
    </Box>
  );
};

export {MemoItemView};
