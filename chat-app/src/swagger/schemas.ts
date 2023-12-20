import { explorationSwaggerSchemas, paginationSwagger } from 'cexpress-utils/lib';
import { authSwagger, channelsSwagger, messagesSwagger, UsersSwaggerSchemas } from '../modules';

const schemas = Object.assign(
  { ...explorationSwaggerSchemas },
  { ...paginationSwagger },
  { ...authSwagger },
  { ...UsersSwaggerSchemas },
  { ...channelsSwagger },
  { ...messagesSwagger }
);

export default schemas;
