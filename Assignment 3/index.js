
var bookChoose = document.querySelector('select');
var bookDisplay = document.querySelector('display');
        
    //define an onchange event handler function so that when the select's value is changed, its value is passed to an invoked function updateDisplay() as a parameter
        
bookChoose.onchange = function() {
    var book = bookChoose.value;
    updateDisplay(book);
};   
        
    //define the updateDisplay function
    //the select element returns "Verse _", which is a reference to one of the .txt files. We need to bridge this reference and create a relative path to the text file
        
function updateDisplay(book) {
    var url;
    if(book == "README"){
        url = book + '.md';
    }

    else{
        url = book + '.txt';
    }
            
            //The Fetch API is basically a modern replacement for XHR — it was introduced in browsers recently to make asynchronous HTTP requests easier to do in JavaScript, both for developers and other APIs that build on top of Fetch.
            
            //pass the URL of the resource we want to fetch
            
            //then is a Promise-- a JavaScript feature for performing asynchronous operations
            
            //function is automatically passed the response from the server as a parameter when the fetch() promise resolves
            
            //Text is a method that returns the response as raw text. It also returns another promise!
            
            //finally we grab the poemDisplay variable, which refers to the pre element
            
            //textContent property sets or returns the text content of the specified node, and all its descendants
            
    fetch(url).then(function(response) {
    response.text().then(function(text) {
    bookDisplay.textContent = text;
                //console.log(text);
        });
    }); 
};
    
    //give us a verse on load (because Verse 1 is pre-selected)
updateDisplay('README');