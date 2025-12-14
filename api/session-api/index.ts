import login from './login';
import logout from './logout';

function sessionApi() {
  logout();
  login();
}

export default sessionApi;
