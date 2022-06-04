import {Box} from '@mui/material';
import React from 'react';
import {Memo} from 'types';
import {MemoItemView} from './MemoItem';

interface MemoListProps {
  memos: {
    [key: string]: Memo[];
  };
  categoryId: number;
}

const MemoListView: React.FC<MemoListProps> = ({memos, categoryId}) => {
  const memoList = memos[categoryId];
  return (
    <Box
      sx={{
        flexGrow: 1,
        width: '100%',
        height: 'auto',
      }}>
      {memoList.map(({id, title}) => (
        <MemoItemView
          key={id}
          id={id}
          title={title}
          categoryId={categoryId}
          content=''
        />
      ))}
    </Box>
  );
};

export {MemoListView};
