<?php
	$servername = "";
	$username = "";
	$password = "";
	$db_name = "";
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
