import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useGetAllProfileQuery } from '../../store/services/profileSlice';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { filterPostsActions } from '../../store/slices/Filters';
import { useSearchParams } from 'react-router-dom';

export const Filters = () => {
  const { data: profiles, isLoading } = useGetAllProfileQuery();
  const dispatch = useAppDispatch();
  const filterByName = useAppSelector((state) => state.filterPosts.filterByName);
  const [searchParams, setSearchParams] = useSearchParams();

  const menuItems = profiles?.map((profile) => (
    <MenuItem value={profile.firstName} key={profile.id}>
      {profile.firstName}
    </MenuItem>
  ));

  useEffect(() => {
    const nameFromUrl = searchParams.get('name');
    if (nameFromUrl && nameFromUrl !== filterByName) {
      dispatch(filterPostsActions.selectFilterByName(nameFromUrl));
      if (nameFromUrl === 'All') {
        const params = new URLSearchParams(searchParams);
        params.delete('name');
        setSearchParams(params);
      }
    }
  }, [searchParams, filterByName]);

  const handleChange = (event: SelectChangeEvent) => {
    const selectedName = event.target.value;
    dispatch(filterPostsActions.selectFilterByName(selectedName));

    const params = new URLSearchParams(searchParams);
    if (selectedName && selectedName !== 'All') {
      params.set('name', selectedName);
    } else {
      params.delete('name');
    }

    setSearchParams(params);
  };

  if (isLoading) {
    return null;
  }
  return (
    <Box sx={{ width: 1 / 2 }}>
      <Typography>Filters:</Typography>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">By name</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={filterByName}
          label="By name"
          onChange={handleChange}
        >
          {menuItems}
          <MenuItem value={'All'}>ALL users</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};
