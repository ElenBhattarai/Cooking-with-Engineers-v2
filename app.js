//Grabbing the search button from the DOM
let fetchButton = document.querySelector("#fetch")
//Grabbing the buttons in the ingredients menu
let selectedItems = document.querySelectorAll('#clicked')
let intolerance = document.querySelectorAll('#intolerance')
//Setting up an array to set the response we get from the server to an array
let data = []
//Setting up an array to put in all the ingredients that the user has selected
let ingredients = []

let modal = document.querySelector('.modall')
let modalContent = document.querySelector('.modall-content')

//insertion Sort
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
    let key = '&number=12&apiKey=112c9e46de254a86a707eb74c737b3a1'
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

const intoler = (s) => {
    if(s.classList.contains('selected')){
        s.classList.remove('selected')
    } else{
        s.classList.add('selected')
    }
}

//For all the ingredients button
for(let s of selectedItems){
    //add an event listener that calls the function selected(s) defined above.
    s.addEventListener("click", ()=> selected(s))     
}

for(let i of intolerance){
    i.addEventListener("click", ()=> intoler(i))
}

//Button to listen to the fetch button and call the fectchAPI() function above.
fetchButton.addEventListener("click", ()=>fetchAPI())


//Function to create the Results that we get i.e the recipes as cards
const createResultCards = () => {
    removeResultCards()
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
        
        let p3 = document.createElement("span")
        let b1 = document.createElement("b")
        b1.innerText = "Used Ingredient: "
        p3.appendChild(b1)
        let p1 = document.createElement("span")
        //set the inner text as used ingredients 
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
        let p4 = document.createElement("span")
        let b2 = document.createElement("b")
        b2.innerText = "Missed Ingredient: "
        p4.appendChild(b2)
        let p2 = document.createElement("span")
        //set the inner text as missed ingredients
        k = 0
        //go through the missed ingredients given from the server and add it to the missed ingredients.
        for(let j = 0; j < data[i].missedIngredientCount; j++) {
            if(j < 5) {
                if(k == 0) {
                    p2.innerText = p2.innerText + data[i].missedIngredients[j].name 
                } else {
                    p2.innerText = p2.innerText + ", "+ data[i].missedIngredients[j].name 
                }
                k++
            }
        }
        let br = document.createElement("br")
        //add the description to the DOM
        desc.appendChild(p3)
        desc.appendChild(p1)
        //add the paragraph to the DOM
        desc.appendChild(br)
        desc.appendChild(p4)
        desc.appendChild(p2)
        //add the description to cards
        cards.appendChild(desc)
        //create a button to view the recipe of the dishes that we get as cards.
        let recipe = document.createElement("button")
        recipe.addEventListener("click", ()=>viewRecipe(data[i].id, data[i].title, data[i].image, data[i].usedIngredients, data[i].missedIngredients))
        
        recipe.classList.add('view')
        recipe.innerText = "View Recipe"
        desc.appendChild(recipe)
    }
}

//remove the cards that were already there from the previous result
const removeResultCards = () => {
    //grab resultCards from the DOM
    let resultCards = Array.from(document.getElementsByClassName('cards')) 
    //run a for loop for all the resultCards 
    for(let i = 0 ; i < resultCards.length; i++) {
        //select the ith result Card
        let a = resultCards[i]
        //remove it
        a.remove()
    }
}   

//view the Recipes of the query dishes
const viewRecipe = (name,title,image, usedIngredients, missedIngredients) => {
    //view the modal
    modal.style.display = "block"
    //make a button to close the modal
    let buttonToCloseModal = document.querySelector('.toClose')
    let ab = modalContent.children[0]
    //add an event listener to close the button Modal
    buttonToCloseModal.addEventListener("click", ()=> {
        modal.style.display = "none"
        modalContent.innerHTML = '<button class = "toClose">Close</button>'
    })
    //fetch the Recipe
    fetchRecipe(name,title,image,usedIngredients, missedIngredients)
}

//this function fetches the recipes for us
const fetchRecipe = async (rname,title, image, usedIngredients, missedIngredients) => {
    let rnameInt = Number(rname)
    //fetch the recipes from the API
    let rdata = await fetch(`https://api.spoonacular.com/recipes/${rnameInt}/analyzedInstructions?apiKey=112c9e46de254a86a707eb74c737b3a1`)
    //convert the data that we got into json
    let rjson = await rdata.json()
    // console.log(rjson)
    //add the data to the modal
    addDatatoModal(rjson,title,image,usedIngredients, missedIngredients)
}

//function to download specific recipes locally
//throws an exception if the download cannot happen
const downloadF = (filename, text) => {
    let downloaded = false;
    //create an href and name it element
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    //don't display the element on the DOM
    element.style.display = 'none';
    //append the element to the DOM body
    document.body.appendChild(element);
    
    //click the element href that we created
    element.click();
  
    document.body.removeChild(element);
    downloaded = true;
    //if the download isn't sucessful
    if(downloaded = false){
        //throw an exception saying the file couldn't be downloaded
        throw new Error("The file couldn't be downloaded")
    }
}

//After an empty modal is created,this function adds the steps to make the recipe into the modal
const addDatatoModal = (rjson,title,image,usedIngredients, missedIngredients) => {
    //create an h2 to make the title
    let rname = document.createElement("h2")
    //set the title to be the innerText
    rname.innerText = title
    //add the title to the modal
    modalContent.appendChild(rname)
    //create an image tag
    let rimg = document.createElement("img")
    //set the image src that we got from the previous API result
    rimg.src = image
    //set the width of the image
    rimg.style.width = "200px"
    //set the height of the image
    rimg.style.height = "200px"
    //add the image to the modal
    modalContent.appendChild(rimg)

    let allIngredients = []

    //loop through all the usedIngredients
    for(let i = 0; i < usedIngredients.length; i++) {
        //add it into the all ingredients list
        allIngredients.push(usedIngredients[i].name)
    }

    //loop through all the missed Ingredients list
    for(let i = 0; i < missedIngredients.length; i++) {
        //add it to the missedIngredients list
        allIngredients.push(missedIngredients[i].name)
    }

    //crete a div
    let ingredients = document.createElement("div")
    //give it a classname called ingredients to apply CSS
    ingredients.classList.add("ingredients")
    //set a innerHTML to the ingredients
    ingredients.innerHTML = 'Ingredients: '

    //loop through all the elements on the allIngredients array
    for(let i = 0; i < allIngredients.length; i++) {
        //add all of them to the ingredients div innerText
        ingredients.innerText += allIngredients[i] + ", "
    }
    //append all the ingredients to the modal
    modalContent.appendChild(ingredients)

    //create a div to add in the steps to make the recipe
    let steps = document.createElement("div")
    //add a class of steps to apply CSS to it
    steps.classList.add("steps")
    //add the steps to the modal
    modalContent.appendChild(steps)

    //loop through all the steps that are given by the API
    for(let i = 0; i < rjson[0].steps.length; i++) {
        //make a div
        let div = document.createElement("div")
        //add the class of steps Text to apply CSS
        div.classList.add("stepsText")
        //in the div, add the steps given from the API
        div.innerText = i+1 + ") " + rjson[0].steps[i].step + "\n"
        //append the divs to the steps div that we created
        steps.appendChild(div)
    }

    //create a download button
    let download = document.createElement("button")
    //add a class of download to it to apply CSS
    download.classList.add('download')
    //set the inner text of the button
    download.innerText = "Download Recipe"
    //when the button is clicked, the function downloadF will be called
    download.addEventListener("click", ()=> downloadF(`${rname.innerText} recipe.txt`, rname.innerText + "\n\n" + ingredients.innerText + "\n\n"+ steps.innerText))
    //add the download button to the modal
    modalContent.appendChild(download)
}


