<?php
    include('database.php');

    $name =  $_POST['name'];
    $description = $_POST['description'];
    $id=  $_POST['id'];

    $query = "UPDATE task SET nombre = '$name', descripcion = '$description' WHERE id = '$id'";

    $result = mysqli_query($connection, $query);

    if(!$result){
        die('Query failed.');
    }

    echo 'Task updated successfully';
?>