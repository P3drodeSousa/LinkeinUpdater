const puppeteer = require('puppeteer');
const fs = require('fs');
const URL = 'https://www.linkedin.com/checkpoint/lg/login?trk=hb_signin';
const RecaptchaPlugin = require('puppeteer-extra-plugin-recaptcha')
let relations = '';


require('dotenv').config();

(async () => {

    try {

         //headless to true in production OR just remove headless arg
    const browser = await puppeteer.launch({headless: false , args: [
        '--window-size=1920,1080',
      ],});

    const page = await browser.newPage();
    

    await page.goto(URL, {waitUntil: 'networkidle2'});

    //only in develloppement  / Delete before production
    await page.setViewport({
        width: 1600,
        height: 800
    })

        // Login to github
        await page.type('#username', process.env.EMAIL, {delay: 30});
        await page.type('#password', process.env.PASSWORD, {delay: 30});
        await page.click('button[data-litms-control-urn="login-submit"]');
     

        await page.waitForNavigation({waitUntil: 'networkidle2'});

        // GET Connections number
        const element = await page.$(".feed-identity-widget-item__stat");
        relations  = await (await element.getProperty('textContent')).jsonValue();
    
        // Navigate to user profile
        await page.click('div[data-control-name="identity_welcome_message"]');
        await page.waitForNavigation({waitUntil: 'networkidle2'});

        // Open profile  form edit
        const elements = await page.$('[href="/in/pedros0usa/edit/intro/"]');
        await elements.click();
    

        const textToType = `have ${relations} connections`

        //Wait to modal to show
        await page.waitForSelector('div.pe-top-card-form__former-name-field')

        //Type number of Connections
        await page.type('idiv.pe-top-card-form__former-name-field .ember-text-field pe-form-field__text-input', 'test', {delay: 30})



   
//     console.log('numbers', styleNumbers);
    // await page.type(`#member-name-${texts}`, process.env.PASSWORD, {delay: 30});


// // clear the input field
// await page.evaluate(selector => {
//     document.querySelector(selector).value = ""
// }, your_selector);

// await element.type(whatever);




    // await page.screenshot({path: 'example.png'});
  

    // await browser.close();
    
    } catch (error) {
        console.log(error);
    }
   
})()