export function getCookieToken() {
  const cookieStr = document.cookie.split(';');
  const tokenCookie = cookieStr.find((c) => c.trim().startsWith('token='));

  if (tokenCookie) {
    const token = tokenCookie.split('=')[1];
    return token;
  }
  return null;
}
