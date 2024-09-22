function generateCombinations(n) {
  const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const result = [];
  const stack = [[]]; // Memulai dengan array kosong di stack

  // Loop selama stack tidak kosong
  while (stack.length > 0) {
    const current = stack.pop();

    if (current.length === n) {
      // Jika panjang kombinasi sesuai dengan n, tambahkan ke hasil
      result.push(current);
    } else {
      // Tambahkan kombinasi baru dengan angka yang belum dipakai
      for (let i = 0; i < digits.length; i++) {
        if (current.indexOf(digits[i]) === -1) {
          // Hindari angka yang sama
          stack.push([...current, digits[i]]);
        }
      }
    }
  }
  return result;
}

function uppercase(string) {
  let result = ''
  for(char of string) {
    result = result + char.toUpperCase()
  }
  return result
}

function getSolver() {
  const results = [];

  const inputOne = uppercase(document.getElementById("input-1").value);
  const inputTwo = uppercase(document.getElementById("input-2").value);
  const output = uppercase(document.getElementById("output").value);

  if (!inputOne) {
    return;
  }
  if (!inputTwo) {
    return;
  }
  if (!output) {
    return;
  }

  const uniqueChars = [...new Set((inputOne + inputTwo + output).split(""))];
  const combinations = generateCombinations(uniqueChars.length);

  combinations.forEach(function (combination) {
    let inputOneChange = inputOne;
    let inputTwoChange = inputTwo;
    let outputChange = output;

    for (index in uniqueChars) {
      let element = uniqueChars[index];
      let replacement = combination[index];
      // console.log(index)
      // console.log(combination)

      while (true) {
        inputOneChange = inputOneChange.replace(element, replacement);

        if (!inputOneChange.includes(element)) {
          break;
        }
      }

      while (true) {
        inputTwoChange = inputTwoChange.replace(element, replacement);

        if (!inputTwoChange.includes(element)) {
          break;
        }
      }

      while (true) {
        outputChange = outputChange.replace(element, replacement);

        if (!outputChange.includes(element)) {
          break;
        }
      }
    }
    const inputOneInt = parseInt(inputOneChange);
    const inputTwoInt = parseInt(inputTwoChange);
    const outputInt = parseInt(outputChange);

    if (inputOneInt + inputTwoInt === outputInt) {
      results.push(combination);
    }
  });

  const allSolusiWrapper =
    document.getElementsByClassName("all-solusi-wrapper")[0];
  let innerHTML = "";

  if (!results[0]) {
    allSolusiWrapper.innerHTML = `<p>Tidak Ada Solusi Ditemukan</p>`;
    return;
  } else {
    results.forEach((result, index) => {
      let inputsChar = "";
      let inputsDigit = "";

      uniqueChars.forEach((char) => {
        inputsChar =
          inputsChar + `<input type="text" value="${char}" disabled>`;
      });
      result.forEach((char) => {
        inputsDigit =
          inputsDigit + `<input type="text" value="${char}" disabled>`;
      });

      innerHTML =
        innerHTML +
        `
            <div class="solusi">
              <p>Solusi ${index + 1}</p>
              <span></span>
              <div class="solusi-wrapper">
                <div class="input-wrapper">
                  ${inputsChar}
                </div>
                <div class="input-wrapper">
                  ${inputsDigit}
                </div>
              </div>
            </div>
      `;
    });
  }

  allSolusiWrapper.innerHTML = innerHTML;

  const inputWrappers = document.getElementsByClassName("input-wrapper");
  for (wrapper of inputWrappers) {
    const clientWidth = wrapper.clientWidth;
    const inputs = wrapper.children;
    for (input of inputs) {
      // console.log(input.width)
      input.style.width = (clientWidth / inputs.length).toString() + "px";
    }
  }
}
