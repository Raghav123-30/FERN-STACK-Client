export async function Authenticate(email, password) {
    try {
      const response = await fetch('http://localhost:3000/api/checkAuthState', {
        method: 'GET',
      });
      const data = response
      console.log(data);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  