//Create constants to call to site and deal with DOM
const ul = document.getElementById('recipes');
const url = 'http://www.recipepuppy.com/api/?i=onions,garlic&q=omelet&p=3'


//functions to add elements to html
  function createNode(element) {
      return document.createElement(element);
  }

  function append(parent, el) {
    return parent.appendChild(el);
  }

//grab data from the URL
fetch(url).then((resp) => resp.json()).then(function(data){
	let recipes = data.results;
	console.log(recipes);
	return recipes.map(function(recipes) {
      let li = createNode('li'),
          img = createNode('img'),
          span = createNode('span');
      img.src = recipes.thumbnail;
      span.innerHTML = `${recipes.title} ${recipes.ingredients}`;
      append(li, img);
      append(li, span);
      append(ul, li);
  })
})
	.catch(function(error){
		console.log(error);
	});
