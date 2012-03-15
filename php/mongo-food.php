<?php
header( 'Cache-Control: no-cache, must-revalidate' );
header( 'Expires: Mon, 26 Jul 1997 05:00:00 GMT' );
header( 'Content-type: application/json' );

$db = new Mongo( 'mongodb://testuser:testpw@staff.mongohq.com:10043/RIA' );

switch ( $_SERVER['REQUEST_METHOD'] )
{
	// Add new user.
	case 'POST' :
		if ( $food = file_get_contents( 'php://input' ) )
		{
			$food = json_decode( $food );

			if ( !$db->RIA->food->findOne( array( 'name' => $food->name, 'user' => $food->user ) ) )
			{
				$db->RIA->food->insert( $food );
			} else {
				header( 'Food name already exists', true, 500 );
			}
		}

		break;

	// Get all users.
	case 'GET' :
		$cursor = $db->RIA->food->find();

		$foods = array();

		foreach ( $cursor as $food )
		{
			$foods[] = array(	'_id' => $food['_id']->{'$id'},
								'name' => $food['name'],
								'protein' => $food['protein'],
								'carbohydrates' => $food['protein'],
								'fat' => $food['protein'],
								'user' => $food['user'] );
		}

		echo json_encode( $foods );
		break;

	case 'PUT' :
		break;

	case 'DELETE' :
		break;
}
