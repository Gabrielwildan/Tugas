let btn = document.querySelectorAll(".btn-angka > button");
let tampil = document.querySelector("#tampil");
let mat = document.querySelectorAll(".btn-mat > button");
let option = null;
let x;
let y;

// console.log(mat);

// tampil.value = btn[5].innerHTML;

// console.log(btn[5].innerHTML);

for (let i = 0; i < btn.length; i++) {
    btn[i].onclick = function () {
        // console.log(btn[i].innerHTML);
        // tampil.value += btn[i].innerHTML;

        if (tampil.value == "0") {
            tampil.value = btn[i].innerHTML;
        } else {
            tampil.value += btn[i].innerHTML;
        }
    }
}

mat[0].onclick = function () {
    tampil.value = "0";
    option = null;
}

mat[1].onclick = function () {
    option = "plus";
    x = tampil.value;
    tampil.value = "0";
}

mat[2].onclick = function () {
    option = "minus";
    x = tampil.value;
    tampil.value = "0";
}

mat[3].onclick = function () {
    option = "multiply";
    x = tampil.value;
    tampil.value = "0";
}

mat[4].onclick = function () {
    option = "divide";
    x = tampil.value;
    tampil.value = "0";
}

mat[5].onclick = function () {
    // option = "equal";
    y = tampil.value;
    tampil.value = kalkulator(option);

}

function kalkulator(option) {
    if (option != null) {
        switch (option) {
            case "plus":
                hasil = parseFloat(x) + parseFloat(y);
                break;

            case "minus":
                hasil = parseFloat(x) - parseFloat(y);
                break;

            case "multiply":
                hasil = parseFloat(x) * parseFloat(y);
                break;

            case "divide":
                hasil = parseFloat(x) / parseFloat(y);
                break;
        }
        return hasil;
    }
}