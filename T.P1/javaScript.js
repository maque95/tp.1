let listCharacter = JSON.parse(localStorage.getItem("Characters")) || [] 

const search_Character = async (id) =>{
    const characterData = await fetch (`https://rickandmortyapi.com/api/character/${id}/`)
    const Character_Search = await characterData.json()
    listCharacter.push(Character_Search)
    localStorage.setItem("character",JSON.stringify(listCharacter))
    return Character_Search
}

const ArmCard = (character) =>{
    return     `<div class="card" style="width: 18rem; text-align: center;">
                <img src="${character.image}" class="card-img-top"  alt="imagen">
                    <div class="card-body">
                        <h5 class="card-title">${character.name}</h5>
                        <p class="card-text">${character.status}.</p>
                        <p clas="card-text">${character.species}</p>
                        <button onclick="DeleteCharacter(${character.id})" type="button" class="btn btn-danger">Delete</button>
                    </div>
                </div>`
}

const AddDataCard = async () =>{
    const input = document.querySelector("input#input-character")
    const CardContent = document.querySelector(".card")
    IdMax = 826
    const MaximumCharacters = parseInt(input.value)
    const ExistingCharacter = listCharacter.some(character => character.id === MaximumCharacters)

    if (MaximumCharacters <= IdMax && !ExistingCharacter){
        const FoundCharacter = await search_Character(input.value)
        const ReadyCard = ArmCard(FoundCharacter)
        CardContent.innerHTML = ReadyCard
    } else if (MaximumCharacters > IdMax){
        alert ("Select a manor number or equal to 826")
    } else {
        alert("That character has already been added.")
    }
}

const LoadPage = () =>{
    const CardContent = document.querySelector(".card")
    CardContent.innerHTML = ""
    const storedCharacters = JSON.parse(localStorage.getItem("character"))
    
    if (storedCharacters && Array.isArray(storedCharacters)) {
        listCharacter = storedCharacters
    }
    listCharacter.forEach(character =>{
        const ArmedCard = ArmCard(character)
        CardContent.innerHTML += ArmedCard
    })
} 

LoadPage()

document.addEventListener("DOMContentLoaded", function(){
    const btnSearch = document.getElementById("btn-Search")
    btnSearch.addEventListener("click", AddDataCard)
    const DeleteAllCharactersButton = document.getElementById("btn-delete-all")

})
function DeleteAllCharactersButton(){
    localStorage.removeItem("character")
    listCharacter = []
    LoadPage()
}

function DeleteCharacter(id) {
    listCharacter = listCharacter.filter(character => character.id !== id)
    localStorage.setItem("character", JSON.stringify(listCharacter))
    LoadPage()
}




