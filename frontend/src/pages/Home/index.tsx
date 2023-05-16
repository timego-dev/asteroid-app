import { Star, StarBorder, Visibility } from '@mui/icons-material';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Stack,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { GridRenderCellParams } from '@mui/x-data-grid/models/params/gridCellParams';
import { DateRange, DateRangePicker } from '@mui/x-date-pickers-pro';
import axios from 'axios';
import { Dayjs } from 'dayjs';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { API_SERVER, FAVORITE_ITEMS_KEY, ROUTES } from '../../contants';
import { INeo } from '../../interface';

export const HomePage: FC = () => {
  const [favoriteItems, setFavoriteItems] = useState<string[]>();
  const [neos, setNeos] = useState<INeo[]>([]);
  const [visibleFavorites, setVisibleFavorites] = useState<boolean>(false);
  const [date, setDate] = useState<DateRange<Dayjs>>();

  const navigate = useNavigate();

  const fetchData = () => {
    axios
      .get(`${API_SERVER}/neos`, {
        params: {
          startDate: date ? date[0]?.format('YYYY-MM-DD') : undefined,
          endDate: date ? date[1]?.format('YYYY-MM-DD') : undefined,
        },
      })
      .then((res: any) => {
        const data: any = Object.entries(
          res.data.neos.near_earth_objects
        ).reduce((r: any, c: any) => {
          r = [
            ...r,
            ...c[1].map((item: any) => ({
              ...item,
              date: c[0],
            })),
          ];
          return r;
        }, []);

        setNeos(data);
      })
      .catch((err) => console.log(err));
  };
  const handleToggleFavorite = (id: string) => () => {
    if (!favoriteItems) {
      setFavoriteItems([id]);
    } else {
      if (favoriteItems.includes(id)) {
        setFavoriteItems(favoriteItems.filter((item) => id !== item));
      } else {
        setFavoriteItems([...favoriteItems, id]);
      }
    }
  };
  const handleChangeDate = (value: any) => {
    setDate(value);
  };

  const renderActions = (params: GridRenderCellParams) => {
    const id = `${params.id}`;

    return (
      <Stack spacing={2} direction="row">
        {favoriteItems && favoriteItems.includes(id) ? (
          <IconButton color="warning" onClick={handleToggleFavorite(id)}>
            <Star />
          </IconButton>
        ) : (
          <IconButton color="warning" onClick={handleToggleFavorite(id)}>
            <StarBorder />
          </IconButton>
        )}
        <IconButton color="warning" onClick={handleRowClick(id)}>
          <Visibility />
        </IconButton>
      </Stack>
    );
  };

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Name',
      disableColumnMenu: true,
      flex: 1,
    },
    {
      field: 'date',
      headerName: 'Date',
      sortable: false,
      disableColumnMenu: true,
      width: 300,
    },
    {
      field: '',
      headerName: 'Action',
      headerAlign: 'right',
      sortable: false,
      disableColumnMenu: true,
      pinnable: true,
      align: 'right',
      width: 200,
      renderCell: renderActions,
    },
  ];

  const handleRowClick = (id: string) => () => {
    navigate(ROUTES.DETAIL.replace(':id', id));
  };

  const handleToggleVisibleFavorites = () => {
    setVisibleFavorites(!visibleFavorites);
  };

  useEffect(() => {
    fetchData();
    const favorites = localStorage.getItem(FAVORITE_ITEMS_KEY);
    if (favorites !== 'undefined' && favorites) {
      setFavoriteItems(JSON.parse(favorites));
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (favoriteItems) {
      localStorage.setItem(FAVORITE_ITEMS_KEY, JSON.stringify(favoriteItems));
    }
  }, [favoriteItems]);

  return (
    <>
      <Card>
        <CardHeader
          title="Neos"
          action={
            <Stack spacing={2} direction="row" alignItems="center">
              <Button onClick={handleToggleVisibleFavorites}>
                Show {visibleFavorites ? 'All' : 'Favorites'}
              </Button>
              <DateRangePicker
                value={date}
                onChange={handleChangeDate}
                localeText={{ start: 'Start Date', end: 'End Date' }}
              />
            </Stack>
          }
        />
        <CardContent>
          <DataGrid
            rows={neos.filter(({ id }) =>
              visibleFavorites
                ? favoriteItems && favoriteItems.includes(id)
                : true
            )}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[5, 10]}
            disableRowSelectionOnClick
          />
        </CardContent>
      </Card>
    </>
  );
};
