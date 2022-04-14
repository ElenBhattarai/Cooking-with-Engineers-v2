//Grabbing the search button from the DOM
let fetchButton = document.querySelector("#fetch")
//Grabbing the buttons in the ingredients menu
let selectedItems = document.querySelectorAll('#clicked')

//Setting up an array to set the response we get from the server to an array
let data = []
//Setting up an array to put in all the ingredients that the user has selected
let ingredients = []

function insertionSort(arr)
{
    let i, key, j;
    for (i = 1; i < arr.length; i++)
    {
        key = arr[i];
        j = i - 1;
        while (j >= 0 && arr[j].missedIngredientCount > key.missedIngredientCount)
        {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}

const fetchAPI = async() => {
    //first part of the URL
    let url = 'https://api.spoonacular.com/recipes/findByIngredients?ingredients=' 
    //second part of the URL
    let key = '&number=10&apiKey=010f07cc7be4416ea7006d8355335fcd'
    //set an empty strings called items to put in the ingredients they selected to put in the URL
    let items = ""
    //run a for loop across all the ingredients that the user selected
    for(let i = 0; i < ingredients.length; i++) {
        //if the ingredients length is greater than one and i not 0
        if(ingredients.length>1 &&i == 0){
            //add whats in the item to what's the array index at i
            items = items+ingredients[i].toLowerCase()+","
        } else {
            //add whats in the item to what's the array index at i
            items = items+"+"+ingredients[i].toLowerCase()+","
        } 
    }
    //since we dont need the "," at the end, we remove the last element of the string
    items = items.slice(0, items.length-1)
    //set up the final URL by adding url, items and the api key
    let finalURL = url + items + key
    //fetch the server with finalURL
    let res = await fetch(finalURL)
    //turn the response to json
    data = await res.json()
    insertionSort(data)
    createResultCards()
}

//helper function to remove something from an array
function arrayRemove(arr, value) { 
    return arr.filter(function(ele){ 
        return ele != value; 
    });
}

//helper function to insert and remove whats selected and deselected
const selected = (s) => {
    //if the array already includes something that's clicked again
    if(ingredients.includes(s.innerText)){
        //remove it from the array
        ingredients = arrayRemove(ingredients, s.innerText)
        //change back the color to not selected
        s.classList.remove('selected')
    } else {
        //add it to the array
        s.classList.add('selected')
        //change the color to selected
        ingredients.push(s.innerText)
    }
}

//For all the ingredients button
for(let s of selectedItems){
    //add an event listener that calls the function selected(s) defined above.
    s.addEventListener("click", ()=> selected(s))     
}

//Button to listen to the fetch button and call the fectchAPI() function above.
fetchButton.addEventListener("click", ()=>fetchAPI())


//Function to create the Results that we get i.e the recipes as cards
const createResultCards = () => {
    //traverse through the data array that we have which is all the receipes that we get
    for(let i = 0; i < data.length; i++) {
        //create a div called cards
        let cards = document.createElement("div")
        //add a class of cards to it.
        cards.classList.add('cards')
        //append the cards to the DOM body
        document.body.appendChild(cards)
        
        //create an image div
        let image = document.createElement("div")
        //add a class of image to it
        image.classList.add('image')
        //append the image div to cards div
        cards.appendChild(image)

        //create an image
        let img = document.createElement("img")
        //the source of the image will be the image that we have in the array
        img.src = data[i].image
        //append the image to the DOM
        image.appendChild(img)

        //create a new div for titles
        let title = document.createElement("div")
        //add a class of title to it.
        title.classList.add('title')
        //create a header div
        let header = document.createElement("h3")
        //set the inner text of the header to the title of the result that we get back from the server
        header.innerText = data[i].title
        //append it to the DOM
        title.appendChild(header)
        //append it to the DOM
        cards.appendChild(title)

        //create a div for the description
        let desc = document.createElement("div")
        //add a class of description to it
        desc.classList.add('description')
        //make a paragraph
        let p1 = document.createElement("p")
        //set the inner text as used ingredients 
        p1.innerText = "Used Ingredient: "
        let k = 0
        //go through the used ingredients given from the server and add it to the used Ingredients.
        for(let j = 0; j < data[i].usedIngredientCount; j++) {
            if(k == 0) {
                p1.innerText = p1.innerText + data[i].usedIngredients[j].name 
            } else {
                p1.innerText = p1.innerText + ", "+ data[i].usedIngredients[j].name 
            }
            k++
        }
        //create a paragraph tag again for missed ingredients
        let p2 = document.createElement("p")
        //set the inner text as missed ingredients
        p2.innerText = "Missed Ingredient: "
        k = 0
        //go through the missed ingredients given from the server and add it to the missed ingredients.
        for(let j = 0; j < data[i].missedIngredientCount; j++) {
            if(k == 0) {
                p2.innerText = p2.innerText + data[i].missedIngredients[j].name 
            } else {
                p2.innerText = p2.innerText + ", "+ data[i].missedIngredients[j].name 
            }
            k++
        }
        //add the description to the DOM
        desc.appendChild(p1)
        //add the paragraph to the DOM
        desc.appendChild(p2)
        //add the description to cards
        cards.appendChild(desc)
        //create a button to view the recipe of the dishes that we get as cards.
        let recipe = document.createElement("button")
        recipe.innerText = "View Recipe>>"
        desc.appendChild(recipe)
    }


}