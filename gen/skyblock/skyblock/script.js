const showSearch = document.getElementById("searchbox");

function toggleSearch() {
  showSearch.classList.toggle("hidden");
}

window.addEventListener("beforeunload", function (event) {
  var checkBox = document.getElementById("check_save");

  if (checkBox.checked == true) {
    event.preventDefault();
    event.returnValue = "";
  }
});

const score_name = document.getElementById("score_name");
const score_objective = document.getElementById("score_objective");

const outputText = document.getElementById("output");
const table = document.getElementById("ranges");
const addRowBtn = document.getElementById("add-row");
const generateBtn = document.getElementById("generate");

let score_min = 1;
let score_max = 1000;
const fromLoad = document.getElementById("fromLoad");
const toLoad = document.getElementById("toLoad");
// fromLoad.max = score_min;
fromLoad.value = score_min;
// toLoad.max = score_max;
toLoad.value = score_max;

addRowBtn.addEventListener("click", addRow);

function addRow(iText, iType) {
  const row = table.insertRow(-1);

  const tableRows = table.rows;

  const tableLength = parseInt(tableRows.length - 2);

  const rowCells = tableRows[tableLength].cells;
  const to = parseInt(rowCells[1].querySelector("input").value);
  prevEndValue1 = parseInt(to) + 1;
  prevEndValue2 = parseInt(to) + 2;

  if (iText == undefined || iType == undefined) {
    // console.log("no item selected");

    row.innerHTML =
      `
      <td><input type="number" min="1" max=` +
      score_max +
      ` value=` +
      prevEndValue1 +
      `></td>
      <td><input type="number" min="1" max=` +
      score_max +
      ` value=` +
      prevEndValue2 +
      `></td>
      <td><input id="text" type="text" placeholder="dirt / chicken"></td>
      <td>
          <select>
              <option value="block">Block</option>
              <option value="summon">Summon</option>
              <option value="other">Other</option>
          </select>
      </td>
      <td><button class="remove-row">Remove</button></td>
  `;

    const removeRowBtn = row.querySelector(".remove-row");
    removeRowBtn.addEventListener("click", () => {
      table.deleteRow(row.rowIndex);
    });
  } else {
    const searchPercentage = document.getElementById("searchpercentage");
    if (searchPercentage.value) {
      prevEndValue2 = prevEndValue1 - 1 + parseInt(searchPercentage.value);
      prevEndValue2 = parseInt(prevEndValue2);
    }
    if (iType == "summon") {
      // console.log("summon type");
      row.innerHTML =
        `
      <td><input type="number" min="1" max=` +
        score_max +
        ` value=` +
        prevEndValue1 +
        `></td>
      <td><input type="number" min="1" max=` +
        score_max +
        ` value=` +
        prevEndValue2 +
        `></td>
      <td><input id="text" type="text" placeholder="dirt / chicken" value="${iText}"></td>
      <td>
          <select>
              <option value="block">Block</option>
              <option selected value="summon">Summon</option>
              <option value="other">Other</option>
          </select>
      </td>
      <td><button class="remove-row">Remove</button></td>
  `;

      const removeRowBtn = row.querySelector(".remove-row");
      removeRowBtn.addEventListener("click", () => {
        table.deleteRow(row.rowIndex);
      });
    } else if (iType == "block") {
      // console.log("block type");
      row.innerHTML =
        `
      <td><input type="number" min="1" max=` +
        score_max +
        ` value=` +
        prevEndValue1 +
        `></td>
      <td><input type="number" min="1" max=` +
        score_max +
        ` value=` +
        prevEndValue2 +
        `></td>
      <td><input id="text" type="text" placeholder="dirt / chicken" value="${iText}"></td>
      <td>
          <select>
              <option selected value="block">Block</option>
              <option value="summon">Summon</option>
              <option value="other">Other</option>
          </select>
      </td>
      <td><button class="remove-row">Remove</button></td>
  `;

      const removeRowBtn = row.querySelector(".remove-row");
      removeRowBtn.addEventListener("click", () => {
        table.deleteRow(row.rowIndex);
      });
    } else return console.log("error.type.not.found");
  }
}

generateBtn.addEventListener("click", generateOutput);

function generateOutput() {
  const ranges = [];
  const tableRows = table.rows;
  for (let i = 1; i < tableRows.length; i++) {
    const rowCells = tableRows[i].cells;
    const from = parseInt(rowCells[0].querySelector("input").value);
    const to = parseInt(rowCells[1].querySelector("input").value);
    const text = rowCells[2].querySelector("input").value;
    const option = rowCells[3].querySelector("select").value;
    ranges.push({ from, to, text, option });
  }
  const output = ranges
    .map((range) => {
      const rangeStr = `execute if score ${score_name.value} ${score_objective.value} matches ${range.from}..${range.to} run`;
      if (range.option === "summon") {
        return `${rangeStr.padEnd(10)} summon ${range.text} ~ ~1 ~`;
      } else if (range.option === "block") {
        return `${rangeStr.padEnd(10)} fill ~ ~ ~ ~ ~ ~ ${range.text}`;
      } else {
        return `${rangeStr.padEnd(10)} ${range.text}`;
      }
    })
    .join("\n");
  // alert(output);
  outputText.innerHTML = output;
  outputText.style.height = 100 + "%";
}

window.addEventListener("keypress", function (event) {
  if (event.keyCode === 13) {
    generateOutput();
  }
});

// new (slider)

function search_item() {
  let input = document.getElementById("searchbar").value;
  input = input.toLowerCase();
  let x = document.getElementsByClassName("mc-list");

  for (i = 0; i < x.length; i++) {
    if (!x[i].innerHTML.toLowerCase().includes(input)) {
      x[i].style.display = "none";
    } else {
      x[i].style.display = "";
    }
  }
}

function item_select(item, type) {
  addRow(item, type);
}

const searchBox = document.getElementById("searchbox");
const slider = document.getElementById("searchSlider");

slider.oninput = function () {
  searchBox.style.width = this.value + "%";
};

// replace "_" with " "
const searchList = document.getElementById("searchList");
const listItems = searchList.getElementsByTagName("a");

for (let i = 0; i < listItems.length; i++) {
  const itemText = listItems[i].innerHTML;
  const updatedText = itemText.replace(/_/g, " ");
  listItems[i].innerHTML = updatedText;
}

// category selection
const allCategory = document.getElementById("mc-all-cat");
const blocksCategory = document.getElementById("mc-block-cat");
const summonsCategory = document.getElementById("mc-summon-cat");

allCategory.addEventListener("click", () => {
  const itemsBlock = document.querySelectorAll(".mc-block");
  const itemsSummon = document.querySelectorAll(".mc-summon");

  for (const box of itemsSummon) {
    box.classList.remove("hidden");
  }
  for (const box of itemsBlock) {
    box.classList.remove("hidden");
  }
});
blocksCategory.addEventListener("click", () => {
  const itemsBlock = document.querySelectorAll(".mc-block");
  const itemsSummon = document.querySelectorAll(".mc-summon");

  for (const box of itemsSummon) {
    box.classList.add("hidden");
  }
  for (const box of itemsBlock) {
    box.classList.remove("hidden");
  }
});
summonsCategory.addEventListener("click", () => {
  const itemsBlock = document.querySelectorAll(".mc-block");
  const itemsSummon = document.querySelectorAll(".mc-summon");

  for (const box of itemsSummon) {
    box.classList.remove("hidden");
  }
  for (const box of itemsBlock) {
    box.classList.add("hidden");
  }
});
