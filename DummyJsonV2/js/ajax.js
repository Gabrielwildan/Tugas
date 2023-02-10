const baseUrl = "https://dummyjson.com";

function getData() {
    let out;
    $.ajax({
        type: "get",
        url: baseUrl + "/products",
        data: "contentType",
        dataType: "json",
        success: function (response) {
            // console.log(response);

            out = `<tr>
            <th>TITLE</th>
            <th>DESCRIPTION</th>
            <tr>`;

            $.each(response.products, function (key, val) {
                out += `<tr>
                    <td>${val.title}</td>
                    <td>${val.description}</td>
                 </tr>`
            });
            document.querySelector('#table').innerHTML = out
        }
    });
}
document.querySelector("#get").addEventListener('click', getData);

function showData() {
    let out = "";
    $.ajax({
        type: "get",
        url: baseUrl + "/products/categories",
        data: "contentType",
        dataType: "json",
        success: function (response) {
            // console.log(response);
            $.each(response, function (key, val) {
                out += `<button type="button" class="btn btn-outline-primary m-1" id='filter' value ='${val}'>${val}</button>`;
            });
            document.querySelector('#isi').innerHTML = out
        }
    });
}
document.querySelector('#show').addEventListener('click', showData);

function filterData(cat) {
    let out = "";
    $.ajax({
        type: "get",
        url: baseUrl + "/products/category/" + cat,
        data: "contentType",
        dataType: "json",
        success: function (response) {
            // console.log(response);
            $.each(response.products, function (key, val) {
                out += `<tr>
                <td>${val.title}</td>
                <td>${val.description}</td>
                <td><button type="button" id="btn-update" class="btn btn-outline-warning" 
                data-bs-toggle="modal" data-bs-target="#exampleModal" data-id = ${val.id}>Update</button></td>
                 <td><button type="button" id="btn-delete" class="btn btn-outline-danger" data-id = ${val.id}>Delete</button></td>
             </tr>`;
            });
            document.querySelector("#table").innerHTML = out;
        }
    });
}

$(document).on("click", "#filter", function (e) {
    let cat = $(this).attr("value");
    filterData(cat);
})

function form() {
    let out = '<option selected>Choose...</option>';
    $.ajax({
        type: "get",
        url: baseUrl + "/products/categories",
        Cache: false,
        data: "contentType",
        dataType: "json",
        success: function (response) {
            $.each(response, function (key, val) {
                out += `<option value='${val}'>${val}</option>`;
            });
            $("#cat").html(out);
        }
    });
}

$("#post").click(function (e) {
    e.preventDefault();
    form();

});

function addData() {
    let data = {
        title: title,
        description: description,
        category: category,
    };

    $.ajax({
        type: "POST",
        url: baseUrl + "/products/add",
        data: "contentType",
        dataType: "application/json",
        success: function (response) {
            JSON.stringify({
                title: data["title"],
                description: data["description"],
                category: data["category"]
            })
        }
    })

        .then(res => res.json())
        .then(console.log(data))
        .then(alert(data["title"] + " Added"))

}

$("#save").click(function (e) {
    e.preventDefault();
    id = $("#id").val();
    title = $("#title").val();
    description = $("#des").val();
    category = $("#cat").val();

    if (id) {
        updateData(id)
    } else {
        addData()
    }
});

function selectUpdateData(id) {
    $.ajax({
        type: "get",
        url: baseUrl + "/products/" + id,
        data: "contentType",
        dataType: "json",
        success: function (response) {
            $("#id").val(response.id);
            $("#title").val(response.title);
            $("#des").val(response.description);
            $("#cat").val(response.category);
        }
    });
}

function updateData(id) {

    let data = {
        title: title,
        description: description,
        category: category,
    };

    $.ajax({
        type: "patch",
        url: baseUrl + "/products/" + id,
        contentType: "application/json",
        data: JSON.stringify({
            title: data["title"],
            description: data["description"],
            category: data["category"]
        }),
        success: function (response) {
            console.log(response);
            console.log(data);
            alert(data["title"] + " update")
        }
    });
}

$(document).on("click", "#btn-update", function (e) {
    let id = $(this).attr("data-id");
    $("#exampleModalLabel").html("update Data")
    form();
    selectUpdateData(id);
});

function deleteData(id) {

    $.ajax({
        type: "DELETE",
        url: baseUrl + "/products/" + id,
        success: function (response) {
            console.log(response)
            alert("Deleted");
        }
    });
}


$(document).on("click", "#btn-delete", function (e) {
    let id = $(this).attr("data-id");
    deleteData(id);
});

//pelanggan part

function getDatapelanggan() {
    $.ajax({
        type: "get",
        url: "php/get.php",
        cache: false,
        dataType: "json",
        success: function (response) {
            let out = `<thead><tr>
            <th>Nama</th>
            <th>Alamat</th>
            <th>Telp</th>
            </tr></thead>`;
            $.each(response, function (key, val) {
                out += `
                <tr>
                    <td>${val.pelanggan}</td>
                    <td>${val.alamat}</td>
                    <td>${val.telp}</td>
                    <td>
                    <button type="button" id="btn-updatepelanggan" class="btn btn-outline-warning" value="${val.idpelanggan}">Update</button>
                    <button type="button" id="btn-deletepelanggan" class="btn btn-outline-danger" value="${val.idpelanggan}">Delete</button>
                    </td>
                 </tr>`;
            });
            $("#table").html(out);
        }
    });
}

$("#get-pelanggan").click(function (e) {
    e.preventDefault();
    getDatapelanggan();
});

function formpelanggan() {
    let out = `
    <input class="form-control" type="text" id="id">

    <label class="form-label mt-4">Name</label>
    <input class="form-control" type="text" id="pelanggan">

    <label class="form-label mt-4">Alamat</label>
    <input class="form-control" type="text" id="alamat">

    <label class="form-label mt-4">Telp</label>
    <input class="form-control" type="text" id="telp">

    <input class="btn btn-outline-primary mt-4" type="submit" id="submit-pel" value="Save">`;
    $("#isi").html(out);
}

$("#post-pelanggan").click(function (e) {
    e.preventDefault();
    formpelanggan();
});

function addDatapelanggan() {
    let dataPelanggan = {
        pelanggan: pelanggan,
        alamat: alamat,
        telp: telp
    }
    $.ajax({
        type: "post",
        url: "php/add.php",
        cache: false,
        data: JSON.stringify(dataPelanggan),
        success: function (response) {
            alert(response);
        }
    });
}

// $(document).on("click", "#submit-pel", function () {
//     pelanggan = $("#pelanggan").val();
//     alamat = $("#alamat").val();
//     telp = $("#telp").val();

//     if (id) {
//         updateDatapelanggan(id);
//     } else {
//         addDatapelanggan();
//     }
// });

function selectUpdatepelanggan(id) {
    let idpelanggan = {
        idpelanggan: id
    }
    $.ajax({
        type: "post",
        url: "php/selectupdate.php",
        cache: false,
        data: JSON.stringify(idpelanggan),
        success: function (response) {

            let data = JSON.parse(response)

            $("#id").val(data.idpelanggan);
            $("#pelanggan").val(data.pelanggan);
            $("#alamat").val(data.alamat);
            $("#telp").val(data.telp);
        }
    });
}

function updateDatapelanggan(id) {
    let data = {
        idpelanggan: id,
        pelanggan: pelanggan,
        alamat: alamat,
        telp: telp
    };
    $.ajax({
        type: "post",
        url: "php/update.php",
        cache: false,
        data: JSON.stringify(data),
        dataType: "dataType",
        success: function (response) {
            alert(response);
        }
    });
}

$(document).on("click", "#btn-updatepelanggan", function () {
    let id = $(this).attr("value");
    formpelanggan();
    selectUpdatepelanggan(id);
    // alert(id);
});

$(document).on("click", "#submit-pel", function () {
    id = $("#id").val();
    pelanggan = $("#pelanggan").val();
    alamat = $("#alamat").val();
    telp = $("#telp").val();

    if (id) {
        updateDatapelanggan(id);
    } else {
        addDatapelanggan();
    }

});

function deleteDatapelanggan(id) {
    let idpelanggan = {
        idpelanggan: id
    }

    $.ajax({
        type: "post",
        url: "php/delete.php",
        cache: false,
        data: JSON.stringify(idpelanggan),
        // dataType: "dataType",
        success: function (response) {
            alert(response)
        }
    });
}

$(document).on("click", "#btn-deletepelanggan", function () {
    let id = $(this).attr("value");
    deleteDatapelanggan(id);
});