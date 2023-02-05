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
                <td><button type="button" id="btn-update" class="btn btn-outline-warning">Update</button></td>
                 <td><button type="button" id="btn-delete" class="btn btn-outline-danger">Delete</button></td>
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
    fetch(baseUrl + "/products/add", {
        method: "POST",
        headers: { 'Cotent-Type': 'application/json' },
        body: JSON.stringify({
            title: data["title"],
            description: data["description"],
            category: data["category"]
        })
    })
        .then(res => res.json())
        .then(console.log(data))
        .then(alert(data["title"] + " Added"))
}

$("#save").click(function (e) {
    e.preventDefault();
    title = $("#title").val();
    description = $("#des").val();
    category = $("#cat").val();

    addData()
});

// function updateData(id, title, description, category) {
//     let Data = {
//         id: id,
//         title: title,
//         description: description,
//         category: category
//     }
//     fetch(baseUrl + "/products/" + id, {
//         method: 'GET',
//         headers: { 'contentType': 'application/json' },
//         body: JSON.stringify({
//             // id: Data["id"],
//             // title: Data["title"],
//             // description: Data["description"],
//             // category: Data["category"]

//             id: $("#id").val(Data.id),
//             title: $("#title").val(Data.title),
//             description: $("#des").val(Data.description),
//             category: Data["category"]
//         })
//     })
//         .then(res => res.json())
//         .then(console.log(Data))
// }

// $("#btn-update").click(function (e) {
//     e.preventDefault();

//     // title = $("#title").val();
//     // description = $("#des").val();
//     // category = $("#cat").val();

//     updateData()
// });

function updateData() {
    fetch(baseUrl + "/products/1", {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            title: 'TEST UPDATE',
            description: "TEST UPDATE"
        })
    })
        .then(res => res.json())
        .then(console.log);
}

$("#update").click(function (e) {
    e.preventDefault();
    updateData();

});

function deleteData() {
    fetch(baseUrl + "/products/1", {
        method: 'DELETE',
    })

        .then(res => res.json())
        .then(console.log)
}

$("#delete").click(function (e) {
    e.preventDefault();
    deleteData();
});
