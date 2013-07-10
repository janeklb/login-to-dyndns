## Setup

Install [PhantomJS](http://phantomjs.org/download.html) and [CasperJS](http://casperjs.org/installation.html)

## Usage

### Install to Crontab

```bash
$ npm install -g login-to-dyndns
$ loginToDynDns --install
```

### Run via node module binary

```bash
$ npm install -g login-to-dyndns
$ loginToDynDns --username=USERNAME --password=PASSWORD --ua=USERAGENT
```

### Directly

```bash
$ casperjs ./src/login-to-dyndns.js --username=USERNAME --password=PASSWORD --ua=USERAGENT
```

