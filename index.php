<?php
include("indexVars.php");
?>

<!DOCTYPE html>
<html>
<head>
	<link rel='stylesheet' type='text/css' href='index.css'>
	<title>UW Student Food Coop</title>
	<link href='https://fonts.googleapis.com/css?family=Raleway:200,400' rel='stylesheet'>
	<script type='text/javascript' src='index.js'></script>
</head>
<body>
	<header>
		<a href='index.html'>Home</a>
		<a href='about.html'>About</a>
		<a href='recipes.html'>Recipes</a>
		<a href='bulk.html'>Bean Basket</a>
		<a href='involved.html'>Get Involved</a>
	</header>
	<div id='title'>
		<h1 id='asuw'>ASUW</h1> <img id='logo' src='Images/logoWhite.png'> <h1 id='sfc'>SFC</h1> 
		<p id='titleText'>University of Washington Student Food Cooperative</p>
	</div>
	<img id='first' class='side' src='Images/mushroom.png'></img>
	<section id='values'>
		<h2 id='valueTitle'>Our Values</h2>
		<div id='valueArea'>
			<div class='value'>
				<img id='ethical' src='Images/ethical2.jpg'>
				<p>Ethical</p>
				<button id='moreEthical'>Learn More</button>
			</div>
			<div class='value'>
				<img id='sustain' src='Images/sustainable2.jpg'>
				<p>Sustainable</p>
				<button id='moreSustainable'>Learn More</button>
			</div>
			<div class='value'>
				<img id='coop' src='Images/cooperative2.jpg'>
				<p>Cooperative</p>
				<button id='moreCooperative'>Learn More</button>
			</div>
	</section>
	<img id='second' class='side' src='Images/walnut.png'>
	<section id='projects'>
		<h2 id='projectTitle'>Our Projects</h2>
		<div id='projectFlex'>
			<div class='project'>
				<p><?php echo $projects[0]["projectDescr1"] ?></p>
				<h3><?php echo $projects[0]["projectTitle1"] ?></h3>
			</div>
			<div class='project'>
				<h3><?php echo $projects[0]["projectTitle2"] ?></h3>
				<p><?php echo $projects[0]["projectDescr2"] ?></p>
			</div>
			<div class='project'>
				<p><?php echo $projects[0]["projectDescr3"] ?></p>
				<h3><?php echo $projects[0]["projectTitle3"] ?></h3>
			</div>
			<div class='project'>
				<h3><?php echo $projects[0]["projectTitle4"] ?></h3>
				<p><?php echo $projects[0]["projectDescr4"] ?></p>
			</div>
		</div>
	</section>
	<img id='third' class='side' src='Images/pea.png'>
	<section id='about'>
		<div id='missionStatement'>
		<h2>Our Mission</h2><p><?php echo $mission[0]["missionStatement"] ?></p></div>
		<div id='aboutImages'>
			<img src='Images/all1.jpg'>
			<img src='Images/all2.jpg'>
			<img src='Images/all3.jpg'>
			<img src='Images/all4.jpg'>
		</div>
	</section>

	<div id='footer'>
		<p>2017 Student Food Cooperative</p>
	</div>
</body>


