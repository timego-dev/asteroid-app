import {
  Card,
  CardContent,
  CardHeader,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { API_SERVER } from '../../contants';
import { INeo } from '../../interface';

export const DetailPage: FC = () => {
  const [neo, setNeo] = useState<INeo>();

  const { id } = useParams<{ id: string }>();

  const fetchData = () => {
    axios
      .get(`${API_SERVER}/neos/${id}`)
      .then((res) => {
        setNeo(res.data.neo);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  return neo ? (
    <Card>
      <CardHeader title={neo.name} />
      <CardContent>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell variant="head">ID: </TableCell>
              <TableCell colSpan={2}>{neo.id}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head">Absolute Magnitude Height: </TableCell>
              <TableCell colSpan={2}>{neo.absolute_magnitude_h}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head" rowSpan={2}>
                Estimated Diameter
              </TableCell>
              <TableCell>Max</TableCell>
              <TableCell>
                {neo.estimated_diameter.kilometers.estimated_diameter_max} km
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Min</TableCell>
              <TableCell>
                {neo.estimated_diameter.kilometers.estimated_diameter_min} km
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head">Is Sentry Object: </TableCell>
              <TableCell colSpan={2}>
                <Chip
                  color={neo.is_sentry_object ? 'success' : 'secondary'}
                  label={`${neo.is_sentry_object}`.toUpperCase()}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell variant="head">
                Is Potentially Hazardous Asteroid:{' '}
              </TableCell>
              <TableCell colSpan={2}>
                <Chip
                  color={
                    neo.is_potentially_hazardous_asteroid
                      ? 'success'
                      : 'secondary'
                  }
                  label={`${neo.is_potentially_hazardous_asteroid}`.toUpperCase()}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  ) : (
    <Typography align="center">There is no data!</Typography>
  );
};
