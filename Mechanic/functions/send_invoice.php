<?php
include('../../config/dbconnection.php');

header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);

$date = $data['date'];
$activity_id = $data['activity_id'];
$invoices = $data['invoices'];

$response = [];
$success = true;

foreach ($invoices as $invoice) {
    $item_id = $invoice['item_id'];
    $quantity = $invoice['quantity'];
    $unit_price = $invoice['unit_price'];
    $total_price = $quantity * $unit_price;

    $stmt = $conn->prepare("INSERT INTO inventoryinvoice (date, item_id, quantity, total_price, activity_id) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("siids", $date, $item_id, $quantity, $total_price, $activity_id);

    if (!$stmt->execute()) {
        $success = false;
        $response[] = "Failed to insert item ID $item_id: " . $stmt->error;
    }

    $stmt->close();
}

if ($success) {
    $response['success'] = true;
} else {
    $response['success'] = false;
    $response['message'] = implode(", ", $response);
}

echo json_encode($response);
$conn->close();
?>