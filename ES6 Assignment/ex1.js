
  const ingredientJson = [];

  var idNum=0;

    class Ingredient {
        constructor(id,name, image, calories) {
            idNum++;
            this.id = idNum;
            this.name = name;
            this.image = image;
            this.calories = calories;
            
        }

        Render=() => {

            let str="";
            str+="<div id=contentCard>";
            str+="add";
            str+="<input id='"+this.id+"' type=checkbox  />";
                str+="<div class= card>";
                    str+="<p>Ingredient details</p>";
                    str+="<img src='"+this.image+"'>";
                    str+="<p>'"+this.name+"'</p>";
                    str+="<p>Calories: '"+this.calories+"'</p>";
                str+="</div>";
            str+="</div>"
            
            if(str==""){}
            else{document.getElementById("formGrid").innerHTML += str;}
            
        }

        renderPopup=()=>{
            let str="";
            str+="<div class= card>";
                    str+="<img src='"+this.image+"'>";
                    str+="<p>'"+this.name+"'</p>";
                    str+="<p>Calories: '"+this.calories+"'</p>";
                str+="</div>";
                if(str==""){}
                else{document.getElementById("popupElements").innerHTML += str;}
        }

    }

    var input_arr = document.getElementsByTagName("input");
    var Recipes=[];
    var numbers = [];
    var ingredientChosen = [];

    class DishRecipe{
        constructor(name,ingredientChosen,Method, time, image) {
            this.name = name;
            this.ingredientChosen = ingredientChosen;
            this.Method = Method; 
            this.time = time;
            this.image = image;                   
        }

        Render=() => {
            let Tcalories;
            let str="";
            str+="<div class= card>";
                str+="<p>Dish Recipe details:</p>";
                str+="<img src='"+this.image+"'>";
                str+="<p>dish name: '"+this.name+"'</p>";
                str+="<p>Cooking method: '"+this.Method+"'</p>";
                str+="<p>Total cooking time: '"+this.time+"' minutes</p>";           
                Tcalories = this.getTotalCalories();
                str+="<p>total calories: '"+Tcalories+"'</p>";

                str+="<input type=button id='"+this.name+"' value=Show_ingredients onclick='Show_ingredients(this.id)'/>";

            str+="</div>";
            if(str==""){

            }
            else{document.getElementById("main").innerHTML += str;}
            
        }

        getTotalCalories=() => {
            let tmp= 0;
            for(var k in this.ingredientChosen){
                tmp += parseInt(this.ingredientChosen[k].calories);
            }           
            return tmp;
        }

        getIngredients=() => {

        }
    }
                                                         //----popup function----
function Show_ingredients(RecipeName){
    var modal = document.getElementById("popupModal");
    var btn = document.getElementById(`${RecipeName}`);
    var span = document.getElementsByClassName("close")[0];

    btn.onclick = function() {
    modal.style.display = "block";
    }

    span.onclick = function() {
    modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }


    for (var i in Recipes) {
        if(Recipes[i].name === RecipeName){
            for (var j in Recipes[i].ingredientChosen) {
                Recipes[i].ingredientChosen[j].renderPopup();
            }
        }
    }
}


function Create_Recipe(){ 
    
    for (var i in input_arr) {
        if (input_arr[i].type === "checkbox" && input_arr[i].checked === true) {
            numbers.push(input_arr[i].id);
        }
    }
    
    for (var z in numbers) { 
        for (var j in ingredientJson) { 
            if(numbers[z]==ingredientJson[j].id){
                ingredientChosen.push(ingredientJson[j]);
            }
        }
            
    }

    numbers=[];
      
    var RecipeName =document.getElementById("Recipe name:").value;
    var time = document.getElementById("Recipe cooking time:").value;
    var Method = document.getElementById("Recipe cooking method:").value;           
    var RecipeImage = document.getElementById("Recipe Image (url):").value;

    Recipes.push(new DishRecipe(RecipeName,ingredientChosen,time,Method,RecipeImage));
    Recipes[Recipes.length-1].Render();

    ingredientChosen=[];

    swal("Good job!", "You create a new Recipe!", "success");
}



function cleanDiv(div){
    div.innerHTML = '';
}


function addNewRecipe (){
    cleanDiv(simpleForm);
    document.getElementById("formGrid").style.display = "block";
    
    let arr=["Recipe name:","Recipe cooking method:","Recipe cooking time:","Recipe Image (url):"]
    let str = "";
    let hr=""
    str += "<form action=''>";
        str += "<table class= center>";
        for (var i = 0; i < 4; i++) {
            str += "<tr>";
                str += "<td>";
                str+= arr[i];
                str+="</br>"
                str+="<input type=text id='"+arr[i]+"' required>"; 
                str += "</td>";
        }
        str += "</tr>";
        str += "<table>";

        str+="<input type=button class=button value=Create_Recipe onclick='Create_Recipe()'/>";
        str+="<input type=button class=button value=Close onclick='cleanDiv(simpleForm)'/>";
        
    str += "</form>";

    str+="<h3>Choose Ingredient</h3>";
    
    document.getElementById("simpleForm").innerHTML = str;
  
}



function addNewIngredient (){
    cleanDiv(simpleForm);
    document.getElementById("formGrid").style.display = "none";

    let arr=["Ingredient name:","Ingredient Image (url):","Ingredient Calories:"]
    let str = "";
    str += "<form action='/action_page.php'>";
        str += "<table class= center>";
        for (var i = 0; i < 3; i++) {
            str += "<tr>";
                str += "<td>";
                str+= arr[i];
                str+="</br>";
                str+="<input id='"+arr[i]+"' type=text required>" ;
                str += "</td>";
        }
        str += "</tr>";
        str += "<table>";
        str+="<input type=button class=button value=Create_Ingredient onclick='insert_Ingredient()'/>";
        str+="<input type=button class=button value=Close onclick='cleanDiv(simpleForm)'/>";
        str+="<hr>";      
    str += "</form>";

    document.getElementById("simpleForm").innerHTML = str;
    

}


function insert_Ingredient(){
    
    var newName =document.getElementById("Ingredient name:").value;
    var newImage = document.getElementById("Ingredient Image (url):").value;
    var newCalories = document.getElementById("Ingredient Calories:").value;

    ingredientJson.push(new Ingredient(idNum,newName,newImage,newCalories));
    ingredientJson[ingredientJson.length-1].Render();

    swal("Good job!", "You create a new ingredient!", "success");
}






