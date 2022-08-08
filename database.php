<?php

$connection = mysqli_connect('localhost:33065', 'root', '', 'tasks-app');

if($connection){
    //echo 'Conected';
}else{
    echo 'Error';
}

?>