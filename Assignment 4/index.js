//Create constants to call to site and deal with DOM

//Thank you stackOverflow
const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
const ul = document.getElementById('recipes');
const ActualUrl = 'http://www.recipepuppy.com/api/?i=onions,garlic&q=omelet&p=3'
const newUrl = proxyUrl + ActualUrl;


//functions to add elements to html
  function createNode(element) {
      return document.createElement(element);
  }

  function append(parent, el) {
    return parent.appendChild(el);
  }

//grab data from the URL
fetch(newUrl)
.then((resp) => resp.json())
.then(function(data){
	let recipes = data.results;
	console.log(recipes);
	return recipes.map(function(recipes) {
      let li = createNode('li'),
          img = createNode('img'),
          span = createNode('span');
      img.src = recipes.thumbnail;
      span.innerHTML = `<h3>${recipes.title}</h3> <p>${recipes.ingredients}</p>`;
      append(li, span);
      append(li, img);
      append(ul, li);
  })
})
	.catch(function(error){
		console.log(error);
	});
