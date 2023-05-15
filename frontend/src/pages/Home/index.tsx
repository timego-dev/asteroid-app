import { Card, CardContent, CardHeader } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { DateRange, DateRangePicker } from '@mui/x-date-pickers-pro';
import axios from 'axios';
import { Dayjs } from 'dayjs';
import { FC, useEffect, useState } from 'react';

import { API_SERVER } from '../../contants';
import { INeo } from '../../interface';

export const HomePage: FC = () => {
  const [neos, setNeos] = useState<INeo[]>([]);
  const [date, setDate] = useState<DateRange<Dayjs>>();

  const fetchData = () => {
    axios
      .get(`${API_SERVER}/neos`, {
        params: {
          startDate: date ? date[0]?.format('YYYY-MM-DD') : undefined,
          endDate: date ? date[1]?.format('YYYY-MM-DD') : undefined,
        },
      })
      .then((res: any) => {
        const data: any = Object.values(res.data.near_earth_objects).reduce(
          (r: any, c: any) => {
            r = [...r, ...c];
            return r;
          },
          []
        );

        setNeos(data);
      })
      .catch((err) => console.log(err));
  };

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Name',
    },
  ];

  const handleChangeDate = (value: any) => {
    setDate(value);
    console.log(value.map((item: Dayjs) => item?.toISOString()));
  };

  useEffect(() => {
    fetchData();
  });

  return (
    <>
      <Card>
        <CardHeader
          title="Neos"
          action={
            <DateRangePicker
              value={date}
              onChange={handleChangeDate}
              localeText={{ start: 'Start Date', end: 'End Date' }}
            />
          }
        />
        <CardContent>
          <DataGrid
            rows={neos}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
          />
        </CardContent>
      </Card>
    </>
  );
};
