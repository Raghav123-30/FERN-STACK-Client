export default async function APIAddDryingCrop(data) {
  let result = false;
  console.log("Data got is", data);
  await fetch("http://localhost:3000/api/addDryingCrop", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      console.log("We got here ", response.data);
      if (response.data == true) {
        console.log("setting it true now");
        result = true;
      }
    });
  return result;
}
