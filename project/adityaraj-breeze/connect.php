<?php

    
    
    $conn = mysqli_connect('localhost','root','','form');

    if ($conn->error) {
        die("failed to connectwith database!");
    }else {
        echo "Reservation Successfull!";
    }

    $Name = $_POST['name'];
    $Phone_Number = $_POST['phone'];
    $No_of_person = $_POST['person'];
    $Rdate = $_POST['reservation-date'];
    $Timing = $_POST['timing'];
    $Message = $_POST['message']; 


    $sql = "INSERT INTO `reservation`(`Name`, `Phone_Number`, `Number_Of_Person`, `Reservation_Date`, `Timing`, `Message`) VALUES ('$Name','$Phone_Number','$No_of_person','$Rdate','$Timing','$Message')";

    mysqli_query($conn,$sql);

   
?>



