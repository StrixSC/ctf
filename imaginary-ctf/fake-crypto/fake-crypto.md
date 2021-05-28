```php
<?php
include('flag.php');
highlight_file(__FILE__);
if ($_GET['a'] != $_GET['b']) {
    echo "<br>Requirement 1<br>";
    if (md5('savory salt' . $_GET['a']) == md5('savory salt' . $_GET['b'])) {
        echo $FLAG;
    }
}
?>
```