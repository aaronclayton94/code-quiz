function printHighscores () {
    // get highscores from localstorage or set as empty array
    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
  
    // rank highscores by highest time in descending order
    highscores.sort(function(a, b) {
      return b.score - a.score;
    });
  
    highscores.forEach(function(score) {
      // create li tag for each score
      var liTag = document.createElement("li");
      liTag.setAttribute("class", "table-bordered text-center")
      liTag.textContent = score.name + " - " + score.score;
  
      // display on page
      var olEl = document.getElementById("highscores");
      olEl.appendChild(liTag);
    });
  }
  
  // clear highscores
  function clearHighscores() {
    window.localStorage.removeItem("highscores");
    window.location.reload();
  }
  
  document.getElementById("clear").onclick = clearHighscores;
  // run when page is loaded
  printHighscores();
  