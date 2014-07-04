module.exports = {
	'WordPress Revisions System': function(test) {
		test
			/**
			* Setup involves creating a test post and revising it several times
			*/

			// Open the WordPress admin login
			.open( 'http://local.wordpress-trunk.dev/wp-login.php' )
			.type( '#user_login', 'admin' ) // Using default vvvagrant username
			.type( '#user_pass', 'password' ) // Default vvv password
			.submit( '#loginform' ) // Log in!

			// Once logged in, go to the post page, and add a new post
			.open( 'http://local.wordpress-trunk.dev/wp-admin/post.php' )
			.click( 'a.add-new-h2' )

			// Add a title, publish
			.type( '#title', 'Revisions test' ) // Add a default title
			.click( '#publish' ) // Publish the post

			// Update the title three times
			.type( '#title', 'first title update' ) // Update title
			.click( '#publish' ) // Update the post

			// And repeat two more times
			.type( '#title', 'second title update' )
			.click( '#publish' )
			.type( '#title', 'third title update' )
			.click( '#publish' )

			// Go to the revisions screen
			.click( '.num-revisions a' )
			.screenshot( 'revisions_screen.png' ) // take a screenshot to verify state


			.assert.chain() // Chain some assertions
				// Verify correct diff showing when loaded
				// Default shows what was removed in last update
				.text( '.revisions-diff .diff .diff-deletedline del' ).is( 'second' )
				.text( '.revisions-diff .diff .diff-addedline ins' ).is( 'third' )

				// The restore button should be disabled
				.attr( '.restore-revision', 'disabled', 'true' )
			.end() // End the assertion chain

			// Click to view the previous revision
			.click( '.revisions-previous .button' )

			// Check the state again
			.assert.chain()
				.text( '.revisions-diff .diff .diff-deletedline' ).is( 'first title update' )
				.text( '.revisions-diff .diff .diff-addedline' ).is( 'second title update' )

				// The restore button should be enabled
				.enabled( '.restore-revision .button .button-primary', 'Restore button is enabled' )
			.end()

			// Click to view the previous revision
			.click( '.revisions-previous .button' )

			// Check the state again
			.assert.chain()
				.text( '.revisions-diff .diff .diff-deletedline' ).is( 'Revisions test' )
				.text( '.revisions-diff .diff .diff-addedline' ).is( 'first title update' )
			.end()

			// Click to view the previous revision
			.click( '.revisions-previous .button' )

			// Check the state again
			.assert.chain()
				.text( '.revisions-diff .diff .diff-deletedline' ).is( '' )
				.text( '.revisions-diff .diff .diff-addedline' ).is( 'Revisions test' ) // Initial revision

				// We should now be on the initial revision; the Previous button should be disabled
				.disabled( '.revisions-previous .button' )
			.end()

			// Check compare any two revisions mode
			.click( '.compare-two-revisions' )

			// Check the state again
			.assert.chain()
				// Verify correct diff showing after clicking previous button
				// Default shows what was removed in last update
				.text( '.revisions-diff .diff .diff-deletedline' ).is( 'Revisions test' )
				.text( '.revisions-diff .diff .diff-addedline' ).is( 'first title update' ) // Initial revision
				.notVisible( '.revisions-previous .button', 'Previous button hidden in compare two mode' )
				.notVisible( '.revisions-next .button', 'Next button hidden in compare two mode' )
			.end()

			// Move the right handle one to the right
			.click( '.to-handle' )
			//.sendKeys( 'body','\uE014' ) // Right arrow key press (fails?)

			// Back to default mode
			.click( '.compare-two-revisions' )

			.click( '.revisions-next .button' )
			.click( '.compare-two-revisions' )

			.assert.chain()
				.text( '.revisions-diff .diff .diff-deletedline del' ).is( 'first' )
				.text( '.revisions-diff .diff .diff-addedline ins' ).is( 'second' ) // Initial revision
			.end()

			// Move the left handle one to the left
			.click( '.from-handle' )
			// Move the left handle
			//.type( '.from-handle', '\uE012' ) // Left arrow key press (fails?)
			.click( '.wp-slider ' )
			
			.screenshot( 'test.png' ) // Record the state image for testing

			/**
			 * Tear down time, delete the post
			 */

			// Go back to post
			.click( '.long-header a' )

			// Move to trash
			.click( 'a.submitdelete' )

			// Empty the trash
			.click( '.trash a' )
			.click( '#delete_all' )

			.done();
	}
};

