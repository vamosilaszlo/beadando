<?php
// CORS fejlécek hozzáadása
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Ha az OPTIONS metódust kérik (preflight), válaszolj üresen
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// További PHP kód itt...


header('Content-Type: application/json');
require 'db.php';

// Adat kérése (GET)
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $stmt = $pdo->query('SELECT * FROM users');
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    exit;
}

// Új adat hozzáadása (POST)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $stmt = $pdo->prepare('INSERT INTO users (name, age) VALUES (:name, :age)');
    $stmt->execute(['name' => $data['name'], 'age' => $data['age']]);
    echo json_encode(['id' => $pdo->lastInsertId(), 'name' => $data['name'], 'age' => $data['age']]);
    exit;
}

// Adat frissítése (PUT)
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $data = json_decode(file_get_contents('php://input'), true);
    $stmt = $pdo->prepare('UPDATE users SET name = :name, age = :age WHERE id = :id');
    $stmt->execute(['id' => $data['id'], 'name' => $data['name'], 'age' => $data['age']]);
    echo json_encode(['id' => $data['id'], 'name' => $data['name'], 'age' => $data['age']]);
    exit;
}

// Adat törlése (DELETE)
//if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
//    parse_str(file_get_contents('php://input'), $data);
//    $stmt = $pdo->prepare('DELETE FROM users WHERE id = :id');
//    $stmt->execute(['id' => $data['id']]);
//    echo json_encode(['id' => $data['id']]);
//    exit;
//}
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // Az adatokat a php://input stream-ből olvassuk
    parse_str(file_get_contents('php://input'), $data);
    
    // Ellenőrizzük, hogy van-e id paraméter
    if (isset($data['id'])) {
        $stmt = $pdo->prepare('DELETE FROM users WHERE id = :id');
        $stmt->execute(['id' => $data['id']]);

        // Válaszként JSON formátumban küldjük el a törölt rekord id-ját
        echo json_encode(['id' => $data['id'], 'message' => 'Record deleted successfully']);
    } else {
        echo json_encode(['error' => 'ID not provided']);
    }
    exit;
}






http_response_code(405); // Hibás HTTP metódus
echo json_encode(['error' => 'Method not allowed']);
?>
