import ApiService, { delay } from './ApiService';

const USE_MOCK = true;

export class AuthApi {
  static async login(email: string, password: string):Promise<any> {
    if (USE_MOCK) {
      await delay(800);
      const encodedId = btoa(email);
      const encodedPass = btoa(password);

      if (encodedId === 'dGl3YXJpNTMzMg==' && encodedPass === 'QXNkMTIzNTY3OTBA') {
        return {
          token: 'dGl3YXJpNTMzMg==',
          user: { name: 'Admin User', email: 'admin@schoolerp.com', role: 'admin' }
        };
      } else {
        throw new Error('Invalid ID or Password');
      }
    }
    return ApiService.post('/auth/login', { email, password });
  }

  static async signup(userData: any):Promise<any> {
    if (USE_MOCK) {
      await delay(1000);
      return { success: true, message: "User registered successfully" };
    }
    return ApiService.post('/auth/signup', userData);
  }

  static async forgotPassword(email: string):Promise<any> {
    if (USE_MOCK) {
      await delay(800);
      return { success: true, message: "Reset link sent to your email" };
    }
    return ApiService.post('/auth/forgot-password', { email });
  }
}
