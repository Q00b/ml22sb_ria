<?php
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');

$db = new Mongo( 'mongodb://testuser:testpw@staff.mongohq.com:10043/RIA' );

switch ( $_SERVER['REQUEST_METHOD'] )
{
	// Add new user.
	case 'POST' :
		if ( $user = file_get_contents( 'php://input' ) )
		{
			$user = json_decode( $user );

			if ( !$db->RIA->users->findOne( array( 'username' => $user->username ) ) )
			{
				$db->RIA->users->insert( $user );
			} else {
				// User already exists.
				// TODO: Skicka tillbaka error till Backbone..
			}
		}

		break;

	// Get all users.
	case 'GET' :
		$cursor = $db->RIA->users->find();

		$users = array();

		foreach ( $cursor as $user )
		{
			$users[] = array(	'_id' => $user['_id']->{'$id'},
								'username' => $user['username'],
								'password' => $user['password']  );
		}

		echo json_encode( $users );
		break;

	case 'PUT' :
		break;

	case 'DELETE' :
		break;
}
