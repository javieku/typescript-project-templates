import axios from 'axios';

const form = document.querySelector('form')!; 
const addressInput = document.getElementById('address')! as HTMLInputElement;
const GOOGLE_API_KEY = "???";

function searchAddressHandler(event: Event) {
    event.preventDefault();
    const enteredAddress = addressInput.value;
    
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(enteredAddress)}&key=${GOOGLE_API_KEY}`).then(response => {
     const status = response.data.status;
     if (status !== 'OK') {
         throw new Error('Something went wrong');
     }
     const coordinates = response.data.results[0].geometry.location; 
     const map = new google.maps.Map(document.getElementById('map')!, {
         center: coordinates,
         zoom: 16
     });
     new google.maps.Marker({
         position: coordinates,
         map: map
     });
    }).catch(error => {
        alert(error.message);
    });    
}

form.addEventListener('submit', searchAddressHandler);