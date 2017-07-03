<?php

include ('../vendor/autoload.php');
require_once ('../src/config.php');


use App\library\QueryToDB;
use App\library\Validate;


if(isset($_POST['search'])){
    //https://www.leboncoin.fr/voitures/offres/ile_de_france/?f=p

    putenv(PHANTOMJS_EXECUTABLE);
    $command = exec(CASPERJS . ' ..\leboncoin.js '. $_POST['search'], $res1);


    $query = new QueryToDB();

    $today =date('Y-m-d');

    $sql= "SELECT massage, COUNT(*) AS count FROM leboncoin_voitures WHERE date_publish = '$today' GROUP BY massage";
    $result = $query->queryToDB($sql);

    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $count[$row['massage']] = $row['count'];
        }
    }

    $sql= "SELECT * FROM leboncoin_voitures WHERE date_publish = '$today' LIMIT 50";
    $list = $query->queryToDB($sql);


    $view = '../src/views/results.phtml';
    include('../src/views/tamplate.phtml');
    exit();
}

if(isset($_POST['send'])){

putenv(PHANTOMJS_EXECUTABLE);
$command = exec(CASPERJS . ' ..\sendMassages.js '. $_POST['send'], $res2);




$view = '../src/views/send_success.phtml';
include('../src/views/tamplate.phtml');
exit();
}

if(isset($_GET['count'])){
    home();
exit();
}

if(isset($_GET['message'])){

    $query = new QueryToDB();
    $today =date('Y-m-d');

    $sql= "SELECT massage, COUNT(*) AS count FROM leboncoin_voitures WHERE date_publish = '$today' GROUP BY massage";
    $result = $query->queryToDB($sql);

    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            if($row['massage'] == '1'){
                $send = $row['count'];
            }
            if($row['massage'] == '0'){
                $noSend = $row['count'];
            }

        }
    }


    $view = '../src/views/messages.phtml';
    include('../src/views/tamplate.phtml');
    exit();
}

if(isset($_POST['send_message'])){

    $query = new QueryToDB();
    $today =date('Y-m-d');



    $sql= "SELECT product_id FROM leboncoin_voitures WHERE date_publish = '$today' AND massage = 0 LIMIT 20";
    $ids = $query->queryToDB($sql);

    if ($ids->num_rows > 0) {
        $count = 1;
        while($row = $ids->fetch_assoc()) {
            putenv(PHANTOMJS_EXECUTABLE);
            $command = exec(CASPERJS . ' ..\sendMassage.js '. $row['product_id'], $res2);
            //var_dump($res2);

            $sql= "UPDATE leboncoin_voitures SET massage=1 WHERE product_id='". $row['product_id'] ."'";
            $setMessage = $query->queryToDB($sql);
        }
    }

    $sql= "SELECT massage, COUNT(*) AS count FROM leboncoin_voitures WHERE date_publish = '$today' GROUP BY massage";
    $result = $query->queryToDB($sql);

    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            if($row['massage'] == '1'){
                $send = $row['count'];
            }
            if($row['massage'] == '0'){
                $noSend = $row['count'];
            }

        }
    }

    $view = '../src/views/messages.phtml';
    include('../src/views/tamplate.phtml');
    exit();
}

if(isset($_GET['getCountMasseges'])){

    $query = new QueryToDB();
    $today =date('Y-m-d');

    $sql= "SELECT massage, COUNT(*) AS count FROM leboncoin_voitures WHERE date_publish = '$today' GROUP BY massage";
    $result = $query->queryToDB($sql);

    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $count[$row['massage']] = $row['count'];
        }
    }
    echo (json_encode($count));
    exit();
}

home();


function home(){

    $query = new QueryToDB();

    $today =date('Y-m-d');

    $sql= "SELECT massage, COUNT(*) AS count FROM leboncoin_voitures WHERE date_publish = '$today' GROUP BY massage";
    $result = $query->queryToDB($sql);

    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $count[$row['massage']] = $row['count'];
        }
    }

    $sql= "SELECT * FROM leboncoin_voitures WHERE date_publish = '$today' LIMIT 50";
    $list = $query->queryToDB($sql);

    $view = '../src/views/results.phtml';
    include('../src/views/tamplate.phtml');
}
