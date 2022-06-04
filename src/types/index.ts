export interface Category {
  id: number;
  name: string;
}

export interface CategoryListProps {
  categories: Category[];
  saveMemo: (
    memo: Memo
  ) => void;
}

export interface CategoryItemViewProps {
  id: number;
  name: string;
  expanded?: number | boolean;
  memos: {[key: string]: Memo[]}
  handleChange: (
    id: number,
  ) =>
    | ((event: React.SyntheticEvent<Element, Event>, expanded: boolean) => void)
    | undefined;
}

export interface Memo {
  id: number;
  title: string;
  content: string;
  categoryId: number;
}

export interface AddMemoProps {
  id?: number;
  title: string;
  content: string;
  categoryId: number;
}

export interface UpdateMemo {
  id: number;
  title: string;
  content: string;
  categoryId: number;
}
