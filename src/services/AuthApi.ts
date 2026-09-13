import ApiService from './ApiService';
import authService from '../api/services/authService';
import { getOrCreateDeviceId } from '../utils/deviceId';

export class AuthApi {
  static async login(msisdn: string, password: string): Promise<any> {
    const deviceId = getOrCreateDeviceId();
    return authService.loginAdmin({ msisdn, password, deviceId });
  }

  static async signup(userData: any): Promise<any> {
    return authService.registerAdmin({
      fullName: userData.name || userData.fullName,
      mobileNo: userData.mobile || userData.mobileNo,
      schoolName: userData.schoolName,
      emailAddress: userData.email || userData.emailAddress,
      password: userData.password,
      confirmPassword: userData.confirmPassword || userData.password,
    });
  }

  static async forgotPassword(email: string): Promise<any> {
    return ApiService.post('/auth/forgot-password', { email });
  }
}
