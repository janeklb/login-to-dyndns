var casper = require('casper').create();
var formSelector = '#loginbox form';
var url = 'https://account.dyn.com/entrance/';

var username = casper.cli.get('username');
var password = casper.cli.get('password');
var expectedTitle = casper.cli.get('expectedTitle') || 'My Dyn Account';

if (!username || !password) {
	casper.echo("Please supply a --username=xxx and --password=yyy");
	casper.exit();
}

casper.start();

casper.userAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X)');

casper.echo("Loading " + url);
casper.thenOpen(url, function() {
	this.echo("Loaded page titled: " + this.getTitle());
	if (this.exists(formSelector)) {
		this.echo("Logging in...");
		this.fill(formSelector, { username: username, password: password }, true);
	} else {
		this.echo("Was unable to find login form (using selector: " + formSelector);
		this.exit();
	}
});

casper.then(function() {
	var title = this.getTitle();
	if (title == expectedTitle) {
		this.echo('Everything looks ok!');
	} else {
		this.echo('Unexpected page title: ' + title);
		this.echo('Verify your login details');
	}
});

casper.run();

