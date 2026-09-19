<?php
/**
 * Receives the website's quote-request form and sends the email internally
 * using PHP's native mail(), no external service required.
 *
 * Upload this file to your hosting's public root (the same folder you
 * upload the contents of `dist/` to after `npm run build`), so it is
 * reachable at https://yourdomain.com/send-mail.php
 */

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

// --- Configuration ---
$to      = 'doublehplumbing@gmail.com';
$subjectBase = 'New quote request from the website — Double H Plumbing';

// --- Read input (JSON or classic form post) ---
$input = json_decode(file_get_contents('php://input'), true);
if (!is_array($input)) {
    $input = $_POST;
}

$nombre    = trim($input['nombre'] ?? '');
$telefono  = trim($input['telefono'] ?? '');
$email     = trim($input['email'] ?? '');
$servicio  = trim($input['servicio'] ?? '');
$direccion = trim($input['direccion'] ?? '');
$mensaje   = trim($input['mensaje'] ?? '');

// Honeypot anti-spam: if this hidden field is filled in, silently discard
$honeypot = trim($input['website'] ?? '');
if ($honeypot !== '') {
    echo json_encode(['ok' => true]);
    exit;
}

if ($nombre === '' || $telefono === '' || $email === '' || $servicio === '') {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'Missing required fields']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'Invalid email']);
    exit;
}

$clean = function ($value) {
    return str_replace(["\r", "\n"], '', $value);
};

$nombreClean    = $clean($nombre);
$telefonoClean  = $clean($telefono);
$emailClean     = $clean($email);
$servicioClean  = $clean($servicio);
$direccionClean = $clean($direccion);

$subject = $subjectBase . ' — ' . $servicioClean . ' (' . $nombreClean . ')';

$body  = "New quote request from the website:\n\n";
$body .= "Name: {$nombreClean}\n";
$body .= "Phone: {$telefonoClean}\n";
$body .= "Email: {$emailClean}\n";
$body .= "Service needed: {$servicioClean}\n";
$body .= "Property address / city: {$direccionClean}\n\n";
$body .= "Details:\n{$mensaje}\n";

// The technical sender should be on your own domain to avoid mail
// providers flagging the message as spam (SPF/DMARC).
$host = $_SERVER['HTTP_HOST'] ?? 'localhost';
$from = 'no-reply@' . preg_replace('/^www\./', '', $host);

$headers  = "From: Website Form <{$from}>\r\n";
$headers .= "Reply-To: {$emailClean}\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

$sent = mail($to, $subject, $body, $headers);

if ($sent) {
    echo json_encode(['ok' => true]);
} else {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Could not send email']);
}
