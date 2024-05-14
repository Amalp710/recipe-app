const searchBox=document.querySelector('.searchBox');
const searchBtn=document.querySelector(".searchBtn");
const recipeContainer=document.querySelector(".recipe-container");
const recipeInfo=document.querySelector('.recipe-details-info');
const closeButton=document.querySelector('.recipe-button');
const notFound=document.querySelector('.not-found');


notFound.style.display="none"; 

const fetchRecipes= async (inputR)=>{
    notFound.style.display="none";
    recipeContainer.innerHTML="<h2>Fetching......<h2>";
    try{
        const data= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputR}`);
        const response=await data.json();

        recipeContainer.innerHTML="";
        response.meals.forEach(m => {

        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML =`
        <img src="${m.strMealThumb}">
        <h3>${m.strMeal}</h3>
        <p>${m.strArea}</p>
        <p>${m.strCategory}</p> 
        `
        const button=document.createElement('button');
        button.textContent="view recipe";
        recipeDiv.appendChild(button)
        button.addEventListener('click',()=>{
            popUp(m);

        });
        recipeContainer.appendChild(recipeDiv);
        
        });
    }
    catch (error){
        
       notFound.style.display="flex"; 

    }
}


const fetchIngredients = (m) => {
    let ingredientsList = "";
    for(let i = 1; i <= 20; i++){
        const ingredient = m[`strIngredient${i}`];
        if(ingredient) {
            const measure = m[`strMeasure${i}`];
            ingredientsList += `<li>${measure} $(ingredient}</li>`
        }
        else{
            break;
        }
    }
    return ingredientsList;
}

const popUp=(m)=>{
    recipeInfo.innerHTML=`
      <h2 class="rName">${m.strMeal}</h2>
      <h3>Ingridients:</h3>
      <ul class="iList">${fetchIngredients(m)}</ul>

      <div class="rInstruction">
        <h3>Instructions:</h3>
        <p>${m.strInstructions}</p>
      </div>

    `
    
    recipeInfo.parentElement.style.display="block";


}




closeButton.addEventListener("click",()=>{
    recipeInfo.parentElement.style.display="none";

}); 

searchBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    const searchInput= searchBox.value.trim();
    fetchRecipes(searchInput);
    

});





