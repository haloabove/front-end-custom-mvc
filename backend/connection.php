<?php
	$servername = "localhost";
	$username = "eumobile_tihomir";
	$password = "vjgx6r7vq8";
	$db_name = "eumobile_play";
	try {
		$pdo = new PDO("mysql:host=$servername;dbname=$db_name", $username, $password);
		// set the PDO error mode to exception
		$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	
		}
	catch(PDOException $e)
		{
		echo "Connection failed: " . $e->getMessage();
		}
?>
