const form = document.querySelector('register-form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const userRegisterInfo = {
    name: form.name.value,
    email: form.email.value,
    password: form.password.value,
  };
  console.log(JSON.stringify(userRegisterInfo));
  fetch('/user/register', {
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