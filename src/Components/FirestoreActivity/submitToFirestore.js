class submitToFirestore {
  constructor(data) {
    this.data = data;
  }

  submit() {
    if (this.data.location) {
      console.log(this.data);
      fetch("http://localhost:3000/api/addop", {
        method: "POST",
        body: JSON.stringify(this.data),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          console.log("Data submitted successfully!");
          return true;
        })
        .catch((error) => {
          console.error("There was a problem submitting the data:", error);
          return false;
        });
    } else if (this.data.productName) {
      console.log(this.data);
      fetch("http://localhost:3000/api/addproduct", {
        method: "POST",
        body: JSON.stringify(this.data),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          console.log("Data submitted successfully!");
          return true;
        })
        .catch((error) => {
          console.error("There was a problem submitting the data:", error);
          return false;
        });
    } else {
      console.log(this.data);
      fetch("http://localhost:3000/api/addloc", {
        method: "POST",
        body: JSON.stringify(this.data),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          console.log("Data submitted successfully!");
          return true;
        })
        .catch((error) => {
          console.error("There was a problem submitting the data:", error);
          return false;
        });
    }
  }
}

export default submitToFirestore;
