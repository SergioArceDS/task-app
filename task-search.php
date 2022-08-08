<?php

    include('database.php');
    if(isset($_POST['search'])){
        $search  = $_POST['search'];

        if(!empty($search)){
            $query = "SELECT * FROM task WHERE nombre LIKE '$search%'";
            $result = mysqli_query($connection, $query);

            if(!$result){
                die('Query Error');
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
        }
    }
?>