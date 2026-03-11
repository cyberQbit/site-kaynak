<?php
// filepath: c:\aydinaydmr.com.tr\html\database.php

// Veritabanı bağlantı bilgileri
$host = 'localhost'; // Veritabanı sunucusu
$dbname = 'aydinayd_database'; // Veritabanı adı
$username = 'aydinayd_admin'; // Veritabanı kullanıcı adı
$password = 'U,d]jF&Yo#Iu'; // Veritabanı şifresi

try {
    // PDO ile veritabanına bağlanma
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    // PDO hata modunu ayarla
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Veritabanına başarıyla bağlanıldı.";
} catch (PDOException $e) {
    // Bağlantı hatası durumunda hata mesajını göster
    die("Veritabanı bağlantı hatası: " . $e->getMessage());
}
?>