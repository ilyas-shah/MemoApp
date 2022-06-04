import {Box, Paper, useTheme} from '@mui/material';
import {CustomButton} from 'components/Button';
import React, {useState} from 'react';
import {CategoryItemView} from './components';
import {AddMemoProps, Memo} from 'types';

const API_URL = 'https://challenge-server.tracks.run/memoapp';

type Category = {
  id: number;
  name: string;
};

interface CategoryListProps {
  categories: Category[];
  saveMemo: (
    memo: Memo
  ) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({categories, saveMemo}) => {
  const theme = useTheme();
  const [loading, toggleLoading] = useState<boolean>(false);
  const [memos, setMemos] = useState<{[key: string]: Memo[]}>({});
  const [expanded, setExpanded] = useState<number | boolean>(false);
  const [categoryId, setCategoryId] = useState<number>(0);
  const handleChange =
    (id: number) =>
    async (event: React.SyntheticEvent, isExpanded: boolean) => {
      setCategoryId(id)
      try {
        if (!memos[id]) {
          const memoList = await getMemos(id);
          setMemos({[id]: memoList});
        }
        setExpanded(isExpanded ? id : false);
      } catch (error) {
        toggleLoading(false);
        console.log(error);
      }
    };

  const getMemos = async (categoryId: number): Promise<any> => {
    // toggleLoading(true);
    try {
      const result = await fetch(`${API_URL}/memo?category_id=${categoryId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'X-ACCESS-TOKEN': `${localStorage.getItem('accessToken')}`,
        },
      });
      return result.json();
    } catch (error) {
      // toggleLoading(false);
      console.log(error);
    }
  };

  const addMemo = async (
    memo: AddMemoProps
  ) => {
    const {title, categoryId, content} = memo;

    if (!title) return
    
    toggleLoading(true);
    
    try {
      const result = await fetch(`${API_URL}/memo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'X-ACCESS-TOKEN': `${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify({
          category_id: categoryId,
          title,
          content,
        }),
      });
      const {id} = await result.json();
      saveMemo({categoryId: categoryId, title: 'New memo', content: '', id})
      toggleLoading(false);
    } catch (error: unknown) {
      toggleLoading(false);
      console.log(error);
      throw new Error('Something went wrong');
    }
  };

  const handleAddMemo = () => {
    const memoList = memos[categoryId];
    memoList.push({title: 'New Memo', content: '', id: 0, categoryId })
    setMemos({...memos, ...{
      [categoryId]: memoList
    }})
    try {
      addMemo({categoryId: categoryId, title: 'New memo', content: ''})
    } catch (error) {
      console.log(error)
    }
  }

  return categories.length ? (
    <Paper
      elevation={3}
      sx={{
        flex: .2,
        position: 'absolute',
        backgroundColor: 'white',
        border: 'none',
        borderRadius: '0',
        width: '250px',
        minWidth: '250px',
        height: 'auto',
        marginTop: '80px',
        padding: '8px',
      }}>
      {categories.map(category => (
        <CategoryItemView
          key={category.id}
          id={category.id}
          name={category.name}
          expanded={expanded}
          memos={memos}
          handleChange={handleChange}
        />
      ))}
      <Box display="flex" flexDirection="row-reverse">
        <CustomButton
          label="NEW"
          onClick={handleAddMemo}
          disabled={!expanded || loading}
          variant="contained"
          styles={{
            color: theme.palette.secondary.main,
            backgroundColor: theme.palette.neutral.main,
            '&:hover': {
              bgcolor: theme.palette.neutral.main,
            },
          }}
        />
      </Box>
    </Paper>
  ) : null;
};

export {CategoryList}