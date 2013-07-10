#!/bin/sh

npmPath=`which npm`
npmBinDir=`dirname "$npmPath"`
modulePath=`readlink -f "$npmBinDir/../lib/node_modules/login-to-dyndns"`
if [ ! -x "$modulePath" ]; then
    echo "loginByDynDns needs to be installed as a global npm module"
    exit 1
fi

casperPath=`which casperjs`
if [ ! -x "$casperPath" ]; then
    echo "Ensure 'casperjs' is in your \$PATH"
    exit 1
fi

RunCasper () {
    casperjs "$modulePath/src/login-to-dyndns.js" "$@"
    exit $?
}

Install () {

    echo "Installing loginToDynDns into your crontab ..."
    read -p "Enter the day of the week (0-6): " day
    read -p "Enter the hour (0-23): " hour
    read -p "Enter your DynDns username: " username
    read -p "Enter your DynDns password: " password
    read -p "Enter a User Agent string (optional): " ua

    command="$casperPath $modulePath/src/login-to-dyndns.js --username='$username' --password='$password'"
    if [ -n "$ua" ]; then
        command="$command --ua='$ua'"
    fi

    line="0 $hour * * $day $command"
    echo "The following line will be appended to your crontab:"
    echo "$line"

    read -p "Confirm [y/n]: " yn
    if [ "$yn" = "y" ]; then
        tmp=/tmp/loginToDynDns.crontab
        crontab -l > $tmp
        echo "$line" >> $tmp
        crontab $tmp
        rm $tmp
        echo "Crontab updated (run 'crontab -l' to view)"
    else
        echo "Crontab not modified"
    fi

    exit 0
}

while test $# -gt 0; do
    case "$1" in
        --install)
            Install
            ;;
        *)
            RunCasper $@
            ;;
    esac
done

if [ $# -eq 0 ]; then
    echo "usage: login-to-dyndns --username=USERNAME --password=PASSWORD"
fi

