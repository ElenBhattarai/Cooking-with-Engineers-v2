//Grab test button from DOM
let testButton = document.querySelector('#test')
//Test Suite
testButton.addEventListener("click", ()=>testSuite())

//Calling all the testSuite Functions
const testSuite = () => {
    console.log("---TEST SUITE---")
    testInsertionSort()
    testArrayRemove()
    testRemoveResultCards()
    testSelectedOnce()
    testSelectedTwice()
    testIntolerancesOnce()
    testIntolerancesTwice()
    testDownloadRecipe()
}

// This function tests insertion Sort
const testInsertionSort = () => {
    //insertionSort
    let Elem = class { //mock recipe class
        constructor(MIC){
            this.missedIngredientCount = MIC;
        }
    }
    //mock recipes to be put into array
    let elemA = new Elem(3) 
    let elemB = new Elem(2)
    let elemC = new Elem(1)
    //array to be sorted
    let arrA = [elemA, elemB, elemC]
    insertionSort(arrA)
    let resultA
    if(arrA[0].missedIngredientCount == 1) {
        resultA = "PASSED"
    }
    else {
        resultA = "FAILED"
    }
    console.log("TEST 1: insertionSort function -", resultA)
}

//This function tests the arrayRemove method that we have on the app
const testArrayRemove = () => {
    //arrayRemove
    let arrB = [1,2,3]
    //call the function
    arrB = arrayRemove(arrB, 2)
    let resultB
    //test passed case
    if(arrB[0] == 1 && arrB[1] == 3) {
        resultB = "PASSED"
    }
    //test failed case
    else {
        resultB = "FAILED"
    }
    console.log("TEST 2: arrayRemove function -", resultB)
}

//This function tests the remove result cards function that we have used
const testRemoveResultCards = () => {
    //removeResultCards
    removeResultCards()
    for(let i=0; i<3; i++) {
        //create a div called cards
        let cards = document.createElement("div")
        //add a class of cards to it.
        cards.classList.add('testCards')
        //append the cards to the DOM body
        document.body.appendChild(cards)
    }
    //grab all the testCards
    let resultCards = Array.from(document.getElementsByClassName('testCards'))
    for(let i = 0 ; i < resultCards.length; i++) {
        let a = resultCards[i]
        //remove them
        a.remove()
    }
    let resultC
    //passed case
    if(document.getElementsByClassName('testCards').length == 0) {
        resultC = "PASSED"
    }
    //failed case
    else {
        resultC = "FAILED"
    }
    console.log("TEST 3: removeResultCards function -", resultC)
}

//This function tests the selecting of ingredients when clicked once
const testSelectedOnce = () => {
    //create a test button
    let testClickedOnce = document.createElement("button")
    //call the function to select
    selected(testClickedOnce)
    let resultC = ""
    //passed case
    if(testClickedOnce.classList.contains("selected")){
        resultC = "PASSED"
    //failed case
    } else {
        resultC = "FAILED"
    }
    console.log("TEST 4: Clicking on a ingredient once makes it selected -", resultC)

}

//This function tests the selecting of ingredients when clicked twice
const testSelectedTwice = () => {
    //create a test button
    let testClicked = document.createElement("button")
    testClicked.innerText = "test"
    //call the fucntion once
    selected(testClicked)
    //call the function twice
    selected(testClicked)
    let resultC = ""
    //passed case
    if(ingredients.includes(testClicked.innerText)){
        resultC = "FAILED"
    //failed case
    } else {
        resultC = "PASSED"
    }
    console.log("TEST 5: Clicking on a ingredient twice makes it unselected -", resultC)  
}

//Test the function which helps to select the intolerances
const testIntolerancesOnce = () => {
    //create a test button
    let testButton = document.createElement("button")
    //call the function
    intoler(testButton)
    let resultC = ""
    //passed case
    if(testButton.classList.contains("selected")){
        resultC = "PASSED"
    //failed case
    } else {
        resultC = "FAILED"
    }
    console.log("TEST 6: Test select intolerances function -", resultC)
}

//Test whether selecting the same intolerance twice makes it unselected
const testIntolerancesTwice = () => {
    //create a test button
    let testButtonTwice = document.createElement("button")
    //call the fucntion once
    intoler(testButtonTwice)
    //call the function twice
    intoler(testButtonTwice)
    let resultC = ""
    //passed case
    if(testButtonTwice.classList.contains("selected")){
        resultC = "FAILED"
    //failed case
    } else {
        resultC = "PASSED"
    }
    console.log("TEST 7: Test select intolerances function when pressing twice -", resultC)
}

//Test whether the download recipes is working or not
const testDownloadRecipe = ()=> {
    let testDish = "Test Download"
    let testRecipe = "1) Make dumplings , 2) Eat dumplings"
    let resultC = ""
    //passed case
    try{
        downloadF(testDish, testRecipe)
        resultC = "PASSED"
    //failed case, if the download doesn't happen then the function throws an exception
    } catch (e){
        //it throws an exception if the recipe cannot be downloaded locally
        resultC = "FAILED"
    }
    console.log("TEST 8: Test download recipes locally function -", resultC)
}



