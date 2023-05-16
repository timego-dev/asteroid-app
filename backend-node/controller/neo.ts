import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { neos } from '../mock/neos';

export const readAll = async (req: Request, res: Response) => {
  try {
    res.status(StatusCodes.OK).json({
      success: true,
      neos,
    });
  } catch (err: any) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, error: err.message });
  }
};

export const read = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const data: any = Object.values(neos.near_earth_objects).reduce(
      (r: any, c: any) => {
        r = [...r, ...c];
        return r;
      },
      []
    );

    const neo = data.find((item: any) => item.id === id);

    if (neo) {
      res.status(StatusCodes.OK).json({
        success: true,
        neo,
      });
    } else {
      res.status(StatusCodes.NOT_FOUND).json({
        success: false,
      });
    }
  } catch (err: any) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, error: err.message });
  }
};
