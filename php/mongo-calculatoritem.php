<?php
header( 'Cache-Control: no-cache, must-revalidate' );
header( 'Expires: Mon, 26 Jul 1997 05:00:00 GMT' );
header( 'Content-type: application/json' );

$db = new Mongo( 'mongodb://testuser:testpw@staff.mongohq.com:10043/RIA' );

switch ( $_SERVER['REQUEST_METHOD'] )
{
	// Add new calculator item.
	case 'POST' :
		if ( $calculatorItem = file_get_contents( 'php://input' ) )
		{
			$calculatorItem = json_decode( $calculatorItem );

			$db->RIA->calculatorItems->insert( $calculatorItem );
		}

		break;

	// Get all calculator items.
	case 'GET' :
		$cursor = $db->RIA->calculatorItems->find( array( 'user' => $_GET['userid'] ) );

		$calculatorItems = array();

		foreach ( $cursor as $calculatorItem )
		{
			$calculatorItems[] = array(	'_id' => $calculatorItem['_id']->{'$id'},
								'weight' => $calculatorItem['weight'],
								'food' => $calculatorItem['food'],
								'user' => $calculatorItem['user'] );
		}

		echo json_encode( $calculatorItems );
		break;

	case 'PUT' :
		if ( $calculatorItem = file_get_contents( 'php://input' ) )
		{
			$calculatorItem = json_decode( $calculatorItem );

			if ( !$db->RIA->calculatorItems->update( array( '_id' => new MongoId( $calculatorItem->_id ) ), array( '$set' => array( 'weight' => $calculatorItem->weight ) ) ) )
			{
				header( 'Could not update weight in database.', true, 500 );
			}
		}

		break;

	case 'DELETE' :
		$itemId = new MongoId( substr( $_SERVER['REQUEST_URI'], strrpos( $_SERVER['REQUEST_URI'], '/' ) + 1 ) );

		if ( !$db->RIA->calculatorItems->remove( array( '_id' => $itemId ) ) )
		{
			header( 'Could not find calculator item in database.', true, 500 );
		}

		break;
}
