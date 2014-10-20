
var casper = require('casper').create();

var formSelector = '#loginbox form',
    url = 'https://account.dyn.com/entrance/',
    defaultExpectedTitle = 'My Dyn Account',
    defaultUA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.22';

var username = casper.cli.get('username'),
    password = casper.cli.get('password'),
    userAgent = casper.cli.get('ua') || defaultUA,
    expectedTitle = casper.cli.get('expectedTitle') || defaultExpectedTitle;

if (!username || !password) {
	casper.echo("usage: casperjs ./src/login-to-dyndns.js --username=USERNAME --password=PASSWORD");
	casper.exit(1);
}

casper.start();

casper.echo("Using user agent: " + userAgent);
casper.userAgent(username);

casper.echo("Loading url: " + url);
casper.thenOpen(url, function() {
	this.echo("Loaded page titled: " + this.getTitle());
	if (this.exists(formSelector)) {
		this.echo("Logging in...");
		this.fill(formSelector, { username: username, password: password }, true);
	} else {
		this.echo("Was unable to find login form (using selector: " + formSelector + ").");
		this.exit(1);
	}
});

casper.then(function() {
	var title = this.getTitle();
	if (title == expectedTitle) {
		this.echo('Everything looks ok!');
	} else {
		this.echo('Unexpected page title: ' + title);
		this.echo('Unable to confirm login, please verify your login details.');
		this.exit(1);
	}
});

casper.run();

