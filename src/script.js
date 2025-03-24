const form = document.getElementById('login-form')
const user = document.getElementById('user')
const password = document.getElementById('password')
const registerButton = document.getElementById('register')
const loginButton = document.getElementById('login')

registerButton.addEventListener('click', (e) => {
    e.preventDefault()
    console.log('user: ' + user.value)
    console.log('password: ' + password.value)
})