const form = document.getElementById('login-form');
const user = document.getElementById('user');
const password = document.getElementById('password');
const registerButton = document.getElementById('register');
const loginButton = document.getElementById('login');

function validateInputs() {
    if(user.value.trim() === '' || password.value.trim() === '')  {
        alert('Nenhum campo deve ficar em branco')
        return false
    } else return true
};

registerButton.addEventListener('click', async (e) => {
    e.preventDefault();
    if(!validateInputs()) return

    console.log('user: ' + user.value);
    console.log('password: ' + password.value);

    const response = await fetch('/save-info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            user: user.value,
            password: password.value
        })
    });

    user.value = '';
    password.value = '';

});

