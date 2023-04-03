window.addEventListener("beforeunload", function (event) {
  var checkBox = document.getElementById("check_save");

  if (checkBox.checked == true) {
    console.log("1");
    event.preventDefault();
    event.returnValue = "";
  }
});

const score_name = document.getElementById("score_name");
const score_objective = document.getElementById("score_objective");
let score_max = 1000;

const outputText = document.getElementById("output");
const table = document.getElementById("ranges");
const addRowBtn = document.getElementById("add-row");
const generateBtn = document.getElementById("generate");

addRowBtn.addEventListener("click", () => {
  const row = table.insertRow(-1);

  const tableRows = table.rows;

  const tableLength = parseInt(tableRows.length - 2);

  const rowCells = tableRows[tableLength].cells;
  const to = parseInt(rowCells[1].querySelector("input").value);
  prevEndValue1 = parseInt(to) + 1;
  prevEndValue2 = parseInt(to) + 2;

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
              <option value="other">Other</option>
              <option value="block">Block</option>
              <option value="summon">Summon</option>
          </select>
      </td>
      <td><button class="remove-row">Remove</button></td>
  `;

  const removeRowBtn = row.querySelector(".remove-row");
  removeRowBtn.addEventListener("click", () => {
    table.deleteRow(row.rowIndex);
  });
});

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
