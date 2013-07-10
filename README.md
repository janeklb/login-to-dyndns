## Setup

Install [PhantomJS](http://phantomjs.org/download.html) and [CasperJS](http://casperjs.org/installation.html)

## Usage

### Install to Crontab

```bash
$ npm install -g loginToDynDns
$ loginToDynDns --install
```

### Run via node module binary

```bash
$ npm install -g loginToDynDns
$ loginToDynDns --username=USERNAME --password=PASSWORD --ua=USERAGENT
```

### Directly

```bash
$ casperjs ./src/loginToDynDns.js --username=USERNAME --password=PASSWORD --ua=USERAGENT
```

