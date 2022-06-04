import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Box,
  useTheme,
} from '@mui/material';
import React, {useEffect, useState} from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import {CustomButton} from 'components/Button';
import {CustomTextField} from 'components/TextField';

interface HeaderProps {
  onLogin: () => object;
  loading?: boolean;
}

function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    .split('')
    .map(c => {
      switch (c) {
        case 'x':
          return ((Math.random() * 16) | 0).toString(16);
        case 'y':
          return (((Math.random() * 4) | 0) + 8).toString(16);
        default:
          return c;
      }
    })
    .join('');
}

export const Header: React.FC<HeaderProps> = ({onLogin, loading}) => {
  const theme = useTheme();
  const [accessToken, setAccessToken] = useState<string>('');
  const [disabled, setDisabled] = useState<{
    submit: boolean;
    accessToken: boolean;
  }>({
    submit: false,
    accessToken: false,
  });

  const onAccessTokenChange = (value: string) => {
    const atRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

    if (!atRegex.test(value)) {
      setDisabled({...disabled, submit: true});
    } else {
      setDisabled({...disabled, submit: false});
      localStorage.setItem('accessToken', value);
    }

    setAccessToken(value);
  };

  const generateToken = () => {
    const token = uuid();
    setAccessToken(token);
    localStorage.setItem('accessToken', token);
  };

  const handleSubmit = async () => {
    if (!accessToken) return;
    onLogin();
  };

  useEffect(() => {
    if (loading) {
      setDisabled({accessToken: true, submit: true});
    } else {
      setDisabled({accessToken: false, submit: false});
    }
  }, [loading]);

  return (
    <AppBar position="fixed" sx={{height: '80px'}}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{mr: 2}}>
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          color="inherit"
          component="div"
          sx={{flex: 0.7}}>
          Memo app
        </Typography>
        <CustomButton
          label="Generate Token"
          onClick={generateToken}
          variant="text"
          styles={{color: theme.palette.secondary.main}}
        />
        <Box
          sx={{flex: 0.5, paddingLeft: 5, paddingRight: 5}}
          component="form"
          noValidate
          autoComplete="off">
          <CustomTextField
            label={!accessToken ? 'Access Token' : ''}
            value={accessToken}
            variant="standard"
            size="small"
            styles={{width: '100%', padding: 0}}
            disabled={disabled.accessToken}
            inputProps={{
              disableUnderline: true,
              sx: {
                height: '100%',
                backgroundColor: 'transparent',
                border: 'none',
                borderBottom: '1px solid white',
                borderRadius: 0,
                padding: '0px',
                caretColor: 'white',
                color: 'white',
              },
            }}
            inputLabelProps={{
              size: 'small',
              sx: {
                color: 'white !important',
                fontSize: 12,
              },
            }}
            onChange={(value: string) => onAccessTokenChange(value)}
          />
        </Box>
        <CustomButton
          label="Login"
          onClick={handleSubmit}
          disabled={disabled.submit}
          variant="text"
          styles={{color: theme.palette.secondary.main}}
        />
      </Toolbar>
    </AppBar>
  );
};
