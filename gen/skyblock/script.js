window.addEventListener("beforeunload", function (event) {
  var checkBox = document.getElementById("check_save");

  if (checkBox.checked == true) {
    event.preventDefault();
    event.returnValue = "";
  }
});

const showSearch = document.getElementById("searchbox");

function toggleSearch() {
  showSearch.classList.toggle("hidden");
  if (showSearch.classList.contains("hidden")) {
    document.removeEventListener("keydown", ESCkeydownListener);
  } else {
    document.addEventListener("keydown", ESCkeydownListener);
  }
}

function ESCkeydownListener(event) {
  if (event.key === "Escape") {
    toggleSearch();
  } else return;
}

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
// fromLoad.value = score_min;
// toLoad.value = score_max;

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
      var rangeStr = "";
      if (range.from !== range.to) {
        rangeStr = `execute if score ${score_name.value} ${score_objective.value} matches ${range.from}..${range.to} run`;
      } else {
        rangeStr = `execute if score ${score_name.value} ${score_objective.value} matches ${range.from} run`;
      }

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

//output / inupt code to reuse
const inputCode = document.getElementById("input_code");
const tableBody = document.getElementById("tableBody");

// function getCode() {
//   // console.log(tableBody.innerHTML);
//   // outputText.innerHTML = tableBody.innerHTML.replace(/\s/g, ""); // err
//   // outputText.innerHTML = tableBody.innerHTML.replace(/^./, "");
//   const firstFrom = document.getElementById("fromLoad");
//   const firstTo = document.getElementById("toLoad");
//   console.log(firstFrom);

//   outputText.innerHTML = tableBody.innerHTML;
// }

function submitInput() {
  loadTableData(inputCode.value);
}

function generateTableData() {
  const rows = table.rows;
  let output = "";

  for (let i = 0; i < rows.length; i++) {
    const cells = rows[i].cells;
    let rowOutput = "";

    for (let j = 0; j < cells.length; j++) {
      const input = cells[j].querySelector("input,select");
      if (input) {
        if (input.nodeName === "SELECT") {
          rowOutput += input.value.charAt(0).toUpperCase() + input.value.slice(1) + ",";
        } else {
          rowOutput += input.value + ",";
        }
      }
    }

    output += rowOutput.slice(0, -1) + "\n";
  }

  return output;
  // outputText.innerHTML = output;
}

function loadTableData(data) {
  while (table.children.length > 1) {
    table.removeChild(table.lastElementChild);
  }

  const rows = data.split("\n");

  for (let i = 0; i < rows.length; i++) {
    if (rows[i] === "") {
      continue;
    }

    const cells = rows[i].split(",");
    const row = table.insertRow();

    for (let j = 0; j < cells.length; j++) {
      const cell = row.insertCell();
      let inputType = "text";

      if (j === 0 || j === 1) {
        inputType = "number";
      } else if (j === 3) {
        const select = document.createElement("select");
        const options = ["Block", "Summon", "Other"];
        for (let k = 0; k < options.length; k++) {
          const option = document.createElement("option");
          option.value = options[k];
          option.text = options[k];
          select.appendChild(option);
        }
        cell.appendChild(select);

        if (cells[j]) {
          select.selectedIndex = options.indexOf(cells[j].charAt(0).toUpperCase() + cells[j].slice(1));
        }

        continue;
      }

      const input = document.createElement("input");
      input.type = inputType;
      input.value = cells[j];
      cell.appendChild(input);
    }

    const cell = row.insertCell();
    const button = document.createElement("button");
    button.textContent = "Remove";
    button.addEventListener("click", () => {
      table.deleteRow(row.rowIndex);
    });
    cell.appendChild(button);
  }
}

//cookies

function genCode() {
  outputText.innerHTML = generateTableData();
}

function saveCode() {
  const outputCode = generateTableData();
  setCookie("codeSave", encodeCookieValue(outputCode));
  alertBox("Table has been saved!");
}

function loadCode() {
  const codeSave = decodeCookieValue(getCookie("codeSave"));
  loadTableData(codeSave);
  alertBox("Table has been loaded!");
}

function setCookie(name, value) {
  document.cookie = name + "=" + value + ";path=/";
}

function getCookie(name) {
  const cookieName = name + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(";");

  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i];
    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(cookieName) === 0) {
      return cookie.substring(cookieName.length, cookie.length);
    }
  }

  return "";
}

function deleteCookie(name) {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

//encode / decode
function encodeCookieValue(value) {
  return encodeURIComponent(value);
}
function decodeCookieValue(value) {
  return decodeURIComponent(value);
}

// alert box
function alertBox(text) {
  const alertBox = document.getElementById("alertBox");
  alertBox.children[0].innerHTML = text;
  alertBox.style.display = "flex";
  setTimeout(function () {
    alertBox.style.display = "none";
  }, 3000);
}

const template_select = document.getElementById("template_select");

template_select.onchange = function () {
  const selectedOption = template_select.value;

  if (selectedOption === "overworld") {
    clearTable();
    loadTableData(``);
  } else if (selectedOption === "the_nether") {
    // Run function for option 2
    console.log("Function for option 2 was called");
  } else return;
};

function clearTable() {
  table.innerHTML = "";
}
