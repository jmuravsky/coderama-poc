import { IconButton, InputBase, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React, { useState } from 'react';
import MovieList, { MovieData } from './MovieList';
import { Link } from 'react-router-dom';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { css } from '@emotion/css';

function Search() {
  const [data, setData] = useState<{page: number; movies:[MovieData]}>();
  const [totalRows, setTotalRows] = useState<number>(0);
  const [searchId, setSearchId] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  function handleInputChange(id:string) {
    setSearchId(id);
  }

  async function searchMovies(page: number) {
    setLoading(true);
    const response = await fetch(`http://omdbapi.com/?apikey=28c9db51&s=${searchId}&page=${page+1}`,{
      method: 'GET'
    })
    const responseJson = await response.json();
    if (responseJson.Response) {
      setData({page, movies:responseJson.Search})
    }
    if (responseJson.totalResults) {
      setTotalRows(parseInt(responseJson.totalResults));
    }
    setLoading(false);
  }

  async function handleMovieSearched() {
    searchMovies(0);
  }

  async function handlePageSet(page: number) {
    searchMovies(page);
  }

  return (
    <div className="App">
        <Paper 
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            handleMovieSearched();
          }}
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, margin: 'auto', marginTop: 10 }}
        >
          <InputBase
            onChange={(e) => {
              handleInputChange(e.target.value);
            }}
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search OMDb"
            inputProps={{ 'aria-label': 'search omdb' }}
          />
          <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={() => {handleMovieSearched();}}>
            <SearchIcon />
          </IconButton>
        </Paper>
        <Link to='favourites' className={css`position: absolute; top: 0px; right:0px;`}>
          <IconButton>
            <StarBorderIcon />
          </IconButton>
        </Link>
      {data ? (<MovieList data={data} loading={loading} totalRows={totalRows} setPage={handlePageSet} />) : ''}
    </div>
  );
}

export default Search;
