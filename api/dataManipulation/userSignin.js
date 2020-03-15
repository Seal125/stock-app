const form = document.getElementById('signin-form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const userInfo = {
    email: form.email.value,
    password: form.password.value,
  };
  console.log(JSON.stringify(userInfo));
  fetch('/user/signin', {
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