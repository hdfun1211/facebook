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

var diachi = "http://vps.sbaytravel.net/";


function between(min, max) {  
  return Math.floor(
    Math.random() * (max - min) + min
  )
}
// get noi dung post //////
function getnoidung()
{
	var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
	var xmlHttp = new XMLHttpRequest();
	//fake agent###########
    xmlHttp.open( "GET", diachi+"get_noidung.php?id=postfb", false ); // false for synchronous request
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
// Get hinh ảnh
function Get_Gdrive(link)
{
	var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
	var xmlHttp = new XMLHttpRequest();
	//fake agent###########
    xmlHttp.open( "GET", link, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}
// get code update
function getcontent(auto)
{
	var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
	var xmlHttp = new XMLHttpRequest();
	//fake agent###########
    xmlHttp.open( "GET", "https://raw.githubusercontent.com/hdfun1211/facebook/main/auto.js", false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

// insert dữ liệu vào thống kê
function insertpost(idfb,datepost,timepost,linkpost,type)
{
	var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
	var xmlHttp = new XMLHttpRequest();
	//fake agent###########
	req=diachi+"data.php?idfb="+ idfb +"&datepost="+ datepost +"&timepost="+ timepost +"&linkpost=" + linkpost+ "_" + idfb + "&type="+type
    xmlHttp.open( "GET",req , false ); // false for synchronous request
    xmlHttp.send( null );
	console.log(type +' Done!');
	console.log(req +' Done!');
    return xmlHttp.responseText;
}

// get verson cũ
fs = require('fs');
const version_old = fs.readFileSync('./data/version.txt', 'utf8')
//data=fs.readFile('version.txt', 'utf8') 

// edit ảnh
async function editimage(img)
	{
		const sharp = require('sharp')
		sharp(img)
			.resize({ width: between(700, 1200) })
			.toFile('./data/image.new.jpg', function (err) {
				if (err) console.log(err);
			})
	}
// check link ////
function isValidUrl(str) {
  const pattern = new RegExp(
    '^([a-zA-Z]+:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', // fragment locator
    'i'
  );
  return pattern.test(str);
}
// post lên tường
async function postfb(noidung,ck)
{
	const puppeteer = require('puppeteer-extra')
	// add stealth plugin and use defaults (all evasion techniques)
	const StealthPlugin = require('puppeteer-extra-plugin-stealth')
	puppeteer.use(StealthPlugin())
	puppeteer.launch({ headless: false,
	args: ['--start-maximized',
		   ],
	userDataDir: 'profile',
	executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe"

	}).then(async browser => {
		const page = await browser.newPage()
		await page.goto('https://m.facebook.com/me/')
		const url = await page.url();
		await sleep(5000+200*Math.random());
		nd = await page.content()
		iduser=nd.split('"USER_ID":"')
		iduser1=iduser[1].split('"')
		idfb=iduser1[0]
		await page.goto('https://m.facebook.com/')
		await sleep(2500+200*Math.random());
		if(ck == false )
		{
			// vừa ảnh vừa text
			//const elements1 = await page.$x('/html/body/div[1]/div[1]/div[1]/div/div[3]/div/div/div/div[1]/div[1]/div/div/div[4]/div[2]/div/div[2]/div[1]/div/div/div/div/div[1]/div')
			//await elements1[0].click()
			await sleep(2000+200*Math.random());
			const elements1_1 = await page.$x('/html/body/div[1]/div/div[4]/div/div[1]/div[3]/div/div/div[1]/div[2]')
			await elements1_1[0].click()
			await sleep(5000+200*Math.random());		
			const input = await page.$$('input[type=file]');
			try
				{
					await input[1].uploadFile("./data/image.new.jpg");
				}
			catch
				{
					await input[0].uploadFile("./data/image.new.jpg");	
				}
			await sleep(10000+200*Math.random());
			const elements2 = await page.$x('/html/body/div[2]/div[1]/div/div[2]/div/div/div[5]/div[3]/form/div[2]/div[3]/textarea')
			await elements2[0].click()
			await page.keyboard.type(noidung);
			await sleep(2000+200*Math.random());		
			//const myArray = url.split("https://www.facebook.com/profile.php?id=");
			//console.log(httpGet(myArray[1]))
			try
			{
				await page.waitForSelector('button[type="submit"]');
				await page.click('button[type="submit"]');
			}
			catch
			{
				const elements3 = await page.$x('/html/body/div[2]/div[1]/div/div[2]/div/div/div[5]/div[3]/div/div/button')
				await elements3[0].click()
			}
			await sleep(10000+200*Math.random());
		}
		else
		{
			await sleep(2000+200*Math.random());
			const elements1_1 = await page.$x('/html/body/div[1]/div/div[4]/div/div[1]/div[3]/div/div/div[1]/div[2]')
			await elements1_1[0].click()
			await sleep(5000+200*Math.random());		
			const elements2 = await page.$x('/html/body/div[2]/div[1]/div/div[2]/div/div/div[5]/div[3]/form/div[2]/div[3]/textarea')
			await elements2[0].click()
			await page.keyboard.type(noidung);
			await sleep(20000+200*Math.random());		
			const elements3 = await page.$x('/html/body/div[2]/div[1]/div/div[2]/div/div/div[5]/div[3]/div/div/button')
			await elements3[0].click()
			await sleep(10000+200*Math.random());			
		}
		// mở post vừa share
		await page.goto('https://m.facebook.com/me/')
		await sleep(5000+200*Math.random());
		nd = await page.content()
		sl=nd.split('feedbackTargetID:"')
		idpost=sl[2].split('"')
		//l1=sl[1].split('"')
		console.log(idpost[0])
		let date_ob = new Date();
		// current date
		// adjust 0 before single digit date
		let date = ("0" + date_ob.getDate()).slice(-2);
		// current month
		let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
		// current year
		let year = date_ob.getFullYear();
		// current hours
		let hours = date_ob.getHours();
		// current minutes
		let minutes = date_ob.getMinutes();
		// current seconds
		let seconds = date_ob.getSeconds();
		datepost = year + "-" + month + "-" + date
		timepost = hours + ":" + minutes + ":" + seconds
		linkpost= 'https://www.facebook.com/permalink.php?story_fbid='+idpost[0]
		console.log(idfb);
		//console.log(datepost);
		//console.log(timepost);
		//console.log(linkpost);
		type="wall"
		insertpost(idfb,datepost,timepost,linkpost,type)
		await sleep(30000+2000*Math.random());
		await page.close();
		await browser.close();
		})
}
// like 
async function post_like(num)
{
	const puppeteer = require('puppeteer-extra')
	// add stealth plugin and use defaults (all evasion techniques)
	const StealthPlugin = require('puppeteer-extra-plugin-stealth')
	puppeteer.use(StealthPlugin())
	puppeteer.launch({ headless: false,
	args: ['--start-maximized',
		   ],
	userDataDir: 'profile',
	executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe"

	}).then(async browser => {
		const page = await browser.newPage()
		await page.goto('https://m.facebook.com/me/')
		const url = await page.url();
		await sleep(5000+200*Math.random());
		nd = await page.content()
		iduser=nd.split('"USER_ID":"')
		iduser1=iduser[1].split('"')
		idfb=iduser1[0]
		//https://www.facebook.com/permalink.php?story_fbid=pfbid04XegVM2ydCeENKBxN34xSvpJu7t5YsYcQ8e7RZMNQKJQApTZTxvTQzF55YXzmuEWl&id=100027685924300
		num=num.replace("https://www.","https://m.")
		await page.goto(num)
		// like 
		await sleep(10000+200*Math.random());
		try 
		{
			const elements1_2 = await page.$x('/html/body/div[1]/div[1]/div[1]/div/div[3]/div/div/div/div[1]/div[1]/div/div/div/div/div/div/div/div/div/div/div/div/div/div[2]/div/div/div[4]/div/div/div[1]/div/div[2]/div/div[1]/div[1]')
			await elements1_2[0].click()
		}
		catch
		{
			await page.goto(num)
			await sleep(10000+200*Math.random());
			const elements1_2 = await page.$x('/html/body/div[1]/div/div[4]/div/div[1]/div/div/div/footer/div/div/div[1]/a')
			await elements1_2[0].click()			
		}
		await sleep(5000+200*Math.random());
		let date_ob = new Date();
		// current date
		// adjust 0 before single digit date
		let date = ("0" + date_ob.getDate()).slice(-2);
		// current month
		let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
		// current year
		let year = date_ob.getFullYear();
		// current hours
		let hours = date_ob.getHours();
		// current minutes
		let minutes = date_ob.getMinutes();
		// current seconds
		let seconds = date_ob.getSeconds();
		datepost = year + "-" + month + "-" + date
		timepost = hours + ":" + minutes + ":" + seconds
		linkpost= num
		//console.log(idfb);
		//console.log(datepost);
		//console.log(timepost);
		//console.log(linkpost);
		type="like"
		insertpost(idfb,datepost,timepost,linkpost,type)
		await sleep(30000+2000*Math.random());
		await page.close();
		await browser.close();
	
	}	)
}

// Post Comment...............
async function post_cmt(num)
{
	const puppeteer = require('puppeteer-extra')
	// add stealth plugin and use defaults (all evasion techniques)
	const StealthPlugin = require('puppeteer-extra-plugin-stealth')
	puppeteer.use(StealthPlugin())
	puppeteer.launch({ headless: false,
	args: ['--start-maximized',
		   ],
	userDataDir: 'profile',
	executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe"

	}).then(async browser => {
		const page = await browser.newPage()
		await page.goto('https://m.facebook.com/me/')
		const url = await page.url();
		await sleep(5000+200*Math.random());
		nd = await page.content()
		iduser=nd.split('"USER_ID":"')
		iduser1=iduser[1].split('"')
		idfb=iduser1[0]
		await page.goto(num)
		await sleep(10000+200*Math.random());
		const elements1 = await page.$x('/html/body/div[1]/div/div[4]/div/div[1]/div/div/div/footer/div/div/div[2]')
		await elements1[0].click()
		try {
		await sleep(5000+200*Math.random());
		const elements12 = await page.$x('/html/body/div[1]/div/div[4]/div/div/div/div/footer/div/div/div[2]')
		await elements12[0].click()
		}
		catch
		{
			console.log ("...")
		}
		await sleep(5000+200*Math.random());		
		// lay noi dung Comment
		const input = await page.$$('input[type=file]');
		try
		{
			await input[1].uploadFile("./data/image.new.jpg");
		}
		catch
			{
				await input[0].uploadFile("./data/image.new.jpg");	
			}
		await sleep(5000+200*Math.random());

		try
		{		
				await page.waitForSelector('button[name="submit"]');
				await page.click('button[name="submit"]');								 
		}
		catch
		{
				const elements2 = await page.$x('/html/body/div[1]/div/div[4]/div/div/div/div/div[2]/div/div/div[6]/div[2]/form/div[1]/div[3]/button')
				                                 //html/body/div[1]/div/div[4]/div/div/div/div/div[2]/div/div/div[6]/div[2]/form/div[1]/div[3]/button
				await elements2[0].click()
				
		}		
		await sleep(5000+200*Math.random());
		await page.goto('https://m.facebook.com/me/')
		await sleep(5000+200*Math.random());
		let date_ob = new Date();
		// current date
		// adjust 0 before single digit date
		let date = ("0" + date_ob.getDate()).slice(-2);
		// current month
		let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
		// current year
		let year = date_ob.getFullYear();
		// current hours
		let hours = date_ob.getHours();
		// current minutes
		let minutes = date_ob.getMinutes();
		// current seconds
		let seconds = date_ob.getSeconds();
		datepost = year + "-" + month + "-" + date
		timepost = hours + ":" + minutes + ":" + seconds
		linkpost= num
		//console.log(idfb);
		//console.log(datepost);
		//console.log(timepost);
		//console.log(linkpost);
		type="cmt"
		insertpost(idfb,datepost,timepost,linkpost,type)
		await sleep(30000+2000*Math.random());
		await page.close();
		await browser.close();
	
	}	)
}

// post lên group

async function postgroup(noidung,ck)
{
	const puppeteer = require('puppeteer-extra')

	// add stealth plugin and use defaults (all evasion techniques)
	const StealthPlugin = require('puppeteer-extra-plugin-stealth')
	puppeteer.use(StealthPlugin())
	puppeteer.launch({ headless: false,
	args: ['--start-maximized',
		   ],
	userDataDir: 'profile',
	executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe"

	}).then(async browser => {
		const page = await browser.newPage()
		await page.goto('https://www.facebook.com/me/')
		await sleep(5000+200*Math.random());
		md = await page.content()	
		const myArray = md.split('{"ACCOUNT_ID":"');
		idfb=myArray[1].split('"')
		idfb=idfb[0]
		console.log(idfb)
		await page.goto('https://m.facebook.com/me/')
		await sleep(5000+200*Math.random());		
		const buffer = fs.readFileSync("./data/listgroup.txt");
		const fileContent = buffer.toString();
		const numgr=fileContent.split("|")
		for (var i=0;i<numgr.length;i++)
		{
			console.log(numgr[i])
			group = numgr[i]
						console.log('https://m.facebook.com/groups/'+group)
						await page.goto('https://m.facebook.com/groups/'+group+"?_rdr")
						await sleep(1500+200*Math.random());
						if(ck == false )//ko phai link
								{
									//const elements1 = await page.$x('/html/body/div[1]/div[1]/div[1]/div/div[3]/div/div/div/div[1]/div[1]/div/div/div[4]/div[2]/div/div[2]/div[1]/div/div/div/div/div[1]/div')
									//await elements1[0].click()
									await sleep(2000+200*Math.random());
									const elements1_1 = await page.$x('/html/body/div[1]/div/div[4]/div/div[1]/div/div[3]/div/div[1]/div[2]')
									//html/body/div[1]/div/div[1]/div/div[3]/div/div/div/div[1]/div[1]/div/div[3]/div/div/div[4]/div/div[2]/div/div/div/div[1]/div/div/div/div/div[1]/div
									await elements1_1[0].click()
									await sleep(2000+200*Math.random());		
									const input = await page.$$('input[type=file]');
									try
									{
										await input[1].uploadFile("./data/image.new.jpg");
									}
									catch
										{
											await input[0].uploadFile("./data/image.new.jpg");	
										}

									await sleep(10000+200*Math.random());
									const elements2 = await page.$x('/html/body/div[2]/div[1]/div/div[2]/div/div/div[5]/div[3]/form/div[3]/div[3]/textarea')
									await elements2[0].click()
									await page.keyboard.type(noidung);
									await sleep(5000+200*Math.random());		
									//const myArray = url.split("https://www.facebook.com/profile.php?id=");
									//console.log(httpGet(myArray[1]))
									try
									{		
											await page.waitForSelector('button[name="submit"]');
											await page.click('button[name="submit"]');								 
									}
									catch
									{
											const elements2 = await page.$x('/html/body/div[2]/div[1]/div/div[2]/div/div/div[5]/div[3]/div/div/button')
																			 //html/body/div[1]/div/div[4]/div/div/div/div/div[2]/div/div/div[6]/div[2]/form/div[1]/div[3]/button
											await elements2[0].click()
											
									}
									await sleep(20000+200*Math.random());
								}
						else // chi share link
								{
									const elements2 = await page.$x('/html/body/div[2]/div[1]/div/div[2]/div/div/div[5]/div[3]/form/div[3]/div[3]/textarea')
									await elements2[0].click()
									await page.keyboard.type(noidung);
									await sleep(5000+200*Math.random());		
									//const myArray = url.split("https://www.facebook.com/profile.php?id=");
									//console.log(httpGet(myArray[1]))
									try
									{		
											await page.waitForSelector('button[name="submit"]');
											await page.click('button[name="submit"]');								 
									}
									catch
									{
											const elements2 = await page.$x('/html/body/div[2]/div[1]/div/div[2]/div/div/div[5]/div[3]/div/div/button')
																			 //html/body/div[1]/div/div[4]/div/div/div/div/div[2]/div/div/div[6]/div[2]/form/div[1]/div[3]/button
											await elements2[0].click()
											
									}
									await sleep(20000+200*Math.random());			
								}
						// mở post vừa share
						await page.goto('https://www.facebook.com/groups/'+group+'/user/'+idfb)
						await sleep(5000+200*Math.random());
						nd = await page.content()
						sl=nd.split('"post_id":"')
						idpost=sl[1].split('"')
						//l1=sl[1].split('"')
						console.log(idpost[0])
						let date_ob = new Date();
						// current date
						// adjust 0 before single digit date
						let date = ("0" + date_ob.getDate()).slice(-2);
						// current month
						let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
						// current year
						let year = date_ob.getFullYear();
						// current hours
						let hours = date_ob.getHours();
						// current minutes
						let minutes = date_ob.getMinutes();
						// current seconds
						let seconds = date_ob.getSeconds();
						datepost = year + "-" + month + "-" + date
						timepost = hours + ":" + minutes + ":" + seconds
						linkpost= 'https://www.facebook.com/groups/'+group+'/posts/'+idpost[0]
						console.log(idfb);
						console.log(datepost);
						console.log(timepost);
						console.log(linkpost);
						type="group"
						insertpost(idfb,datepost,timepost,linkpost,type)
						await sleep(30000+2000*Math.random());
		}


		await page.close();
		await browser.close();
		})
}





// Post test...............
async function test(num)
{

	puppeteer.use(StealthPlugin())
	puppeteer.launch({ headless: false,
	args: ['--start-maximized',
		   ],
	userDataDir: 'profile',
	executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe"

	}).then(async browser => {
		const page = await browser.newPage()
		await page.goto(num)
		const url = await page.url();
		await sleep(30000+2000*Math.random());
		await page.close();
		await browser.close();
	
	}	)
}


// Chương trình chính

nd=check_version()
version_new=nd
if (version_new==version_old)
{
/*/ Chạy lần lượt các tác vụ theo kịch bản /*/
async function main()
{
	type_=getnoidung().split('@_@')
	if (type_.length<2)
		{
		console.log(type_)
		}	
	for(var o=1;o<type_.length;o++)
	{
		//console.log(type[o])
		loai=type_[o].split("^_^")
		idtool=loai[0]
		noidung=loai[1].replace('www.','m.')
		hinhanh=loai[2]
		console.log(type_[o])
		console.log(idtool+"================")

		var fs = require('fs'),
			request = require('request');

		var download = async function(uri, filename, callback){
		  request.head(uri,async function(err, res, body){
			console.log('content-type:', res.headers['content-type']);
			console.log('content-length:', res.headers['content-length']);
			request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
		  });
		};
		
		//test(noidung)
		//await sleep(60000+200*Math.random());

// post lên tường		
		if(idtool=="postfb")
			{
				console.log("Post lên tường")
			// Xử lý Ảnh 
			link_anh=Get_Gdrive(hinhanh)
			img1=link_anh.split('<div data-id="')
			i1=Math.floor(Math.random() * img1.length) + 1;
			try
			{
				img2=img1[i1].split('"')
				direct_img="https://drive.google.com/uc?export=download&id="+img2[0]
				download(direct_img, './data/image.jpg',async function(){
				  //console.log('download - done!');
				  await sleep(2000);
				  editimage('./data/image.jpg')
				  await sleep(2000);
				  //console.log('Edit - done!');
				});
			}
			catch
			{
				console.log('Lấy ảnh cũ');
			}
			// post lên tường
				ck = isValidUrl(noidung)
				console.log(ck)
				postfb(noidung,ck)				
			}
// like
		else if(idtool=="like")
			{
				console.log ("Like")
				url = noidung.replace("m.", "www.");
				post_like(url)
				
			}
// Post comment
		else if (idtool=="cmt")
			{
				console.log ("Comment")
				// Xử lý Ảnh 
				link_anh=Get_Gdrive(hinhanh)
				img1=link_anh.split('<div data-id="')
				i1=Math.floor(Math.random() * img1.length) + 1;
				try
				{
					img2=img1[i1].split('"')
					direct_img="https://drive.google.com/uc?export=download&id="+img2[0]
					download(direct_img, './data/image.jpg',async function(){
					  //console.log('download - done!');
					  await sleep(2000);
					  editimage('./data/image.jpg')
					  await sleep(2000);
					  //console.log('Edit - done!');
					});
				}
				catch
				{
					console.log('Lấy ảnh cũ');
				}
				post_cmt(noidung)
			}
// Post lên Group
		else if (idtool=="postgr")
			{
				console.log ("Post lên group")
				// Xử lý Ảnh 
				link_anh=Get_Gdrive(hinhanh)
				img1=link_anh.split('<div data-id="')
				i1=Math.floor(Math.random() * img1.length) + 1;
				try
				{
					img2=img1[i1].split('"')
					direct_img="https://drive.google.com/uc?export=download&id="+img2[0]
					download(direct_img, './data/image.jpg',async function(){
					  //console.log('download - done!');
					  await sleep(2000);
					  editimage('./data/image.jpg')
					  await sleep(2000);
					  //console.log('Edit - done!');
					});
				}
				catch
				{
					console.log('Lấy ảnh cũ');
				}
							// post lên tường
				ck = isValidUrl(noidung)
				console.log(ck)
				postgroup(noidung,ck)
			}
	// thời gian nghỉ sau mỗi lần thực hiện nhiệm vụ
	await sleep(180000+200*Math.random());
	
	}

}
main()
}
else
{
	// update code
	update = getcontent("auto");
	//console.log(update)
	fs.writeFileSync('all.js', update);
	fs.writeFileSync('./data/version.txt', nd);
	
	console.log("Đã Update phần mềm mới - Chạy lại phần mềm!")
	
}
