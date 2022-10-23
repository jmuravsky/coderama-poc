import { IconButton } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MovieList, { MovieData } from './MovieList';
import HomeIcon from '@mui/icons-material/Home';
import { getFavourites } from './favouriteStorage';


function Favourites() {

  const [data, setData] = useState<{page: number; movies:[MovieData]}>();

  React.useEffect(()=>{
    const favs:[MovieData] | undefined = getFavourites();
    if (favs){
      setData({page:0, movies: favs});
    }
  },[])

  return (
    <div className="App">
      <Link to='/' >
        <IconButton >
          <HomeIcon />
        </IconButton>
      </Link>
      {data ? (<MovieList data={data} loading={false} deletable />) : ''}
    </div>
  );
}

export default Favourites;
