// check user input and add street

function enterStreet() 
{
  app.enterStreet();
}


function getStore() {
  return JSON.parse(window.localStorage.getItem("places") || "{}");
}

function setStore(places) {
  window.localStorage.setItem("places", JSON.stringify(places));
}

function addToStore(place) {
  let found = getStore();
  found[place] = true;
  setStore(found);
}

function hasFoundPlace(place) {
  let found = getStore();
  return found[place];
}
  
App.prototype.enterStreet = function() 
{
  var inputName = document.getElementById("text_a").value;
  text_a.value = "";
  
  console.log('enter street : ' + inputName);

  
  // see if there's a matching place name in the list
  var placeMatch = null;  
  this.placeList.forEach(place => 
  { 
  
    if (!placeMatch)
    {
          if (place.name == inputName)
          {
            placeMatch = place;
          }
    }
  
  });
  
  const alreadyFound = placeMatch && hasFoundPlace(placeMatch.name);
 
  // display the matching place on map
  if (placeMatch)
  {
    placeMatch.selected = true;
    addToStore(placeMatch.name);
    placeMatch.showOverlay();
    
    // refresh the score
    this.displayScore();
    
    document.getElementById("answer").innerHTML = " ";
  }
  else
  {
    
   document.getElementById("text_a")
      .animate(
        [
          { transform: "translateX(-3px)" },
          { transform: "translateX(3px)" },
          { transform: "translateX(-3px)" },
          { transform: "translateX(3px)" },
          { transform: "translateX(-3px)" },
          { transform: "translateX(3px)" },
        ],
        {
          duration: 1000,
          iterations: 1,
        }
      );
  }
    
}


App.prototype.displayScore = function() 
{  
    var score = Object.keys(
    JSON.parse(window.localStorage.getItem("places") || "{}")
  ).length;
    document.getElementById("score").innerHTML = score;
    document.getElementById("total").innerHTML = this.placeList.length;
  
  
  const shareText = `I named ${score} London boroughs on the London Borough Quiz!`;
    const shareData = {
    title: "London Borough Quiz",
    text: shareText,
    url: window.location.href
    };
  document.getElementById("share").onclick = (e) => {
    e.preventDefault();
    window.location='https://twitter.com/intent/tweet?text=💂🏼‍♂️I%20just%20played%20the%20London%20Boroughs%20Quiz%20and%20named%20' + score + '%20London%20boroughs.%20https://london-borough-quiz.glitch.me/' };  

    if (score == this.placeList.length)  
    {
      setTimeout("app.winMessage()", 100);
    }
}
  

App.prototype.winMessage = function() 
{  
    alert("Well done ! You found all " + this.placeList.length + " cities.");
}
