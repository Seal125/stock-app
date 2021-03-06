/*
This page takes the information provided by the user when they sign back in, gets their token and stores it into local storage
for future references.
*/

const form = document.getElementById('signin-form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const userInfo = {
    email: form.email.value,
    password: form.password.value
  };
  fetch('/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userInfo)
    })
    .then((response) => response.json())
    .then((data) => {
      const {
        token
      } = data;
      localStorage.setItem('token', token);
    });
});