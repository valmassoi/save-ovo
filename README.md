# save-ovo
Web scraper that checks National Interest Exception post every minute.

## Install
`npm i`

## Usage
`touch .env` and paste in your `SLACK_WEBHOOK_URL=XXX` for mobile notifications
`npm run start`

## Test
`npm run test`

## Run on a sever
Purchase a [Vultr sever](https://www.vultr.com/?ref=7242522) or similar  
`Cloud Compute`, any US location, `CentOS`, `$3.50/mo` or `$5/mo` option  
```bash
ssh root@xx.xx.xxx.xxx
sudo yum install git
sudo yum install epel-release
sudo yum install nodejs
git clone https://github.com/valmassoi/save-ovo.git
cd save-ovo
npm i
echo SLACK_WEBHOOK_URL=https://hooks.slack.com/services/xxx/xxx/xxx > .env
npm i forever -g # run process in the background
forever start app.js 
forever logs
cat /root/.forever/xxx.log # make sure everything looks good, should get a slack notification
# exit and get ready to buy!
```
