import { FormEvent, useState } from 'react';
import { TextField, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import SearchIcon from '@mui/icons-material/Search';

interface IProps {
  onSearch: (value: string) => void;
  isLoading: boolean;
}

const SearchComponent = ({ onSearch, isLoading }: IProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if(searchTerm.trim().length > 0) {
      onSearch(searchTerm.trim());
    }
  };

  return (
    <form onSubmit={handleSearch} >
      <Box display={'flex'} alignItems={"center"} justifyContent={"center"} columnGap={"16px"} mb={"16px"}>
        <TextField
          label="Search Weather"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <LoadingButton
          type='submit' 
          loading={isLoading}
          loadingPosition="start"
          startIcon={<SearchIcon />}
          variant="outlined"
        >
          Search
        </LoadingButton>
      </Box>
    </form>
  );
};

export default SearchComponent;
