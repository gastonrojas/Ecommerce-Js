let Users = JSON.parse(localStorage.getItem('Users')) || []

const register = document.getElementById('register')


class newUser {
    constructor (name, last, user, pass, tel, mail, street, number, floor, apartment) {
        this.name = name;
        this.last = last;
        this.userId = user;
        this.pass = pass;
        this.tel = tel;
        this.mail = mail;
        this.street = street;
        this.number = number;
        this.floor = floor;
        this.apartment = apartment;
    }
    setUser() { Users.push( this ) }
}


let validate = () => {
    
    let availableUser = Users.find( user => user.userId == document.getElementById('user').value)
    
    let mailId = document.getElementById('mail').value
    let at = mailId.indexOf('@')
    let dot = mailId.indexOf('.')


    if (document.getElementById('name').value.length < 2){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ingrese un nombre valido!',
          })
          return false
    } else if (document.getElementById('last').value.length < 2) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ingrese un apellido valido!',
          })
          return false
    } else if (availableUser){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Nombre de usuario no disponible!',
          })
          return false
    } else if (document.getElementById('user').value.length < 3) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ingrese un usuario valido!',
          })
          return false
    } else if (document.getElementById('pass').value.length < 8){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Su contraseña debe tener al menos 8 caracteres!',
          })
          return false
    } else if (document.getElementById('tel').value == NaN || document.getElementById('tel').value.length < 10){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ingrese un numero de telefono valido!',
        })
        return false
    } else if( at < 1 || dot - at < 2){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ingrese un email valido!',
        })
        return false
    } else if(document.getElementById('street').value == ""){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ingrese una calle valida!',
        })
    } else if(document.getElementById('number').value == ""){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ingrese un numero valido!',
        })
        return false
    } else {
        return true
    }
}

let submit = (name, last, user, pass, tel, mail, street, number, floor, apartment) => {

    let register = new newUser(name, last, user, pass, tel, mail, street, number, floor, apartment)
    register.setUser()
    Swal.fire(
        'Usuario registrado!',
        'Proceda a loguearse!',
        'success'
      ). then ( function() {
        window.location.replace('../login.html')
      })
}


register.onclick = (event) => {
    event.preventDefault()
    const firstName = document.getElementById('name').value
    const lastName = document.getElementById('last').value
    const userId = document.getElementById('user').value
    const pass = document.getElementById('pass').value
    const tel = document.getElementById('tel').value
    const mail = document.getElementById('mail').value
    const street = document.getElementById('street').value
    const number = document.getElementById('number').value
    const floor = document.getElementById('floor').value
    const apartment = document.getElementById('apartment').value

    console.log(document.getElementById('number').value)

    if (validate()) {
        submit(firstName, lastName, userId, pass, tel, mail, street, number, floor, apartment)
        localStorage.setItem('Users', JSON.stringify(Users))
    }

    
}
