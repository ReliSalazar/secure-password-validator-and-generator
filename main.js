// generate a random number in a range
const randomMinMax = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// change text color for a html element
const changeColor = (element, color) => {
  element.style.color = `var(--${color})`
}

// validate if a password is secure
const validate = password => {
  // at least 1 upper, 1 lower, 1 number, 1 simbol and a min length of 12
  const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-.\s]).{12,}$/
  return regex.test(password)
}

// generate a secure password
const generate = () => {
  let secure = false
  let password
  while (!secure) { // if the random generated password is not secure, generate a new one
    password = []
    const passLength = randomMinMax(12, 18) // a password from 12 to 18 length
    for (let i = 0; i <= passLength; i++) {
      password.push(String.fromCharCode(randomMinMax(32, 125))) // a ASCII caracter, between blank space (32) and } (125)
    }
    password = password.join('')

    if (validate(password)) { // if the password it's secure, finish the loop and return it
      secure = true
    }
  }

  return password
}

// click event for validate button
document.getElementById('validate').addEventListener('click', () => {
  const password = document.getElementById('password').value

  // change the color and update the secure text if its secure or not
  if (validate(password)) {
    document.getElementById('secure').innerHTML = 'secure'
    changeColor(document.getElementById('secure'), 'blue')
    document.getElementById('message').innerHTML = ''
  } else {
    document.getElementById('secure').innerHTML = 'not secure'
    changeColor(document.getElementById('secure'), 'red')
    document.getElementById('message').innerHTML = ''
  }
})

// click event for generate button
document.getElementById('generate').addEventListener('click', () => {
  document.getElementById('password').value = generate()

  // update color and text when a secure password was generated
  document.getElementById('secure').innerHTML = 'secure'
  changeColor(document.getElementById('secure'), 'blue')
  document.getElementById('message').innerHTML = ''
})

// copy the password to clipboard
document.getElementById('copy').addEventListener('click', () => {
  if (document.getElementById('password').value !== '') {
    document.getElementById('password').setAttribute('type', 'text')
    const password = document.getElementById('password')
    password.select()
    document.execCommand('copy')
    document.getElementById('password').setAttribute('type', 'password')
    document.getElementById('message').innerHTML = 'password copied to clipboard!'
  } else {
    document.getElementById('message').innerHTML = 'you need to enter or generate a password before copying it'
  }
})
