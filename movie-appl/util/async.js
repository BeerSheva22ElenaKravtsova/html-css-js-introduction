export async function getData(URL){
  const response = await fetch(URL);
  return response.json();
  }


