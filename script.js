const title = document.querySelectorAll(".heading");
console.log(title);
const list = document.querySelectorAll(".list");
// console.log(list);
for (i = 0; 1 < list.length; i++) {
  list[i].style.fontSize = "5rem";
}
//Creating Elemets
const ul = document.querySelector("ul");
const li = document.createElement("li");
ul.append(li);
