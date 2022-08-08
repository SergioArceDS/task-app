<?php

    include('database.php');
    if(isset($_POST['name'])){
        
        $name = $_POST['name'];
        $description = $_POST['description'];

        $query = "INSERT INTO task(nombre, descripcion) VALUES('$name', '$description')";
        $result = mysqli_query($connection, $query);

        if(!$result){
            die('Query failed.');
        }

        echo 'Task Added Successfully';
    }
?>