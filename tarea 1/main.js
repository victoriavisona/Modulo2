console.log("iniciando Con JS");
console.log("-----")
//Ejercicio 2.1 (crea variable con tu nombre y edad)
var myName = "Vicky";
console.log(myName);
var age = 19;
console.log(age);
console.log("-----")
//Ejercicio 2.2 (crea variable con la edad de ignasi)
var ignasiAge = 32;
console.log(ignasiAge);
console.log("-----")
//Ejercicio 2.3 (diferencia de edades)
var ageDiff = age-ignasiAge;
console.log(ageDiff);
console.log("-----")
//Ejercicio 2.4 (crear condicionales para ver si eres mayor o menor de edad)
var legalAge = 21;
if(age < legalAge){
    console.log("No eres mayor de 21")
} 
else if(age == legalAge){
    console.log("Tienes 21")
}
else{
    console.log("Eres mayor de 21")
}
console.log("-----")
//Ejercicio 2.5 (crea condicional para comparar edades)
if(age < ignasiAge){
    console.log("No eres mayor que Ignasi")
} 
else if(age == ignasiAge){
    console.log("Tienen la misma edad")
}
else{
    console.log("Eres mayor que Ignasi")
}
console.log("-----")
//Ejercicio 3.1 (crea un array con los nombres de tu curso)
var classname = ["Aylen", "Azucena", "Camila", "Catalina", "Florencia M", "Florencia", "Janneth", "Jhoelda", "Katerine", "Macarena", "Malena", "Melisa", "Nadine", "Reyna", "Yael", "Andrea", "Belen", "Belen F", "Branko", "Carla", "Carolina", "Flor Belen", "Luana", "Luz", "M Gabriela", "Magali", "Micaela", "Nicole", "Rocio", "Rodrigo", "Veronica", "Yennifer", "Victoria"]
//ordenarlos alfabeticamente
classname.sort()
console.log(classname)
//imprimir el primer y ultimo elemnto
console.log(classname[0])
console.log(classname.length)
console.log(classname[classname.length-1])
// imprimir la consola con un bucle for
function printFullNames(classname){
    for(var i=0; i<classname.length;i++){
    console.log(classname[i])}
}
printFullNames(classname)
console.log("-----")
//Ejericio 3.2 (crea una variable con las edades de la clase)
var ageclass = [18, 21, 20, 19, 25, 23, 20, 26, 22, 18, 21, 24, 19, 20, 18, 25, 23, 18, 32, 49, 21, 22, 19, 20, 25, 19, 21, 23, 18, 26, 23, 21, 19]
console.log(ageclass)
//itera el array con un while y mostra solo edades pares
var i = 0 
while(i<ageclass.length){
    if (ageclass[i]%2==0){
        console.log(ageclass[i])
    }
    i++
}
// cambia el while por el for
for(var i=0; i<ageclass.length; i++){
    if (ageclass[i]%2==0){
        console.log(ageclass[i])
    }
}
console.log("-----")
// Ejercicio 3.3 (crea una funcion que reciba un array como parametro e imprima por consola el menor nro)
var num = [12, 56, 58, 95, 18, 19, 22, 67, 23, 26, 32, 21]
function menorNum(array){
    var menor=array[0];
    for(var i=0; i<array.length; i++){
        if (array[i]<menor){
            menor=array[i];
        }
    }
    console.log("el menor numero del array es "+ menor)
}
menorNum(num)
menorNum(ageclass)
console.log("-----")
// Ejercicio 3.4 (crea una funcion que reciba un array como parametro e imprima por consola el mayor nro)
function mayorNum(array){
    var mayor=array[0];
    for(var i=0; i<array.length;i++){
        if(array[i]>mayor){
            mayor=array[i]
        }
    }
    console.log("el mayor numero del array es " + mayor)
}
mayorNum(num)
mayorNum(ageclass)
console.log("-----")
//Ejercicio 3.5 (crea una funcion que rciba dos parametros, indice y array, e imprima la posicion del array que queramos)
function searchByIndex(array, index){
    console.log(array[index-1])
}
searchByIndex(num, 1)
searchByIndex(ageclass, 1)
console.log("-----")
//Ejercicio 3.6 (crear una funcion que reciba un array como parametro e imprima por consola los valores que se repiten)
var arrayFuncionRepetidos;
arrayFuncionRepetidos=hallanRepetidos(num);
function hallanRepetidos(array){
    var arrayRepetidos=[];
    for (var i=0; i<array.length; i++){
        valorActual=array[i];
        for (var j=0; j<array.length; j++){
            if (valorActual==array[j] && j!=i){
                var valorRepetido= array [j];
                if(arrayRepetidos.indexOf(valorRepetido)==-1){
                    arrayRepetidos.push(valorRepetido);
                }
            }
        }
    }
    return arrayRepetidos;
}
console.log("numeros repetidos " +arrayFuncionRepetidos);
console.log("-----");
//Ejercicio 3.7 (crear una funcion que reciba un array como parametro y concatene todas las palabras en un solo string)
function arrayString(array){
    var frase ="";
    for (var i=0; i<array.length; i++){
        frase +='"';
        frase += array[i];
        frase += '"';
        if (i<array.length-1){
            frase += ', ';
        }
    }
    return frase
}
console.log(arrayString(num));
console.log(arrayString(ageclass));
console.log("-----");
//Ejercicio 4.1 (invertir array)
function reverseString(input){
    var string = "" + input;
    var reverse = [];
    var array = input.split ("");
    var reverse = [];
    for (var i= array.length; i>=0; i--){
        reverse.push(array[i]);
    }
    return reverse.join ("");
}
console.log(reverseString("ESCRIBIENDO"));
console.log(reverseString("32443"));
console.log("-----");
// Ejercicio 4.2 (Orden alfabetico)
function ordenAlfabetico(input){
    var ordenado = " ";
    var string = "" + input;
    var array = string.split("")
    var ordenado = array.sort().join("");
    return ordenado
}
console.log(ordenAlfabetico ("Web Master"));
console.log("-----");
// Ejercicio 4.3 (Cambio a mayuscula)
function letraMayuscula (string){
    var mayuscula = string.split (" ").map((palabra)=>{return palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase()}).join(" ")
    return mayuscula;
}
console.log(letraMayuscula("prince of persia"));
console.log("-----");
//4.4 (Palabra Larga)
function palabraLarga(string){
    var array = string.split (" ");
    var cuentaLetra = 0;
    var palabraLarga = "";
    for (var i = 0; i<array.length; i++){
        if (array [i].length > cuentaLetra){
            cuentaLetra = array [i].length;
            palabraLarga = array [i];
        }
    }
    return palabraLarga
}
console.log(palabraLarga("Web Development Tutorial"));
