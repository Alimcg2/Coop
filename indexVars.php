<?php

// here are some variables for the home page that you can change

// for the projects:

$projects[] = [
    "projectTitle1" => getTextFromFile("projectTitle1"),
    "projectDescr1" => getTextFromFile("projectDescr1"),

    "projectTitle2" => getTextFromFile("projectTitle2"),
    "projectDescr2" => getTextFromFile("projectDescr2"),

    "projectTitle3" => getTextFromFile("projectTitle3"),
    "projectDescr3" => getTextFromFile("projectDescr3"),

    "projectTitle4" => getTextFromFile("projectTitle4"),
    "projectDescr4" => getTextFromFile("projectDescr4"),
];

// mission statement
$mission[] = [
    "missionStatement" => getTextFromFile("missionStatement")
];


function getTextFromFile($type){
    $allText = file("allVaraibles.txt");
    foreach ($allText as $line) {
        $splitup = split("=", $line);
        if ($splitup[0] == $type) {
            return $splitup[1];
        }
    }
}
?>

