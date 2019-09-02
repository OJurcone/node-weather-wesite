const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    if(location){
        fetch('http://localhost:3000/weather?address=' + location).then((response) =>{
            response.json().then((data) =>{
                if (data.error) {
                    messageOne.textContent = error.data
                }else if (!data[0].temperature){
                    messageOne.textContent = 'Please provide a more detailed location'
                    messageTwo.textContent = undefined
                }else{
                    messageOne.textContent = data[0].temperature
                    messageTwo.textContent = data[0].location
                }
            })
        })
    }else{
        messageOne.textContent = 'Please provide a valid location'
    }
})