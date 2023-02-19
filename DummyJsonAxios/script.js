let tampil = document.querySelector("#tampil");
let bar = document.querySelector("#bar");
let catgs = document.querySelector("#cat");

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
            out += `<button class="btn btn-outline-primary m-1" id="btn-cats" value="${el}" onclick="filterData()">${el}</button>`;
        });
        bar.innerHTML = out;
    })
}

//FILTER PRODUCTS CATS

// let cat = document.getElementById("btn-cats");
// let cats = cat.value;
// console.log(cats);

function filterData() {

    let cat = document.getElementById("btn-cats");
    let cats = cat.value;
    console.log(cats);

    axios.get("https://dummyjson.com/products/category/" + cats).then(function (response) {
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
        document.querySelector("#catu").value = response.data.category;
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
        category: document.getElementById("catu").value
    };
    axios.put("https://dummyjson.com/products/" + id, JSON.stringify(data)).then(function (response) {
        console.log(data);
    })
}

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