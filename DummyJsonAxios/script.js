let tampil = document.querySelector("#tampil");
let bar = document.querySelector("#bar");
let catgs = document.querySelector("#cat");
let cart = document.querySelector("#cart");

//GET PRODUCTS

function getData() {
    axios.get("https://dummyjson.com/products").then(function (response) {
        let produk = response.data.products;
        let out = `<table class="table">
        </thead>
            <tr>
                <th>ID</th>
                <th>PRODUCTS</th>
                <th>DESCRIPTION</th>
                <th>PRICE<th>
            </tr>
        </thead>
        <tbody>`

        produk.forEach(el => {
            out += `<tr>
                <td>${el.id}</td>
                <td>${el.title}</td>
                <td>${el.description}</td>
                <td>${el.price}</td>
                <td><button class="btn btn-outline-warning" onclick="showUpdate(${el.id})" data-bs-toggle="modal" data-bs-target="#product-modalup">UPDATE</button></td>
                <td><button class="btn btn-outline-danger" onclick="deleteData(${el.id})">DELETE</button></td>
                <td><button class="btn btn-outline-success" onclick="cartData(${el.id})">CART</button></td>
            </tr>`;
        });

        out += `</tbody></table>`;
        tampil.innerHTML = out;
    })
}

//SHOW PRODUCTS CATS

function showData() {
    axios.get("https://dummyjson.com/products/categories").then(function (response) {
        out = "";
        let cat = response.data;
        // console.log(cat);
        cat.forEach(el => {
            out += `<button class="btn btn-outline-primary m-1" id="btn-cats" onclick="filterData('${el}')">${el}</button>`;
        });
        bar.innerHTML = out;
    })
}

//FILTER PRODUCTS CATS

function filterData(el) {
    // console.log(el)

    axios.get("https://dummyjson.com/products/category/" + el).then(function (response) {
        let produk = response.data.products
        // console.log(produk);
        out = `<table class="table">
        </thead>
            <tr>
                <th>ID</th>
                <th>PRODUCTS</th>
                <th>DESCRIPTION</th>
            </tr>
        </thead>
        <tbody>`
        produk.forEach(el => {
            out += `<tr>
            <td>${el.id}</td>
            <td>${el.title}</td>
            <td>${el.description}</td>
        </tr>`;
        });
        out += `</tbody></table>`;
        tampil.innerHTML = out;
    })

}

//FORM PRODUCTS CATS

function formProd() {
    let out = `<option selected>Choose Category...</option>`;
    axios.get("https://dummyjson.com/products/categories").then(function (response) {
        // console.log(response);
        let cat = response.data;
        cat.forEach(el => {
            out += `<option value="${el}">${el}</option>`
        });
        catgs.innerHTML = out;

    })
}

//POST PRODUCTS

function postData() {
    let data = {
        title: document.getElementById("title").value,
        description: document.getElementById("des").value,
        category: document.getElementById("cat").value
    };
    axios.post("https://dummyjson.com/products/add", JSON.stringify(data)).then(function (response) {
        console.log(data)
    })

}

//SHOW UPDATE PRODUCTS

function showUpdate(id) {
    axios.get("https://dummyjson.com/products/" + id).then(function (response) {
        document.querySelector("#idu").value = response.data.id;
        document.querySelector("#titleu").value = response.data.title;
        document.querySelector("#desu").value = response.data.description;
        // document.querySelector("#catu").value = response.data.category;
        // console.log(response);
    })
}

//UPDATE PRODUCTS

function updateData() {
    let id = document.getElementById("idu").value;
    let data = {
        id: document.getElementById("idu").value,
        title: document.getElementById("titleu").value,
        description: document.getElementById("desu").value,
        // category: document.getElementById("catu").value
    };
    axios.put("https://dummyjson.com/products/" + id, JSON.stringify(data)).then(function (response) {
        console.log(data);
    })
}

//UPDATE FORM

// DELETE PRODUCTS

function deleteData(id) {
    let data = {
        id: id
    };
    axios.delete("https://dummyjson.com/products/" + id, JSON.stringify(data)).then(function (response) {
        console.log("id " + id + " Has Been Deleted")
    })
}


//PELANGGAN PART~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


//GET DATA PELANGGAN

function getDatapelanggan() {
    axios.get("http://localhost/DummyJsonV3/php/get.php").then(function (response) {
        let pelanggan = response.data;
        let out = `<table class="table">
        </thead>
            <tr>
                <th>ID</th>
                <th>PELANGGAN</th>
                <th>ALAMAT</th>
                <th>TELP</th>
            </tr>
        </thead>
        <tbody>`

        pelanggan.forEach(el => {
            out += `<tr>
                <td>${el.idpelanggan}</td>
                <td>${el.pelanggan}</td>
                <td>${el.alamat}</td>
                <td>${el.telp}</td>
                <td><button class="btn btn-outline-warning" 
                onclick="showUpdatepelanggan(${el.idpelanggan})"
                data-bs-toggle="modal" data-bs-target="#pelanggan-modalup">UPDATE</button></td>
                <td><button class="btn btn-outline-danger" 
                onclick="deleteDatapelanggan(${el.idpelanggan})">DELETE</button></td>
                <td><button class="btn btn-outline-success" onclick="cartPelanggan(${el.idpelanggan})">CART</button></td>
            </tr>`;
        });

        out += `</tbody></table>`;
        tampil.innerHTML = out;
    })
}

// ADD PELANGGAN

function addDatapelanggan() {
    let data = {
        pelanggan: document.getElementById("pelanggan").value,
        alamat: document.getElementById("alamat").value,
        telp: document.getElementById("telp").value
    };
    axios.post("http://localhost/DummyJsonV3/php/add.php", JSON.stringify(data)).then(function (response) {
        alert(response.data);
        getDatapelanggan();
    })
}

// SHOW UPDATE PELANGGAN

function showUpdatepelanggan(idpelanggan) {
    let data = {
        idpelanggan: idpelanggan
    };
    axios.post("http://localhost/DummyJsonV3/php/selectupdate.php", JSON.stringify(data)).then(function (response) {
        document.getElementById("idupel").value = response.data.idpelanggan;
        document.getElementById("pelangganup").value = response.data.pelanggan;
        document.getElementById("alamatup").value = response.data.alamat;
        document.getElementById("telpup").value = response.data.telp;
    })
}

// UPDATE PELANGGAN

function updateDatapelanggan() {
    let datapelanggan = {
        idpelanggan: document.getElementById("idupel").value,
        pelanggan: document.getElementById("pelangganup").value,
        alamat: document.getElementById("alamatup").value,
        telp: document.getElementById("telpup").value,
    };
    axios.post("http://localhost/DummyJsonV3/php/update.php", JSON.stringify(datapelanggan)).then(function (response) {
        alert(response.data);
        getDatapelanggan();
    })
}

// DELETE PELANGGAN

function deleteDatapelanggan(idpelanggan) {
    let data = {
        idpelanggan: idpelanggan
    }
    axios.post("http://localhost/DummyJsonV3/php/delete.php", JSON.stringify(data)).then(function (response) {
        alert(response.data);
        getDatapelanggan();
    })
}

//ORDER PART~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//CART

function cartData(id) {
    axios.get("https://dummyjson.com/products/" + id).then(function (response) {
        // console.log(response);
        let product = response.data;
        let out = '<h3 class="display-5">SHOPPING CART</h3>';
        out += `<table class="table">
        <thead>
            <tr>
                <th>ID</th>
                <th>TITLE</th>
                <th>PRICE</th>
                <th>PURCHASED BY</th>
                <th>AMOUNT</th>
            </tr>
        </thead>
        <tbody>`

        out += `<tr>
            <td>${product.id}</td>
            <td>${product.title}</td>
            <td>${product.price}</td>
            <td id="ordered"></td>
            <td><input type="number" id="amount"></td>
            <td><button class="btn btn-outline-success" onclick="finalCheckout('${product.id}','${product.price}','${product.title}')">CHECKOUT</button></td>
        </tr>`;
        out += `</tbody></table>`
        cart.innerHTML = out;
    })
}

//ORDER BY

let idpel = "";
let namapel = "";
let alamatpel = "";
function cartPelanggan(idpelanggan) {
    axios.get("http://localhost/DummyJsonV3/php/selectwhere.php/?id=" + idpelanggan).then(function (response) {
        // console.log(response);
        idpel = response.data.idpelanggan;
        namapel = response.data.pelanggan;
        alamatpel = response.data.alamat;

        let out = `<tr>
            <td>${idpel}</td>
            <td>${namapel}</td>
            <td>${alamatpel}</td>
        </tr>`;
        document.querySelector("#ordered").innerHTML = out;
    })
}

//CHECKOUT & INSERT INTO DBASE

function finalCheckout(idproduct, price, product) {
    let idorder = 1;
    let amount = document.getElementById("amount").value;
    let data = {
        idorder: idorder,
        idbarang: idproduct,
        jumlah: amount,
        harga: price,
        barang: product,
        idpelanggan: idpel,
        pelanggan: namapel,
        alamat: alamatpel,
    };
    axios.post("http://localhost/DummyJsonV3/php/addtocart.php", JSON.stringify(data)).then(function (response) {
        // console.log(response);
        alert(response.data);
    })
}
