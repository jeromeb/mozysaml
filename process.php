		<?php

//$data = json_decode($_GET);

$subdomain = $_GET['subdomain'];
$domain = $_GET['domain'];
$idpId = $_GET['idpid'];
$idp = json_decode($_GET['idp']);

$mozySAML = "https://auth2.mozy.com/$subdomain/saml";
$mozyLogin = 'https://' . $subdomain . $domain;
//print_r(json_decode($_GET['idp']));
//return;
switch (true) {
case $idp->value == "ms":
	$urlDestination = "https://login.microsoftonline.com/$idpId/saml2";
	$url = "$urlDestination?";
	$samlIssuer = $mozySAML;
	$samlEndpoint = "https://sts.windows.net/$idpId/";
	break;
case $idp->value == "gg";
	$baseUrl = "https://accounts.google.com/o/saml2";
	$urlDestination = "$baseUrl/idp?idpid=$idpId";
	$url = "$urlDestination&";
	$samlIssuer = $mozyLogin;
	$samlEndpoint = "$baseUrl?idpid=$idpId";
	break;

default:
	echo json_encode($_GET['idp']);
	return;
	break;
}

$SAMLrequest = htmlspecialchars('<samlp:AuthnRequest xmlns:samlp="urn:oasis:names:tc:SAML:2.0:protocol" xmlns:saml="urn:oasis:names:tc:SAML:2.0:assertion" ID="MOZY" Version="2.0" ProviderName="Mozy" IssueInstant="2014-07-16T23:52:45Z" Destination="' . $urlDestination . '" ProtocolBinding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST" AssertionConsumerServiceURL="' . $mozySAML . '"><saml:Issuer>' . $samlIssuer . '</saml:Issuer><samlp:NameIDPolicy Format="urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress" AllowCreate="true"/></samlp:AuthnRequest>');

$compressed = base64_encode(gzdeflate(htmlspecialchars_decode($SAMLrequest), 1));

echo json_encode(array('status' => true, 'authurl' => $url . 'SAMLRequest=' . urlencode($compressed), 'samlEndpoint' => $samlEndpoint, 'decryptedRequest' => htmlspecialchars_decode($SAMLrequest)));
?>