<?php
    include('database.php');

    $query = "SELECT * FROM task";
    $result = mysqli_query($connection, $query);

    if(!$result){
        die('Query failed.');
    }

    $json = array();

    while($row = mysqli_fetch_array($result)){
        $json[] = array(
            'name' => $row['nombre'],
            'description' => $row['descripcion'],
            'id' => $row['id']
        );
    }

    $jsonstring = json_encode($json);
    echo $jsonstring;
?>