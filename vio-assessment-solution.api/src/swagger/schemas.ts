import { explorationSwaggerSchemas, paginationSwagger } from 'cexpress-utils/lib';
import { authSwagger, servicesSwagger, usersSwagger } from 'vio-assessment-solution.contracts';

const schemas = Object.assign(
  { ...explorationSwaggerSchemas },
  { ...paginationSwagger },
  { ...authSwagger },
  { ...usersSwagger },
  { ...servicesSwagger }
);

export default schemas;
