let width;
let taskDiv;
let nodelist = [];
//to make all the cards of equal width when the browser width get reduced
export function initial() {
  taskDiv = document.querySelectorAll(".task");
  console.log(taskDiv);
  for (let i = 0; i < taskDiv.length; i++) {
    nodelist[i] = {
      width: eval(
        window
          .getComputedStyle(taskDiv[i], null)
          .getPropertyValue("width")
          .replace("px", "")
      ),
      ismin: false,
    };
  }

  width = Math.min(...nodelist.map((el) => el.width)); // getting the cards whose width is minimum

  for (let i = 0; i < nodelist.length; i++) {
    if (nodelist[i].width == width) {
      nodelist[i].ismin = true;
    } else {
      taskDiv[i].style.maxWidth = `${width}px`; // setting cards whose width is maximum to minimum width
    }
  }
}

console.log(nodelist);

export function cardsWidthEqual() {
  // getting the width when the screen is resized
  for (let i = 0; i < nodelist.length; i++) {
    if (nodelist[i].ismin == true) {
      width = eval(
        window
          .getComputedStyle(taskDiv[i], null)
          .getPropertyValue("width")
          .replace("px", "")
      );
      break;
    }
  }
  //   console.log(width);

  for (let i = 0; i < taskDiv.length; i++) {
    if (nodelist[i].ismin == false) {
      taskDiv[i].style.maxWidth = `${width}px`;
    }
  }
}

