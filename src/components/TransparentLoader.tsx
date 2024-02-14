import React from 'react';
import { CircularProgress } from '@mui/material';
import Backdrop, { BackdropProps } from '@mui/material/Backdrop';
import { styled } from '@mui/material/styles';

const BackdropTransparent = styled(Backdrop)<BackdropProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  color: '#fff',
  position: 'absolute'
}));

interface TransparentLoaderProps {
  open: boolean;
}

const TransparentLoader: React.FC<TransparentLoaderProps> = ({ open }) => {
  return (
    <>
      {open &&
        <BackdropTransparent data-testid="backdrop-transparent" open>
          <CircularProgress data-testid="progressbar" color="inherit" />
        </BackdropTransparent>
      }
    </>
  );
};

export default TransparentLoader;