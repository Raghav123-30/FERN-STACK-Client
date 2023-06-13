export async function Authenticate(email, password) {
  let failure = false;
  await fetch("http://localhost:3000/api/login", {
    method: "POST",
    body: JSON.stringify({
      email: email,
      password: password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        failure = true;
      } else {
        return response.json();
      }
    })
    .then((data) => {
      console.log(data);
      localStorage.setItem("token", data.token);
    })
    .catch((error) => {
      console.log("Something went wrong");
    });

  if (failure) {
    return false;
  }
  return true;
}
