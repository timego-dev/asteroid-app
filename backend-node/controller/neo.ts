import { StatusCodes } from 'http-status-codes';

import { neos } from '../mock/neos';

// @ts-ignore
export const readAll = async (req, res) => {
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
