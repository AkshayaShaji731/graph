const container = document.querySelector(".main-container")
const drawBtn = document.querySelector(".draw")
const resetBtn = document.querySelector(".reset")

let xAxis
let yAxis

drawBtn.addEventListener("click", graphOutline)
resetBtn.addEventListener("click", reset)

function graphOutline() {
    container.innerHTML = ""
    let x = parseInt(document.querySelector(".max-x").value)
    let y = parseInt(document.querySelector(".max-y").value)
    for (let i = 1; i <= y; i++) {
        let column = document.createElement("div")
        column.classList.add("col")
        column.dataset.column = i
        column.style.gridTemplateColumns = `repeat(${x}, 1fr)`
        for (let j = 1; j <= x; j++) {
            let row = document.createElement("div")
            row.classList.add("row")
            row.dataset.row = j
            column.appendChild(row)
        }
        container.appendChild(column)
    }
    xAxis = x;
    yAxis = y
    document.querySelector(".label-x").innerHTML = "Enter the x-axis"
    document.querySelector(".label-y").innerHTML = "Enter the y-axis"
    document.querySelector(".max-x").value = ""
    document.querySelector(".max-y").value = ""
    drawBtn.removeEventListener("click", graphOutline)
    drawBtn.className = "mark"
    drawBtn.innerHTML = "Mark"
    drawBtn.addEventListener("click", creategraph)
}

function clearGraph() {
    let y = container.querySelectorAll(".col")
    y.forEach((e) => {
        let x = e.querySelectorAll(".row")
        x.forEach((row) => {
            row.style.backgroundColor = "brown"
        })
    })
    drawBtn.removeEventListener("click", clearGraph)
    drawBtn.className = "mark"
    drawBtn.innerHTML = "Mark"
    drawBtn.addEventListener("click", creategraph)

}
function creategraph() {
    let x = parseInt(document.querySelector(".max-x").value)
    let y = parseInt(document.querySelector(".max-y").value)
    if (x < xAxis) {
        document.querySelector(".max-x").style.borderColor = "black"
        if (y < yAxis) {
            document.querySelector(".max-y").style.borderColor = "black"
            for (let i = y; i >= 0; i--) {
                let column = container.querySelectorAll(".col")
                let pointCol = column[i]
                let row = pointCol.querySelectorAll(".row")
                pointRow = row[x]
                pointRow.style.backgroundColor = "black"
            }
            document.querySelector(".max-x").value = ""
            document.querySelector(".max-y").value = ""
            drawBtn.removeEventListener("click", creategraph)
            drawBtn.className = "clear"
            drawBtn.innerHTML = "Clear"
            drawBtn.addEventListener("click", clearGraph)
        }
        else {
            document.querySelector(".max-y").style.borderColor = "red"
        }
    }
    else {
        document.querySelector(".max-x").style.borderColor = "red"
    }
}
function reset() {
    document.querySelector(".label-x").innerHTML = "Enter the No.of rows"
    document.querySelector(".label-y").innerHTML = "Enter the No.of Column"
    document.querySelector(".max-x").value = ""
    document.querySelector(".max-y").value = ""
    container.innerHTML = ""
    drawBtn.removeEventListener("click", clearGraph)
    drawBtn.className = "draw"
    drawBtn.innerHTML = "Draw"
    drawBtn.addEventListener("click", graphOutline)
}
