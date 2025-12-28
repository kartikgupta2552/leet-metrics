
const searchInput = document.querySelector("#input-name")
const searchButton = document.querySelector("#search-btn")
const progressDiv = document.querySelector(".progress")
const easyCircle = document.querySelector(".easy-circle")
const mediumCircle = document.querySelector(".medium-circle")
const hardCircle = document.querySelector(".hard-circle")
const easyLabel = document.getElementById("easy-label")
const mediumLabel = document.getElementById("medium-label")
const hardLabel = document.getElementById("hard-label")

function checkValidUsername(name){
    name = name.trim();
    if(name === ""){
        alert("Username must not be empty")
        return false;
    }
    const regex = /^[A-Za-z][A-Za-z0-9_-]{2,15}$/;
    if(regex.test(name) == false){
        alert("Invalid Username")
        return false;
    }
    return true
}

function updateProgress(total, solved, label, progressBar){
    const percent = (solved/total)*100;
    progressBar.style.setProperty("--progress-degree", `${percent}%`)
    label.textContent = `${solved}/${total}`
}

function displayUserData(data){
    const totalQuestions = data.totalQuestions
    const totalEasy = data.totalEasy
    const totalMedium = data.totalMedium
    const totalHard = data.totalHard

    const totalSolved = data.totalSolved
    const easySolved = data.easySolved
    const mediumSolved = data.mediumSolved
    const hardSolved = data.hardSolved

    updateProgress(totalEasy, easySolved, easyLabel, easyCircle)
    updateProgress(totalMedium, mediumSolved, mediumLabel, mediumCircle)
    updateProgress(totalHard, hardSolved, hardLabel, hardCircle)
}

searchButton.addEventListener("click", () => {
    const username = searchInput.value;
    searchInput.value = ""
    if(checkValidUsername(username)){
        const url = `https://leetcode-stats-api.herokuapp.com/${username}`
        searchInput.value = "Searching..."
        searchInput.readOnly = true
        searchButton.disabled = true;
        fetch(url)
            .then(res => {
                if(!res.ok) throw new Error("Unable to fetch the user details")
                return res;
            })
            .then(res => res.json())
            .then(data => {
                if(data.status == "error") throw new Error("Unable to fetch the user details")
                displayUserData(data)
            })
            .catch(err => {
                progressDiv.innerHTML = "<p>No Data Found</p>"
                progressDiv.setAttribute("style", "color:white" )
                console.log(err)
            })
            .finally(() => {
                searchInput.value = ""
                searchInput.readOnly = false
                searchButton.disabled = false
            })
    }
})

// kartikgupta2552


// https://leetcode-stats-api.herokuapp.com

/*
  "status": "success",
  "message": "retrieved",
  "totalSolved": 568,
  "totalQuestions": 3791,
  "easySolved": 205,
  "totalEasy": 918,
  "mediumSolved": 311,
  "totalMedium": 1977,
  "hardSolved": 52,
  "totalHard": 896,
  "acceptanceRate": 81.11,
  "ranking": 130250,
  "contributionPoints": 3987,
  "reputation": 1,
*/