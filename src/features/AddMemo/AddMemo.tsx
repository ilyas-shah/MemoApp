import {Box, Paper, Stack, useTheme} from '@mui/material';
import {CustomButton} from 'components/Button';
import React, {useState, useEffect} from 'react';
import {CustomTextField} from 'components/TextField';
import {useNewMemo} from 'features/Dashboard';
import {Memo} from 'types';

const API_URL = 'https://challenge-server.tracks.run/memoapp';

const AddMemo: React.FC<Memo> = ({categoryId, id, title, content}) => {
  const theme = useTheme();
  const {deleteMemo} = useNewMemo();
  const [newTitle, setNewTitle] = useState<string>('');
  const [newContent, setNewContent] = useState<string>('');
  const [memoId, setMemoId] = useState<number>(0);
  const [loading, toggleLoading] = useState<boolean>(false);

  const updateMemo = async () => {
    if (!newTitle) return;

    toggleLoading(true);

    try {
      await fetch(`${API_URL}/memo/${memoId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'X-ACCESS-TOKEN': `${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify({
          category_id: categoryId,
          title: newTitle,
          content: newContent,
        }),
      });
      toggleLoading(false);
    } catch (error) {
      toggleLoading(false);
      console.log(error);
    }
  };

  const removeMemo = async (id: number) => {
    toggleLoading(true);

    try {
      await fetch(`${API_URL}/memo/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'X-ACCESS-TOKEN': `${localStorage.getItem('accessToken')}`,
        },
      });
      deleteMemo(id);
      toggleLoading(false);
    } catch (error) {
      toggleLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    setNewTitle(title);
    setNewContent(content);
    setMemoId(id);
  }, [title, content, id]);

  return (
    <Paper elevation={3} sx={{height: '100%', padding: '10px'}}>
      <Paper
        elevation={0}
        sx={{
          flex: 0.8,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'white',
          border: 'none',
          borderRadius: '0',
          width: 'calc(100 - 300px)',
          marginTop: '80px',
          marginBottom: '20px',
        }}>
        <CustomTextField
          label="Title"
          value={newTitle}
          disabled={!title || loading}
          inputProps={{
            disableUnderline: true,
            sx: {
              height: '100%',
              backgroundColor: 'transparent',
              border: 'none',
              borderBottom: '1px dashed black',
              borderRadius: 0,
              padding: '0px',
              caretColor: 'black',
              color: 'black',
              fontSize: '16px',
            },
          }}
          inputLabelProps={{
            size: 'small',
            sx: {
              fontSize: 16,
            },
          }}
          onChange={(value: string) => setNewTitle(value)}
        />
        <CustomTextField
          label="Content"
          value={newContent}
          disabled={!title || loading}
          multiline
          rows={6}
          inputProps={{
            disableUnderline: true,
            sx: {
              height: '100%',
              backgroundColor: 'transparent',
              border: 'none',
              borderBottom: '1px dashed black',
              borderRadius: 0,
              padding: '0px',
              caretColor: 'black',
              color: 'black',
              fontSize: '16px',
            },
          }}
          inputLabelProps={{
            size: 'small',
            sx: {
              fontSize: 16,
            },
          }}
          onChange={(value: string) => setNewContent(value)}
        />
      </Paper>
      <Box>
        <Stack direction='row' spacing={2}>
          <CustomButton
            label="SAVE"
            onClick={() => updateMemo()}
            disabled={!title || loading}
            variant="contained"
            styles={{
              color: theme.palette.secondary.main,
              backgroundColor: theme.palette.neutral.main,
              '&:hover': {
                bgcolor: theme.palette.neutral.main,
              },
            }}
          />

          <CustomButton
            label="DELETE"
            onClick={() => removeMemo(memoId)}
            disabled={!title || loading}
            variant="contained"
            styles={{
              color: theme.palette.secondary.main,
              backgroundColor: theme.status.danger,
              '&:hover': {
                bgcolor: theme.status.danger,
              },
            }}
          />
        </Stack>
      </Box>
    </Paper>
  );
};

export {AddMemo};
