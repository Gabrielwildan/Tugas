<?php

require_once "connector.php";

$id = $_GET["id"];

$sql = "SELECT * FROM tblpelanggan WHERE idpelanggan = $id";
$result = mysqli_query($con, $sql);

if (mysqli_num_rows($result) > 0) {
    // $data = array();
    // while ($row = mysqli_fetch_assoc($result)) {
    //     $data[] = $row;
    // }
    $row = mysqli_fetch_assoc($result);
    // $data[] = $row;
}

echo json_encode($row);
