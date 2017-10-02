<?php

if (isset($_POST["type"])) {
    $type = $_POST["type"];
} else if (isset($_POST["text"])){
    $text = $_POST["text"];
}

$allText = file("allVaraibles.txt");

foreach ($allText as $line) {
   $splitup = split("=", $line);
   if ($splitup[0] == $type) {
       // delete this line
       // add a new line with $type = $text
   }
}


?>