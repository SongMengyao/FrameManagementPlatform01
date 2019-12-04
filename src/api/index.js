import apiLogin from './login/index'

const api = {
  apiLogin: apiLogin,
  Login: '/auth/login',
  Logout: '/auth/logout',
  ForgePassword: '/auth/forge-password',
  Register: '/auth/register',
  SendSmsErr: '/account/sms_err',
  // get my info
  UserInfo: '/user/info'
}
export default api
