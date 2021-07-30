const charactersAPI = new APIHandler('http://localhost:8000');

const charactersContainer = document.querySelector(".characters-container");

const createForm = document.getElementById("new-character-form")
const btnCreate = createForm.querySelector("button")

const editForm = document.getElementById("edit-character-form")
const btnEdit = editForm.querySelector("button")

window.addEventListener('load', () => {
  document.getElementById('fetch-all').addEventListener('click', function (event) {
    displayCharacters(event)
  });

  document.getElementById('fetch-one').addEventListener('click', function (event) {
    displayOneCharacter(event)
    
  });

  document.getElementById('delete-one').addEventListener('click', function (event) {
    deleteCharacter(event)
  });

  btnEdit.addEventListener('click', function (event) {
    event.preventDefault();
    console.log("button Edit is working")
  });


  // CREATE CHARACTER
  btnCreate.addEventListener('click', function (event) {
    createCharacter(event)
  });
});



const displayCharacters = (event) => {
  charactersAPI.getFullList()
  .then((apiResponse) => {
   apiResponse.data.forEach((character) => {
      charactersContainer.innerHTML += 
      `<div class="character-info">
        <div class="id">Id: <span>${character.id}</span></div>
        <div class="name">Name: <span>${character.name}</span></div>
        <div class="occupation">Occupation : <span>${character.occupation}</span></div>
        <div class="cartoon">Is a Cartoon ? <span>${character.cartoon}</span></div>
        <div class="weapon">Weapon: <span>${character.weapon}</span></div>
      </div>`
    })
  })
  .catch((error) => {
    console.log(error)
  })
}

const displayOneCharacter = (event) => {
  event.preventDefault()
  const characterId = document.querySelector(".operation input[name='character-id']").value

    charactersAPI.getOneRegister(characterId)
    .then((apiResponse) => {
      const character = apiResponse.data;

      charactersContainer.innerHTML += 
    `<div class="character-info">
      <div class="id">Id: <span>${character.id}</span></div>
      <div class="name">Name: <span>${character.name}</span></div>
      <div class="occupation">Occupation : <span>${character.occupation}</span></div>
      <div class="cartoon">Is a Cartoon ? <span>${character.cartoon}</span></div>
      <div class="weapon">Weapon: <span>${character.weapon}</span></div>
    </div>`
    })
    .catch((error) => {
      console.log(error)
    })
  
}


function handleSuccess(htmlElement) {
  htmlElement.classList.add("active");
  htmlElement.classList.remove("error");
}

function handleError(htmlElement) {
  htmlElement.classList.add("error");
  htmlElement.classList.remove("active");
}

const deleteCharacter = (event) => {
  const characterId = document.querySelector(".operation.delete input")
    charactersAPI.deleteOneRegister(inputIdDelete.value)
    .then((apiResponse) => {
      handleSuccess(event.target);
      displayCharacters();
    })
    .catch((error) => {
      console.log(error)
    })
}


function createCharacter(event) {
  event.preventDefault()
  
    const character = {
      id: createForm.querySelector("input[name='id']").value,
      name: createForm.querySelector("input[name='name']").value,
      occupation: createForm.querySelector("input[name='occupation']").value,
      weapon: createForm.querySelector("input[name='weapon']").value,
      cartoon: createForm.querySelector("input[name='cartoon']").checked,
    }

    charactersAPI
    .createOneRegister(character)
    .then((apiResponse) => {
      displayCharacters()
    })
    .catch((error) => {
      console.log(error)
    })
}