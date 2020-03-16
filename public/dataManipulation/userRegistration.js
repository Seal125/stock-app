/*
This page takes the information provided by the user when they register for the first time, and gets the token that gets generated for them.
That token is stored in local storage, where it can be referenced to later when traversing through the portfolio page and transactions page.
*/

const form = document.querySelector('register-form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const userRegisterInfo = {
    name: form.name.value,
    email: form.email.value,
    password: form.password.value
  };

  fetch('/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userRegisterInfo),
    })
    .then((response) => response.json())
    .then((data) => {
      const {
        token
      } = data;

      localStorage.setItem('token', token);
    });
});