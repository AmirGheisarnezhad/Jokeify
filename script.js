const jokeButton = document.getElementById("jokeButton");
const displayJoke = document.getElementById("displayJoke");
const url = "https://icanhazdadjoke.com/";

async function fetchJoke() {
  try{
  // Disabling  button
  jokeButton.disabled = true;
  jokeButton.innerHTML = "LOADING...";
  // Fetching url
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      "User-Agent": "learning app",
    },
  });
  if(!response.ok){
      throw new Error(`HTTP ERROR: ${response.status} - ${response.statusText}` )
  }
  const data = await response.json();
  console.log(data);

  // Display the joke
  displayJoke.innerHTML = data.joke
}catch(error) {
  if(error.name === "TypeError"){
      console.error("NETWORK ERROR OCCURRED: " , error.message)
      displayJoke.innerHTML =  "NETWORK ERROR. Please try again later.";
  }else if(error.message.startsWith("HTTP ERROR")){
      console.error(`HTTP Error: ${error.message}` );
      displayJoke.innerHTML =  "SERVER ERROR. Please try again later.";
  }else{
      console.error("Unexpected error", error.message)
      displayJoke.innerHTML = "Something went wrong. Please try again later"
  }
 
}
jokeButton.disabled = false;
jokeButton.innerHTML = "Get a random joke";
}
jokeButton.addEventListener("click", fetchJoke);