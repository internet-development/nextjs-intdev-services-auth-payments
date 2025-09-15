import * as Server from '@common/server';
import * as Constants from '@common/constants';

export default async function apiIndex(req, res) {
  await Server.cors(req, res);

  res.json({
    data: [],
    count: 0,
    success: true,
    message: 'hey there, friend.',
  });
}
