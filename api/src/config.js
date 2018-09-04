import dotenv from 'dotenv';
import fs from 'fs';
import debugLogger from 'debugnyan';

const logger = debugLogger('tippiq:config');

const nodeEnv = process.env.NODE_ENV || 'development';

const config = [
  `.env.${nodeEnv}.local`,
  `.env.${nodeEnv}`,
  '.env.local',
  '.env',
]
  .filter(fs.existsSync)
  .map(path => dotenv.config({ path }))
  .reduce((prev, { parsed }) => ({ ...prev, ...parsed }), {});

logger.debug({ nodeEnv, config });

export default config;
