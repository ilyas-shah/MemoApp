import {Box} from '@mui/material';
import {Header} from 'components/Header';
import {Loader} from 'components/Loader';
import {AddMemo} from 'features/AddMemo';
import {CategoryList} from 'features/CategoryList';
import React, {createContext, useContext, useState} from 'react';
import {Memo, Category} from 'types';

const API_URL = 'https://challenge-server.tracks.run/memoapp';

const DashboardView: React.FC = () => {
  const [loading, toggleLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [memo, setMemo] = useState<Memo>({
    title: '',
    content: '',
    categoryId: 0,
    id: 0,
  });

  const saveMemo = (memo: Memo) => {
    setMemo(memo);
  };
  const deleteMemo = (id: number) => {
    setMemo({
      title: '',
      content: '',
      categoryId: 0,
      id: 0,
    });
  };

  const getCategories = async () => {
    toggleLoading(true);
    try {
      const result = await fetch(`${API_URL}/category`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'X-ACCESS-TOKEN': `${localStorage.getItem('accessToken')}`,
        },
      });
      setCategories(await result.json());
      toggleLoading(false);
    } catch (error) {
      toggleLoading(false);
      console.log(error);
    }
  };

  return (
    <Box sx={{display: 'flex'}}>
      <Header onLogin={getCategories} loading={loading} />
      <MemoContext.Provider value={{saveMemo, deleteMemo}}>
        <CategoryList categories={categories} saveMemo={saveMemo} />
      </MemoContext.Provider>
      <Box
        component="main"
        sx={{flexGrow: 1, height: '100vh', marginLeft: '252px'}}>
        <MemoContext.Provider value={{saveMemo, deleteMemo}}>
          {categories.length && <AddMemo {...memo} />}
        </MemoContext.Provider>
      </Box>

      {loading && <Loader loading={loading} />}
    </Box>
  );
};

export {DashboardView};

const MemoContext = createContext({
  saveMemo: (memo: Memo) => {},
  deleteMemo: (id: number) => {},
});
export const useNewMemo = () => useContext(MemoContext);
