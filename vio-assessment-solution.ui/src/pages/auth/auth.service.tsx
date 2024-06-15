import { ILoginReq, IRegisterUserReq, IUserContext } from 'vio-assessment-solution.contracts';
import { callMainAPI, getAuthEndpoint } from '@/utils/call-api';

export const signin = (credentials: ILoginReq): Promise<IUserContext> => callMainAPI(
  getAuthEndpoint('/login', 'POST'),
  credentials,
);

export const signup = (payload: IRegisterUserReq): Promise<IUserContext> => callMainAPI(
  getAuthEndpoint('/register', 'POST'),
  payload,
);

interface IValidateAccessTokenPayload { 
  accessToken: string, 
  refreshToken: string 
}
export const validateAccessToken = (
  { accessToken, refreshToken }: IValidateAccessTokenPayload
): Promise<true | IUserContext> => callMainAPI(
  getAuthEndpoint(
    '/validate', 
    'PUT', 
    { Authorization: `Bearer ${accessToken}` }
  ),
  { refreshToken },
);
