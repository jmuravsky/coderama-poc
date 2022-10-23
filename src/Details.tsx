import React from 'react';
import { Link, LoaderFunctionArgs, useLoaderData } from 'react-router-dom';
import { IconButton, styled, Table, TableBody, TableCell, TableRow } from '@mui/material';
import { css } from '@emotion/css';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import HomeIcon from '@mui/icons-material/Home';
import { addToFavouriteStorage, isInFavouriteStorage } from './favouriteStorage';
import { MovieData } from './MovieList';

export type MovieDetail = {
  Title?: string;
  Year?: string;
  Rated?: string;
  Released?: string;
  Runtime?: string;
  Genre?: string;
  Director?: string;
  Writer?: string;
  Actors?: string;
  Plot?: string;
  Language?: string;
  Country?: string;
  Awards?: string;
  Poster?: string;
  Metascore?: string;
  imdbRating?: string;
  imdbVotes?: string;
  imdbID?: string;
  Type?: string;
  DVD?: string;
  BoxOffice?: string;
  Production?: string;
  Website?: string;
  Response?: string;
  Ratings?: 
  [{
    Source?: string;
    Value?: string;
  }];
}

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export async function detailsLoader({params}: LoaderFunctionArgs):Promise<MovieDetail> {
  const response = await fetch(`http://omdbapi.com/?apikey=28c9db51&i=${params.id}`,{
    method: 'GET'
  })
  const responseJson = await response.json();
  return responseJson;
}

function Details() {
  const data = useLoaderData();

  function addToFavourites(movie: MovieDetail) {
    const {Title, Year, imdbID, Type, Poster } = movie;
    const data: MovieData = {Title, Year, imdbID, Type, Poster};
    addToFavouriteStorage(data);
    console.log(movie.imdbID);
  }

  return (
    <div className="App">
      <Link to='/' >
        <IconButton >
          <HomeIcon />
        </IconButton>
      </Link>
      <img src={data && (data as MovieDetail).Poster ? (data as MovieDetail).Poster : ''} alt='movie poster' className={css`position: absolute; top: 0px; right:0px`} />
      <Table>
        <TableBody>
          {data ? Object.entries(data).map((row) => {
            if (row[0] === "Ratings" || row[0] === "Response" || row[0] === "Poster") {
              return ''
            }
            return (
              <StyledTableRow key={row[0]}>
                <TableCell>
                  {row[0]}
                </TableCell>
                <TableCell> 
                  {(row[0] === "Title") ? (
                    <>
                      {row[1]}
                      <Link to='/favourites' >
                        {isInFavouriteStorage((data as MovieDetail).imdbID) ? (
                          <IconButton sx={{ color: 'yellow' }}>
                            <StarIcon />
                          </IconButton>
                        ) : (
                          <IconButton onClick={(e) => {addToFavourites((data as MovieDetail))}}>
                            <StarBorderIcon />
                          </IconButton>
                        )}
                      </Link>
                    </>
                  ) : row[1]}
                </TableCell>
              </StyledTableRow>
            )
          }) : ''}
        </TableBody>
      </Table>
    </div>
  );
}

export default Details;
