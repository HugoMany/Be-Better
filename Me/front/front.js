axios.post('/api/user', {
    sex: 0,
    firstName: 'John',
    email: 'john@example.com',
    tel: '+33 6 34567890',
    passw: 'azertghe567',
    age: 19
  })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    