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

    const response = await fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            user: user.value,
            password: password.value
        })

    });

    if (!response.ok) {
        const errorData = await response.json()
        alert(errorData.error)
        return
    }
    
    user.value = '';
    password.value = '';
    alert('Registro feito')

});

loginButton.addEventListener('click', async (e) => {
    e.preventDefault();
    if(!validateInputs()) return

    const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            user: user.value,
            password: password.value
        })
    });

    if (!response.ok) {
        const errorData = await response.json()
        alert(errorData.error)
        return
    }
    
    user.value = '';
    password.value = '';
    alert('Login bem sucedido')
    window.location.href = '/new';

});