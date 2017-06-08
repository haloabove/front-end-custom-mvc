<?php
include 'connection.php';
header('Content-type: application/json');
 if(isset($_GET['req']))
{
    $req = $_GET['req'];
}
elseif(isset($_POST['fwrite'])){
    $req = $_POST['fwrite'];
}
else  
{
    die('No req.');
}


if($req == 'all')
{
    // get all files in table 'data'
	$statement=$pdo->prepare("SELECT * FROM data");
	$statement->execute();
	$results=$statement->fetchAll(PDO::FETCH_ASSOC);
	$json=json_encode($results);
	print $json;
}
else if($req == 'delete')
{
	$docid = $_GET['doc_id'];  
    // delete row from table and return new table
	$statement=$pdo->prepare("delete from data where document_id = ?");
	$statement->bindParam(1, $docid);
	$statement->execute();
	
	//ako ima potreba da se vrati sve 
	$statement=$pdo->prepare("SELECT * FROM data");
	$statement->execute();
	$results=$statement->fetchAll(PDO::FETCH_ASSOC);
	$json=json_encode($results);
	return $json;
	
}
else if($req == 'edit')
{	

    // edit a row 
	$statement=$pdo->prepare("update data set category = :cat,name =:name ,description =:desc  where document_id = :doc");
	$statement->bindParam(':cat', $_GET['cat'], PDO::PARAM_STR);
	$statement->bindParam(':name', $_GET['name'], PDO::PARAM_STR);
	$statement->bindParam(':desc', $_GET['description'], PDO::PARAM_STR);
	$statement->bindParam(':doc', $_GET['doc'], PDO::PARAM_STR);
	$statement->execute();
	//--------------------------------------//
	//ako ima potreba da se vrati sve 
	$statement=$pdo->prepare("SELECT * FROM data");
	$statement->execute();
	$results=$statement->fetchAll(PDO::FETCH_ASSOC);
	$json=json_encode($results);
	return $json;
	//--------------------------------------//

	
}
else if($req == 'new')
{
	
	$data = $_POST['data'];
	$fileName = $_POST['fileName'];

	$serverFile = time().$fileName;
	$fp = fopen('/home/eumobile/public_html/play/backend/uploads/'.$serverFile,'w'); //Prepends timestamp to prevent overwriting
	fwrite($fp, $data);
	fclose($fp);
	$returnData = array( "serverFile" => $serverFile );
	// echo json_encode($returnData);

	$cat = $_GET['category'];  
	$name = $_GET['name'];  
	$desc = $_GET['description'];  
    //insert row and a link
	$statement=$pdo->prepare("insert in  to data set(name,description) VALUES (?,?)");

	$statement->bindParam(1, $name);
	$statement->bindParam(2, $desc);
	$statement->execute();
	$results=$statement->fetchAll(PDO::FETCH_ASSOC);
	$json=json_encode($results);
	return $json;
}
else if($req == 'categories')
{

	
	$statement=$pdo->prepare("SELECT * FROM categories");
	$statement->execute();
	$results=$statement->fetchAll(PDO::FETCH_ASSOC);
	$json=json_encode($results);
	print $json;
}
else if($req == 'fwrite')
{

$savefolder = 'uploads';		// folder for upload
$max_size = 10000;			// maxim size for image file, in KiloBytes
$name=$_POST['pcaption'];
$myfile=$_FILES['myfile']['name'];
$pdescription=$_POST['pdescription'];
$allowtype = array('bmp', 'gif', 'jpg', 'jpeg', 'gif', 'png', 'Jpg', 'Jpeg');
$rez = '';
$timedb=date("Y-m-d H:i:s");

// if is received a valid file
if (isset ($_FILES['myfile'])) {
  // checks to have the allowed extension
  $type = end(explode(".", strtolower($_FILES['myfile']['name'])));
  if (in_array($type, $allowtype)) {
    // check its size
	if ($_FILES['myfile']['size']<=$max_size*1000) {
      // if no errors
      if ($_FILES['myfile']['error'] == 0) {
        $thefile = $savefolder . "/" . $_FILES['myfile']['name'];
        // if the file can`t be uploaded, return a message
        if (!move_uploaded_file ($_FILES['myfile']['tmp_name'], $thefile)) {
         $rez = array( data   => "false");
        $json=json_encode($results);
	    print $json;
        }
        else { 
          // Return the img tag with uploaded image.
          $rezultat = '<p class="sucess">Фотографијата е успешно качена, притиснете на табот Гласај за да го дадете вашиот прв глас.</p><img src="'.$thefile.'" width="400"/>';
		  echo $user;
          
		  //connect to mysql and write data
		  mysql_connect("146.255.82.16", "dealerlogin", "p@ssw0rd1") or die(mysql_error()) ;
		  mysql_query("SET NAMES UTF8");
		  mysql_select_db("facebook_nagrada") or die(mysql_error()) ;

		  //Writes the information to the database
		  mysql_query("INSERT INTO photos_likes_user (userid,pcaption,photo,pdescription,dateposted,likes)
		  VALUES ('$user','$name', '$myfile', '$pdescription','$timedb','$setzirro')") ;

        }
      }
    }
	else { $rezultat = 'The file <b>'. $_FILES['myfile']['name']. '</b> Фотографијата ја надминува границата за максимална големина. <i>'. $max_size. 'KB</i>'; }
  }
  else { $rezultat = 'Фотографијата <b>'. $_FILES['myfile']['name']. '</b> не е во дозволен формат.'; }
}
}
else {$rezultat = '<p class="refreshp">Фотографијата не може да биде качена, ве молиме освежете ја страницата!</p>'; }

// encode with 'urlencode()' the $rezultat and return it in 'onload', inside a BODY tag
$rezultat = urlencode($rezultat);
echo '<body onload="parent.doneloading(\''.$rezultat.'\')"></body>';

}

?>