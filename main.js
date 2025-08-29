const words = [
  "apple",
  "banana",
  "orange",
  "grape",
  "melon",
  "pear",
  "peach",
  "plum",
  "cherry",
  "kiwi",
  "dog",
  "cat",
  "bird",
  "fish",
  "horse",
  "sheep",
  "cow",
  "goat",
  "lion",
  "tiger",
  "red",
  "blue",
  "green",
  "yellow",
  "black",
  "white",
  "pink",
  "purple",
  "brown",
  "gray",
  "table",
  "chair",
  "sofa",
  "bed",
  "lamp",
  "desk",
  "door",
  "window",
  "clock",
  "mirror",
  "car",
  "bus",
  "train",
  "plane",
  "boat",
  "bike",
  "truck",
  "ship",
  "taxi",
  "subway",
  "book",
  "pen",
  "pencil",
  "paper",
  "eraser",
  "marker",
  "notebook",
  "folder",
  "board",
  "ruler",
  "house",
  "room",
  "kitchen",
  "bathroom",
  "garden",
  "roof",
  "floor",
  "wall",
  "garage",
  "yard",
  "water",
  "fire",
  "earth",
  "air",
  "sky",
  "rain",
  "snow",
  "wind",
  "cloud",
  "storm",
  "sun",
  "moon",
  "star",
  "planet",
  "space",
  "light",
  "dark",
  "day",
  "night",
  "shadow",
  "happy",
  "sad",
  "angry",
  "tired",
  "excited",
  "bored",
  "fast",
  "slow",
  "hot",
  "cold",
];

let wordIndex = Math.floor(Math.random() * words.length);
let word = words[wordIndex];
let wordLength = word.length;

console.log(word);


let inputArea = document.querySelector(".input");
const rows = [];
for (let i = 0; i < 5; i++) {
  const inputs = [];
  let guessRow = document.createElement("div");
  guessRow.className = "guess-row";

  let guessRowTitle = document.createElement("h3");
  guessRowTitle.className = "guess-row-title";
  guessRowTitle.textContent = "Try" + (i + 1);
  guessRow.appendChild(guessRowTitle);

  let cells = document.createElement("div");
  cells.className = "cells";
  cells.style.gridTemplateColumns = `repeat(${wordLength}, 1fr)`;
  guessRow.appendChild(cells);

  for (let j = 0; j < wordLength; j++) {
    let cell = document.createElement("input");
    cell.className = "cell";
    cell.type = "text";
    cell.maxLength = 1;

    cell.addEventListener("input", (e) => {
      let v = e.target.value || "";
      if (!/^[a-z]$/i.test(v)) {
        e.target.value = "";
        return;
      }
      e.target.value = v.toLowerCase();
      if (j < wordLength - 1) {
        inputs[j + 1].focus();
      }
    });
    inputs.push(cell);
    cells.appendChild(cell);
  }
  rows.push(inputs);
  inputArea.appendChild(guessRow);
}
rows[0][0].focus();

let rowNum = 0;
let cellNum = 0;

let hintBtn = document.querySelector(".hint");
let remainHint = document.getElementById("remainingHints");
let remainHintNum = 3;

remainHint.textContent = remainHintNum;



let message = document.querySelector(".message");

hintBtn.addEventListener("click", () => {
  if (remainHintNum > 0) {
    for (let i = 0; i < wordLength; i++) {
      if (rows[rowNum][i].value === "") {
        rows[rowNum][i].value = word[i];
        remainHintNum--;
        remainHint.textContent = remainHintNum;
        if (remainHintNum === 0) {
          hintBtn.disabled = true;
          hintBtn.style.cursor = "not-allowed";
        }
        rows[rowNum][Math.min(wordLength-1,i+1)].focus();
        return;
      }
    }
    message.textContent = "All the cells are filled";
  }

});


for(let i=1;i<5;i++){
  for(let j=0;j<wordLength;j++){
    rows[i][j].disabled=true;
  }
}

let checkBtn = document.querySelector(".check");

checkBtn.addEventListener("click", () => {

  for(let i=0;i<wordLength;i++){
    rows[Math.min(4,rowNum+1)][i].disabled=false;
  }
  const counts = new Map();
for (let ch of word) {
  counts.set(ch, (counts.get(ch) || 0) + 1);
}

  let flag=true;
  for(let i=0;i<wordLength;i++){
    if(rows[rowNum][i].value==""){
      flag=false;
      break;
    }
  }
  if(!flag){
    message.textContent="you have to fill all the cell to check!";
    return;
  }

  
  for(let i=0;i<wordLength;i++){
    if(rows[rowNum][i].value===word[i]){
      rows[rowNum][i].style.backgroundColor = "green";
      counts.set(rows[rowNum][i].value, (counts.get(rows[rowNum][i].value) || 0) - 1);
    }
  }

  for(let i=0;i<wordLength;i++){
    if(rows[rowNum][i].style.backgroundColor==="green"){
      continue;
    }
      if ((counts.get(rows[rowNum][i].value) || 0) > 0) {
    rows[rowNum][i].style.backgroundColor = "gold";
      counts.set(rows[rowNum][i].value, (counts.get(rows[rowNum][i].value) || 0) - 1);
  } 
  else {
    rows[rowNum][i].style.backgroundColor = "gray";
  }
  }
  let win=true;
    for(let i=0;i<wordLength;i++){
      if(rows[rowNum][i].style.backgroundColor!=="green"){
        win=false;
      }
    }
    if(win){
      checkBtn.disabled = true;
     checkBtn.style.cursor = "not-allowed";
     message.textContent="you win :)";
     for(let i=rowNum+1;i<5;i++){
      for(let j=0;j<wordLength;j++){
        rows[i][j].disabled = true;
      }
     }
     hintBtn.disabled=true;
     return;
    }
  rowNum++;
  if(rowNum==5){
     checkBtn.disabled = true;
     checkBtn.style.cursor = "not-allowed";
     message.textContent=`you lose :(\n the word is: ${word}`;
     for(let i=0;i<5;i++){
      for(let j=0;j<wordLength;j++){
        rows[i][j].disabled = true;
      }
     }
     return;
  }
  else{
      rows[rowNum][0].focus();
  }

});

let reloadBtn=document.querySelector(".reload");
reloadBtn.addEventListener("click",()=>{
  location.reload();
});


document.addEventListener("keydown", (event) => {
  const currentRow = rows[rowNum];
  const active = document.activeElement;
  const index = currentRow.indexOf(active);

  if (event.key === "ArrowLeft") {
    if (index > 0) {
      currentRow[index - 1].focus();
    }
  }

  if (event.key === "ArrowRight") {
    if (index < currentRow.length - 1) {
      currentRow[index + 1].focus();
    }
  }

  if (event.key === "Enter") {
    checkBtn.click();
  }

  if (event.key === "Backspace") {
    if (index > 0) {
    if (currentRow[index].value === "") {
      currentRow[index - 1].value = "";
      currentRow[index - 1].focus();
    } else {
      currentRow[index].value = "";
    }
  } else {
    currentRow[0].value = "";
  }
  }
});
