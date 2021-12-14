let Users = JSON.parse(localStorage.getItem('Users'))
let Logued = JSON.parse(localStorage.getItem('Logued')) || []
console.log(Users)

// const userLogin = document.getElementById('userLog')
// const userPassword = document.getElementById('password')
console.log(Logued)
const logButton = document.getElementById('logButton')

function log(user) { Logued.push( user ) } 

const validation = () => {
    const findUser = Users.find( user => user.userId == document.getElementById('userLog').value) || {userId: 'Gaston', pass: 'micontrasenia'}
    console.log(findUser)
    const userId = findUser.userId
    const password = findUser.pass 
    if (Logued.length != 0){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Usted ya se encuentra logueado!',
        })
        return false
    } else if (userId === document.getElementById('userLog').value && password === document.getElementById('password').value){
       return true
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El usuario y la contraseña no coinciden!',
        })
        return false
    }
}

logButton.onclick = (event) => {
    event.preventDefault()
   
    if (validation()) {
        log(document.getElementById('userLog').value)
        localStorage.setItem('Logued', JSON.stringify(Logued))
        Swal.fire(
            'Usuario logueado exitosamente!',
            'Ahora puede encargar productos de la tienda!',
            'success'
          ). then ( function() {
            window.location.replace('../products.html')
          }) 
    }
}

