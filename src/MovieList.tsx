import React from "react";
import { Box, IconButton } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import { removeFromFavouriteStorage } from "./favouriteStorage";

export type MovieData = {
  Title?: string;
  Year?: string;
  imdbID?: string;
  Type?: string;
  Poster?: string;
}

type Props = {
  data: {page: number; movies:[MovieData]};
  loading: boolean;
  totalRows?: number;
  setPage?: (page: number) => void;
  deletable?: boolean;
}

function removeFromFavourites(id: string) {
  removeFromFavouriteStorage(id);
}

const columns:GridColDef[] = [
  {
    field: 'Title',
    headerName: 'Title',
    flex: 1,
    renderCell: (params: GridRenderCellParams<string>) => {
      return (
        <Link to={`/details/${params.row.imdbID}`}>
          {params.value}
        </Link>
      )
    }
  },
  {
    field: 'Year',
    headerName: 'Year of release',
    width: 150,
  },
  {
    field: 'Type',
    headerName: 'Type',
  }
]

const columnsDel:GridColDef[] = columns.concat([
  {
    field: 'Remove',
    headerName: 'Remove',
    renderCell: (params: GridRenderCellParams<string>) => {
      return (
        <Link reloadDocument to='/favourites'>
          <IconButton sx={{ color: 'red'}} onClick={(e) => {removeFromFavourites(params.row.imdbID)}}>
            <DeleteIcon />
          </IconButton>
        </Link>
      )
    }
  }
])

function MovieList({data, loading, totalRows, setPage, deletable}: Props) {
  console.log(data)
  return (
    <Box sx={{ height: 400, width: 'auto', margin: 15, marginTop: 2 }}>
      {deletable ? (
        <DataGrid 
          disableSelectionOnClick 
          rows={data.movies}
          columns={columnsDel}
          pageSize={10}
          rowsPerPageOptions={[10]}
          getRowId={(row) => {
            return row.imdbID;
          }}
        />
      ) : (totalRows && setPage) ? (
        <DataGrid 
          disableSelectionOnClick 
          rows={data.movies}
          rowCount={totalRows}
          paginationMode='server'
          onPageChange={(page) => {setPage(page)}}
          columns={columns}
          pageSize={10}
          loading={loading}
          rowsPerPageOptions={[10]}
          getRowId={(row) => {
            return row.imdbID;
          }}
          initialState = {{
            pagination: {
              page: data.page,
            }
          }}
        />
      ) : 
      (
        <DataGrid 
          disableSelectionOnClick 
          rows={data.movies}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          getRowId={(row) => {
            return row.imdbID;
          }}
        />
      )}
    </Box>
  )
}

export default MovieList;