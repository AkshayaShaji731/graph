// const container = document.querySelector(".main-container")
// const drawBtn = document.querySelector(".draw")
// const resetBtn = document.querySelector(".reset")

// let xAxis
// let yAxis

// drawBtn.addEventListener("click", graphOutline)
// resetBtn.addEventListener("click", reset)

// function graphOutline() {
//     container.innerHTML = ""
//     let x = parseInt(document.querySelector(".max-x").value)
//     let y = parseInt(document.querySelector(".max-y").value)
//     for (let i = 1; i <= y; i++) {
//         let column = document.createElement("div")
//         column.classList.add("col")
//         column.dataset.column = i
//         column.style.gridTemplateColumns = `repeat(${x}, 1fr)`
//         for (let j = 1; j <= x; j++) {
//             let row = document.createElement("div")
//             row.classList.add("row")
//             row.dataset.row = j
//             column.appendChild(row)
//         }
//         container.appendChild(column)
//     }
//     xAxis = x;
//     yAxis = y
//     document.querySelector(".label-x").innerHTML = "Enter the x-axis"
//     document.querySelector(".label-y").innerHTML = "Enter the y-axis"
//     document.querySelector(".max-x").value = ""
//     document.querySelector(".max-y").value = ""
//     drawBtn.removeEventListener("click", graphOutline)
//     drawBtn.className = "mark"
//     drawBtn.innerHTML = "Mark"
//     drawBtn.addEventListener("click", creategraph)
// }

// function clearGraph() {
//     let y = container.querySelectorAll(".col")
//     y.forEach((e) => {
//         let x = e.querySelectorAll(".row")
//         x.forEach((row) => {
//             row.style.backgroundColor = "brown"
//         })
//     })
//     drawBtn.removeEventListener("click", clearGraph)
//     drawBtn.className = "mark"
//     drawBtn.innerHTML = "Mark"
//     drawBtn.addEventListener("click", creategraph)

// }
// function creategraph() {
//     let x = parseInt(document.querySelector(".max-x").value)
//     let y = parseInt(document.querySelector(".max-y").value)
//     if (x < xAxis) {
//         document.querySelector(".max-x").style.borderColor = "black"
//         if (y < yAxis) {
//             document.querySelector(".max-y").style.borderColor = "black"
//             for (let i = y; i >= 0; i--) {
//                 let column = container.querySelectorAll(".col")
//                 let pointCol = column[i]
//                 let row = pointCol.querySelectorAll(".row")
//                 pointRow = row[x]
//                 pointRow.style.backgroundColor = "black"
//             }
//             document.querySelector(".max-x").value = ""
//             document.querySelector(".max-y").value = ""
//             drawBtn.removeEventListener("click", creategraph)
//             drawBtn.className = "clear"
//             drawBtn.innerHTML = "Clear"
//             drawBtn.addEventListener("click", clearGraph)
//         }
//         else {
//             document.querySelector(".max-y").style.borderColor = "red"
//         }
//     }
//     else {
//         document.querySelector(".max-x").style.borderColor = "red"
//     }
// }
// function reset() {
//     document.querySelector(".label-x").innerHTML = "Enter the No.of rows"
//     document.querySelector(".label-y").innerHTML = "Enter the No.of Column"
//     document.querySelector(".max-x").value = ""
//     document.querySelector(".max-y").value = ""
//     container.innerHTML = ""
//     drawBtn.removeEventListener("click", clearGraph)
//     drawBtn.className = "draw"
//     drawBtn.innerHTML = "Draw"
//     drawBtn.addEventListener("click", graphOutline)
// }


const root = document.getElementById("root")

root.innerHTML = `
<button id="add-btn">Add Graph</button>
<div id="btn-container"></div>
<div id="container"></div>
`
const addBtn = document.getElementById("add-btn")
const btnCon = document.getElementById("btn-container")
const container = document.getElementById("container")
const graphs = [];
addBtn.addEventListener("click", () => {
    btnCon.innerHTML = `
        <section class="button-container">
            <div class="inputs">
            <label for="max-x" class="label-x">Enter the No.of rows</label>
            <input type="number" min="0" class="max-x">
            <label for="max-y" class="label-y">Enter the No.of Column</label>
            <input type="number"  min="0" class="max-y">
            <button id="draw">Draw</button>
            </div>
        </section>
   `
    const xAxis = document.querySelector(".max-x")
    const yAxis = document.querySelector(".max-y")
    const drawBtn = document.getElementById("draw")
    drawBtn.addEventListener("click", () => {
        const x = parseInt(xAxis.value);
        const y = parseInt(yAxis.value);
        graphOutline(x, y, xAxis, yAxis)
    })
})
class Details {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.cells = []

        this.element = document.createElement("div");
        this.element.classList.add("col");
        this.element.style.display = "grid";
        this.element.style.gap="2px"
        this.element.style.gridTemplateColumns = `repeat(${x}, 1fr)`;

        for (let i = 0; i < y; i++) {
            for (let j = 0; j < x; j++) {
                const cell = document.createElement("div");
                cell.classList.add("row");
                cell.dataset.x = j;
                cell.dataset.y = y - i - 1;
                this.element.appendChild(cell);
                this.cells.push({ x: j, y: y - i - 1, element: cell });
            }
        }
        container.appendChild(this.element)
    }
    plotPoint(x, y, color = "black", row, col,xAxis,yAxis) {
       
          if (x < row) {
        xAxis.style.borderColor = color
        if (y < col) {
            yAxis.style.borderColor = color
            for (let i = y; i >= 0; i--) {
                    const cell = this.cells.find(c => c.x === x && c.y === y-i);
                    if (cell) {
                        cell.element.style.backgroundColor = color;
                    }
            }
            xAxis.value = ""
            yAxis.value = ""
        }
        else {
           yAxis.style.borderColor = "red"
        }
    }
    else {
        xAxis.style.borderColor = "red"
    }
    }
}

function graphOutline(x, y, xAxis, yAxis) {

    const graph = new Details(x, y);
    graphs.push(graph);
    xAxis.value = "";
    yAxis.value = "";
    let row = x;
    let col = y;


    const wrapper = document.createElement("div")
    const plotBtn = document.createElement("button");
    plotBtn.id = "plot-btn"
    plotBtn.textContent = "plot";
    wrapper.appendChild(plotBtn, graph.element)
    container.appendChild(wrapper)
    plotBtn.addEventListener("click", () => {
        const drawBtn = document.getElementById("draw");
        drawBtn.textContent = "Plot";

        const newDrawBtn = drawBtn.cloneNode(true);
        drawBtn.parentNode.replaceChild(newDrawBtn, drawBtn);

        newDrawBtn.addEventListener("click", () => {
            const x = parseInt(xAxis.value);
            const y = parseInt(yAxis.value);
            graph.plotPoint(x, y, "blue", row, col,xAxis,yAxis);
        });
    });
}