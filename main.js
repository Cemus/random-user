import "./style.css";

async function getData() {
  const url = "https://randomuser.me/api/";
  try {
    const response = await fetch(url, { method: "GET" });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return json.results[0];
  } catch (error) {
    console.error(error.message);
  }
}

async function createUser() {
  const parentElement = document.getElementById("app");
  while (parentElement.firstChild) {
    parentElement.removeChild(parentElement.lastChild);
  }
  let personData = await getData();
  let nameData = `${personData.name.title} ${personData.name.first} ${personData.name.last}`;
  let addressData = `Address : ${personData.location.street.number} - ${personData.location.street.name} (${personData.location.city}, ${personData.location.country}) `;

  const cardElement = document.createElement("div");
  cardElement.classList.add("card");

  const imageElement = document.createElement("img");
  imageElement.src = personData.picture.large;
  imageElement.alt = nameData;

  const nameElement = document.createElement("h3");
  nameElement.textContent = nameData;

  const emailElement = document.createElement("p");
  emailElement.textContent = personData.email;

  const addressElement = document.createElement("p");
  addressElement.textContent = addressData;

  const phoneElement = document.createElement("p");
  phoneElement.textContent = `Phone : ${personData.phone}`;

  const buttonElement = document.createElement("button");
  buttonElement.textContent = "Random user";
  buttonElement.addEventListener("click", async () => {
    personData = await createUser();
  });

  cardElement.appendChild(imageElement);
  cardElement.appendChild(nameElement);
  cardElement.appendChild(emailElement);
  cardElement.appendChild(addressElement);
  cardElement.appendChild(phoneElement);
  cardElement.appendChild(buttonElement);

  parentElement.appendChild(cardElement);
}

await createUser();
