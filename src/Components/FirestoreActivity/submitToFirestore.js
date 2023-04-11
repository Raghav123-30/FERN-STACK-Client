class submitToFirestore{
    constructor(data){
        this.data = data;
    }

    submit() {
        fetch('http://localhost:3000/api/submit', {
          method: 'POST',
          body: JSON.stringify(this.data),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          console.log('Data submitted successfully!');
        })
        .catch(error => {
          console.error('There was a problem submitting the data:', error);
        });
      }
      


}

export default submitToFirestore;