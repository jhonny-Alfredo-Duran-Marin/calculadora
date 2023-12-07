function borrar() {
  document.getElementById("numeroInput").value = "";
  limpiar();
}

function convertiBinario() {
  let numero = document.getElementById("numeroInput").value;
  if (isBinary(numero) && validar(numero)) {
    binario32bist(numero);
    binario64bist(numero);
  }
}
function convertiDecimal() {
  let numero = document.getElementById("numeroInput").value;
  let binDecimal = "";
  let bin = "";
  let partes = numero.split(".");
  let entero = parseInt(partes[0], 10).toString(2);
  let decimal = parseFloat("0." + partes[0], 10);
  for (let i = 1; i <= 52; i++) {
    decimal = decimal * 2;
    if (decimal >= 1) {
      let aux = parseInt(decimal.toString().split(".")[0], 10);
      decimal = decimal - aux;
      binDecimal = binDecimal + "1";
    } else {
      binDecimal = binDecimal + "0";
    }
  }
  bin = entero + "." + binDecimal;
  if (validar(bin)) {
    binario32bist(bin);
    binario64bist(bin);
  }
}
function binario32bist(numero) {
  //-- calculamos el signo
  let signo = "";
  if (numero[0] === "-") {
    signo = "1";
  } else {
    signo = "0";
  }
  // -- movemos el punto ---------------
  let resultado = "";
  let recorrido = 0;
  let expo = "";
  let mantisa = "";
  let cadenaBinaria = "";
  let posPunto = numero.indexOf(".");
  let posPrimero = numero.indexOf("1");
  cadenaBinaria = numero.split(".").join("");
  if (posPrimero < posPunto) {
    recorrido = posPunto - posPrimero - 1;
    cadenaBinaria =
      cadenaBinaria[posPrimero] + "." + cadenaBinaria.slice(posPrimero + 1);
  } else {
    cadenaBinaria =
      cadenaBinaria[posPrimero - 1] + "." + cadenaBinaria.slice(posPrimero);
    recorrido = -(posPunto - posPrimero);
  }
  //--- calculamos el exponente ---------
  expo = (recorrido + 127).toString(2);
  if (expo.length < 8) {
    expo = "0" + expo;
  }
  //---- calculamos la matisa ----------
  posPunto = cadenaBinaria.indexOf(".") + 1;
  for (let i = 1; i <= 23; i++) {
    if (posPunto < cadenaBinaria.length) {
      mantisa = mantisa + cadenaBinaria[posPunto];
      posPunto++;
    } else {
      mantisa = mantisa + "0";
    }
  }
  resultado = signo + expo + mantisa;
  const lsigno = document.getElementById("sig32");
  const lexponente = document.getElementById("expo32");
  const lmantisa = document.getElementById("mant32");
  lsigno.textContent = signo;
  lexponente.textContent = expo;
  lmantisa.textContent = mantisa;
}
function binario64bist(numero) {
  //-- calculamos el signo
  let signo = "";
  if (numero[0] === "-") {
    signo = "1";
  } else {
    signo = "0";
  }
  // -- movemos el punto ---------------
  let resultado = "";
  let recorrido = 0;
  let expo = "";
  let mantisa = "";
  let cadenaBinaria = "";
  let posPunto = numero.indexOf(".");
  let posPrimero = numero.indexOf("1");
  cadenaBinaria = numero.split(".").join("");
  if (posPrimero < posPunto) {
    recorrido = posPunto - posPrimero - 1;
    cadenaBinaria =
      cadenaBinaria[posPrimero] + "." + cadenaBinaria.slice(posPrimero + 1);
  } else {
    cadenaBinaria =
      cadenaBinaria[posPrimero - 1] + "." + cadenaBinaria.slice(posPrimero);
    recorrido = -(posPunto - posPrimero);
  }
  console.log(cadenaBinaria);
  //--- calculamos el exponente ---------
  expo = (recorrido + 1023).toString(2);
  if (expo.length < 11) {
    expo = "0" + expo;
  }
  //---- calculamos la matisa ----------
  posPunto = cadenaBinaria.indexOf(".") + 1;
  for (let i = 1; i <= 52; i++) {
    if (posPunto < cadenaBinaria.length) {
      mantisa = mantisa + cadenaBinaria[posPunto];
      posPunto++;
    } else {
      mantisa = mantisa + "0";
    }
  }
  resultado = signo + expo + mantisa;
  const lsigno = document.getElementById("sig64");
  const lexponente = document.getElementById("expo64");
  const lmantisa = document.getElementById("mant64");
  lsigno.textContent = signo;
  lexponente.textContent = expo;
  lmantisa.textContent = mantisa;
}
function validar(value) {
  if (value.split(".").length - 1 > 1) {
    return false;
  }
  return true;
}
function isBinary(value) {
  let invalidValues = "ABCDEF23456789";
  for (let character of value) {
    if (invalidValues.includes(character)) {
      return false;
    }
  }
  return true;
}
function limpiar(){
    const signo = document.getElementById("sig32");
    const exponente = document.getElementById("expo32");
    const mantisa = document.getElementById("mant32");
    signo.textContent = ""
    exponente.textContent = "";
    mantisa.textContent = "";
    const lsigno = document.getElementById("sig64");
    const lexponente = document.getElementById("expo64");
    const lmantisa = document.getElementById("mant64");
    lsigno.textContent = "";
    lexponente.textContent = "";
    lmantisa.textContent = "";
}