
import { AuthService, IUser, IUserContext } from '../modules';

class SIOService {
  static readonly INSTANCE_NAME = 'sioService';

  private readonly authService: AuthService;

  constructor (authService: AuthService) {
    this.authService = authService;
  }

  verifyAccessToken (accessToken: string): Promise<IUser> {
    return this.authService.verifyAccessToken(accessToken);
  }

  refreshUserToken (refreshToken: string): Promise<IUserContext> {
    return this.authService.refresh(refreshToken);
  }
}

export default SIOService;
