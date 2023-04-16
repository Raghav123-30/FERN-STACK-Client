export async function Authenticate(email, password) {
  await fetch("http://localhost:3000/api/login", {
    method: "POST",
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      localStorage.setItem("token", data.token);
    })
    .catch((error) => {
      console.log("Something went wrong");
    });
}
