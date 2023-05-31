const base_url = 'https://webaccounting.herokuapp.com';
signin.onclick = e => {

    // atob -декодирование
    const token = `Basic ${btoa(`${login.value}:${password.value}`)}`
    
    fetch(`${base_url}/account/login`, {
        method: "Post",
        headers: {
            Authorization: token
        }
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(e => console.log(e));
}

 
