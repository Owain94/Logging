# Logging

[![Build Status](http://136.144.141.239:8111/app/rest/builds/aggregated/strob:(buildType:(project:(id:Logging)))/statusIcon.svg)](http://136.144.141.239:8111/viewType.html?buildTypeId=Logging_Build)
[![Greenkeeper badge](https://badges.greenkeeper.io/Owain94/Logging.svg)](https://greenkeeper.io/)[![dependencies Status](https://david-dm.org/Owain94/Logging/status.svg)](https://david-dm.org/Owain94/Logging)
[![devDependencies Status](https://david-dm.org/Owain94/Logging/dev-status.svg)](https://david-dm.org/Owain94/Logging?type=dev)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/94a66170f1b94efa84d0f357dbf43c08)](https://www.codacy.com/app/Owain94/Logging?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Owain94/Logging&amp;utm_campaign=Badge_Grade)
[![codebeat badge](https://codebeat.co/badges/40a1f148-2339-45a7-b92c-bf4292796c83)](https://codebeat.co/projects/github-com-owain94-logging-master)
[![codecov](https://codecov.io/gh/Owain94/Logging/branch/master/graph/badge.svg)](https://codecov.io/gh/Owain94/Logging)

Add this to `~/.profile`

```bash
function previous_command_status()
{
    if [ $? -eq 0 ]; then
        ~/logging.sh
    fi
}

PROMPT_COMMAND='previous_command_status'
```
add this to `~/logging.sh` and change the IP address to the IP address of the computer that's running the application

```bash
ipaddress="xxx.xxx.xxx.xxx:8000"

last=$1

prev=$(fc -ln -1)
datetime=`date +"%d/%m/%Y"`", "`date +"%H:%M:%S"`

while true; do
  echo -n "Do you want to log this command? [Y/n] "
  read yn
  case $yn in
    [Yy]* ) break;;
    [Nn]* ) exit;;
    * ) exit;;
  esac
done

curl --request POST "http://$ipaddress/api/log/cli" --data "how=$prev" --data "when=$datetime" --data "with=Terminal"
```