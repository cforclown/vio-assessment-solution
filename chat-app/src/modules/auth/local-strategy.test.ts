import { InitLocalStrategy } from '.';

describe('local-strategy', () => {
  const mockPassport: any = {
    use: jest.fn(),
    serializeUser: jest.fn(),
    deserializeUser: jest.fn()
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call use, serializeUser and deserializeUser', () => {
    InitLocalStrategy(mockPassport, {} as any);

    // Assert
    expect(mockPassport.use).toHaveBeenCalled();
    expect(mockPassport.serializeUser).toHaveBeenCalled();
    expect(mockPassport.deserializeUser).toHaveBeenCalled();
  });
});
