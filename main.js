const pantalla = document.querySelector(".pantalla");
const botones = document.querySelectorAll(".button-action");
var estado = "DEC";
botones.forEach((boton) => {
  boton.addEventListener("click", () => {
    const botonApretado = boton.textContent;
    if (botonApretado === "HEXA") {
      enableButtonsHexa();
      estado = "HEXA";
      return;
    }
    if (botonApretado === "OCTA") {
      enableButtonsOcta();
      estado = "OCTA";
      return;
    }
    if (botonApretado === "BIN") {
      enableButtonBin();
      estado = "BIN";
      return;
    }
    if (botonApretado === "DEC") {
      enableButtonDec();
      estado = "DEC";
      return;
    }
    if (boton.id === "ac") {
      pantalla.textContent = "";
      return;
    }
    if (boton.id === "dell") {
      pantalla.textContent = pantalla.textContent.slice(0, -1);
      return;
    }
    /* aqui resolvemos el problema */
    if (boton.id === "igual") {
      let respuesta = solution(pantalla.textContent);
      if (isHexa(respuesta)) {
        pantalla.textContent = respuesta.toUpperCase();
      } else {
        pantalla.textContent = respuesta;
      }
      return;
    }
    pantalla.textContent += botonApretado;
  });
});
//---------- button fuctions ----------
/**
 * funcion que me habilia los botones
 * que estan hexadecimal
 */
function enableButtonsHexa() {
  const buttonsToHexa = document.querySelectorAll(".button-action");
  buttonsToHexa.forEach((button) => {
    button.removeAttribute("disabled");
  });
}
/**
 * funcuion que me habilita y deshabilita
 * los botones par que funcione como octa
 */
function enableButtonsOcta() {
  const buttonsToHexa = document.querySelectorAll(".button-action.hexa");
  const buttonsToOcta = document.querySelectorAll(".button-action.octa");
  const buttonsToDec = document.querySelectorAll(".button-action.dec");
  buttonsToHexa.forEach((button) => {
    button.setAttribute("disabled", "");
  });
  buttonsToDec.forEach((button) => {
    button.setAttribute("disabled", "");
  });
  buttonsToOcta.forEach((button) => {
    button.removeAttribute("disabled");
  });
}
/**
 * funcion que habilita y deshabilita
 * los botes para quen funcione como
 * binario
 */
function enableButtonBin() {
  const buttonsToBin = document.querySelectorAll(".button-action.bin");
  const buttonsToHexa = document.querySelectorAll(".button-action.hexa");
  const buttonsToDec = document.querySelectorAll(".button-action.dec");
  buttonsToHexa.forEach((button) => {
    button.setAttribute("disabled", "");
  });
  buttonsToDec.forEach((button) => {
    button.setAttribute("disabled", "");
  });
  buttonsToBin.forEach((button) => {
    button.removeAttribute("disabled");
  });
}
/**
 * funcion que habilita y deshbilita
 * botones para que funciones como
 * decimal
 */
function enableButtonDec() {
  const buttonsToHexa = document.querySelectorAll(".button-action.hexa");

  buttonsToHexa.forEach((button) => {
    button.setAttribute("disabled", "");
  });
  const buttonsToDec = document.querySelectorAll(".button-action.dec");
  buttonsToDec.forEach((button) => {
    button.removeAttribute("disabled");
  });
}
//---------- solution functions ----------
/**
 *
 * @param {*} value texto a evaluar
 * funcion que soluciona la operacion
 * @returns
 */
function solution(value) {
  if (value === null || value.trim() === "") {
    return null;
  }
  if (estado === "BIN") {
    return solutionPolanca(value, 2);
  }
  if (estado === "OCTA") {
    return solutionPolanca(value, 8);
  }
  if (estado === "HEXA") {
    return solutionPolanca(value, 16);
  }
  if (estado === "DEC") {
    return solutionPolanca(value, 10);
  }
}
//---------- verification functions ----------
/**
 * funcion que verifica si
 * es un operacin en binario
 */
function isBinary(value) {
  let invalidValues = "ABCDEF23456789";
  for (let character of value) {
    if (invalidValues.includes(character)) {
      return false;
    }
  }
  return true;
}
/**
 * funcion que verifica si
 * es una operacion en octa
 */
function isOcta(value) {
  let invalidValues = "ABCDEF9";
  for (let character of value) {
    if (invalidValues.includes(character)) {
      return false;
    }
  }
  return true;
}
/**
 * funcion que verifica si
 * es un operacion en hexa
 */
function isHexa(value) {
  let validValues = "ABCDEFabcdef";
  for (let character of value) {
    if (validValues.includes(character)) {
      return true;
    }
  }
  return false;
}
/**
 * funcion que verifica si
 * si la operacion es Dec
 */
function isDec(value) {
  let invalidValues = "ABCDEF";
  for (let character of value) {
    if (invalidValues.includes(character)) {
      return false;
    }
  }
  return true;
}
// ---------- results functions ----------
const colaElementos = [];
/**
 *
 * @param {*} value tipo de operacion
 *  a realizar
 * @returns
 * funcion que retoran el resultado
 *
 */
function Operacion(colaElementos, base) {
  const Pila = [];

  while (colaElementos.length > 0) {
    const valor = colaElementos.shift();
    if (esSigno(valor)) {
      const y = Pila.pop();
      const x = Pila.pop();
      const z = Solucion(x, y, valor, base);
      Pila.push(z);
    } else {
      Pila.push(valor);
    }
  }

  return Pila.pop();
}
/**
 *
 * @param {*} x primer operador
 * @param {*} y segundo operador
 * @param {*} oper  tipo de operacion
 * @returns
 *  funcion que verifica que tipo de operacio
 *  en y la resuelve
 */
function Solucion(x, y, oper, base) {
  let a = parseInt(x, base);
  let b = parseInt(y, base);
  let resultado = 0;
  if (oper === "+") {
    resultado = a + b;
  }
  if (oper === "-") {
    resultado = a - b;
  }
  return resultado.toString(base);
}
/**
 *
 * @param {*} expresion
 * funcion que convierte un exprecion normal
 * a la notacion polanca inversa
 */
function solutionPolanca(expresion, tipo) {
  let pal = "";
  const colaElementos = [];
  const pilaSignos = [];

  for (let i = 0; i < expresion.length; i++) {
    let valor = expresion.charAt(i);

    while (i < expresion.length && !esSigno(valor) && !esParentesis(valor)) {
      pal += valor;
      i++;
      if (i < expresion.length) {
        valor = expresion.charAt(i);
      }
    }

    if (pal !== "") {
      colaElementos.push(pal);
      pal = "";
    }

    if (esSigno(valor)) {
      pilaSignos.push(valor);
    }

    if (valor === "(") {
      pilaSignos.push(valor);
    }

    if (valor === ")") {
      let valorAuxiliar = pilaSignos.pop();
      while (valorAuxiliar !== "(") {
        colaElementos.push(valorAuxiliar);
        valorAuxiliar = pilaSignos.pop();
      }
    }
  }

  while (pilaSignos.length > 0) {
    colaElementos.push(pilaSignos.pop());
  }
  return Operacion(colaElementos, tipo);
}
/**
 *
 * @param {*} d
 * funcion que devuelve que tipo de operador es
 * @returns
 */
function esSigno(d) {
  return ["+", "-", "*", "/", "^"].includes(d);
}
/**
 *
 * @param {*} d
 * funcion que devuelve si es parentesis o no
 * @returns
 */
function esParentesis(d) {
  return d === "(" || d === ")";
}
