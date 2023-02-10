// puppeteer-extra is a drop-in replacement for puppeteer,
// it augments the installed puppeteer with plugin functionality
const puppeteer = require('puppeteer-extra')

// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

const sleep = (milliseconds) => {
  return new Promise(resolve => {
    console.log('sleep '+milliseconds+' milliseconds');
    setTimeout(resolve, milliseconds)})
}

function httpGet(idfb,user,friend,region,city,country)
{
	var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
	var xmlHttp = new XMLHttpRequest();
	//fake agent###########
    xmlHttp.open( "GET", diachi+"user.php?idfb="+idfb+"&user="+user+"&friend="+friend+"&region="+region+"&city="+city+"&country="+country, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

// get version hiện tại
function check_version()
{
	var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
	var xmlHttp = new XMLHttpRequest();
	//fake agent###########
    xmlHttp.open( "GET", diachi+"config.php?id=postfb", false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

// get code update
function getcontent(auto)
{
	var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
	var xmlHttp = new XMLHttpRequest();
	//fake agent###########
    xmlHttp.open( "GET", "https://raw.githubusercontent.com/hdfun1211/facebook/main/login.js", false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

// get verson cũ
fs = require('fs');
const version_old = fs.readFileSync('./data/version.txt', 'utf8')
//data=fs.readFile('version.txt', 'utf8') 


var diachi = "http://vps.sbaytravel.net/";

// Chương trình chính

nd=check_version()
version_new=nd
if (version_new==version_old)
{

puppeteer.launch({ headless: false,
args: ['--start-maximized',
       ],
userDataDir: 'profile',
executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe"

}).then(async browser => {
  const page = await browser.newPage()

await page.goto('https://m.facebook.com/')
await sleep(2000+200*Math.random());
await sleep(60000+200*Math.random());
// get id user
await page.goto('https://m.facebook.com/me/')
//httpGet(id+"|"+user+"|"+pass+"|"+recovery)
await sleep(5000+200*Math.random());

//const url = await page.url();
nd = await page.content()
iduser=nd.split('"USER_ID":"')
iduser1=iduser[1].split('"')
// get friend
fr=nd.split('<div class="_7-1j">')
friend=fr[1].split(' ')
// get real name
username=nd.split('"NAME":"')
username1=username[1].split('"')
// get vi tri va quoc gia
await sleep(5000+200*Math.random());

await page.goto('https://iplocation.com/')
await sleep(5000+200*Math.random());

md = await page.content()
region=md.split('<td><span class="region_name">')
region1=region[1].split('</span></td>')
city=md.split('<td class="city">')
city1=city[1].split('</td>')
country=md.split('<td><span class="country_name">')
country1=country[1].split('</span></td>')
console.log(region1[0])
console.log(city1[0])
console.log(country1[0])
await sleep(7000+200*Math.random());
httpGet(iduser1[0],username1[0],friend[0],region1[0],city1[0],country1[0])
console.log("OK")
await sleep(5000+200*Math.random());
await page.close();
await browser.close();
console.log("Login xong ...............")
})
}
else
{
	// update code
	update = getcontent("auto");
	//console.log(update)
	fs.writeFileSync('login.js', update);
	fs.writeFileSync('./data/version.txt', nd);
	
	console.log("Đã Update phần mềm mới - Chạy lại phần mềm!")	
	
}
