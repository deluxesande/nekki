import Cookies from 'js-cookie';
// Replace 'your_access_token' with the actual access token received from the server
const accessToken = 'your_access_token';

// Set the cookie with a name, value, and options
Cookies.set('access_token', accessToken, { secure: true, httpOnly: true, sameSite: 'strict' });
const accessToken = Cookies.get('access_token');
Cookies.remove('access_token');

