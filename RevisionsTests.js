module.exports = {
	'WordPress Revisions System': function(test) {
		test
			.open('http://local.wordpress-trunk.dev/wp-admin/')
			.screenshot('login_screen.png')
			.type('#user_login', 'admin')		// Using default vagrant username
			.type('#user_pass', 'password')		// Default password
			.click('#wp-submit')				// Log in!
			.screenshot('logged_in.png')
			.open('http://local.wordpress-trunk.dev/wp-admin/post.php') // go to the post page
			.screenshot('posts_page.png')
			.click('a.add-new-h2')
			.screenshot('add_new_p.png')
			.type('#title', 'Revisions test') // Add a default title
			.click('#publish') // Publish the post
			.screenshot('clicked.png')
			.type('#title', 'update title') // Add a default title
			.click('#publish') // Publish the post
			.screenshot('updated1.png')
			.type('#title', 'second title update') // Add a default title
			.click('#publish') // Publish the post
			.screenshot('updated2.png')
			.type('#title', 'third title update') // Add a default title
			.click('#publish') // Publish the post
			.screenshot('updated3.png')
			.click('.num-revisions a')
			.screenshot('revisions_screen.png')
			.assert.text('.revisions-diff .diff .diff-deletedline').is('second title update ') // Default shows what was removed in last update
			.click('.revisions-previous button')
			.screenshot(';previous-revision.png')
			.done();
	}
};
