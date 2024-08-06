class CookieService {
  static setCookie(name, value) {
    document.cookie = `${name}=${value}; path=/`;
  }

  static getCookie(name) {
    const cookies = document.cookie.split('; ');
    return cookies.find((cookie) => cookie.startsWith(`${name}=`))?.split('=')[1];
  }

  static deleteCookie(name) {
    document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
  }
}

export default CookieService;
