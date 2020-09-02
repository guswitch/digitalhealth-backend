const pupputeer = require('puppeteer');
require('dotenv/config');

module.exports = {
    async getData() {
        const broswer = await pupputeer.launch();
        const page = await broswer.newPage();
        await page.goto('http://177.84.109.162:800/index_br.html');
        //await page.screenshot({path: 'example.png'});
    
        let data = []
    
        await page.type('#user', process.env.USER_MECALOR);
        await page.type('#pass', process.env.PASS_MECALOR);
        await page.click('#btnEnter');
      
        console.log('Page:', page.url());
        setTimeout(()=>{
            setInterval(async()=> {
                data = [];
                console.clear();
            
                // Technical room
                let tmpSl01 = await page.evaluate(() => document.querySelector('#tmpSl01').textContent);
                let umdSl01 = await page.evaluate(() => document.querySelector('#umdSl01').textContent);
                let dewSl01 = await page.evaluate(() => document.querySelector('#dewSl01').textContent);

                // Exams room
                let tmpSl03 = await page.evaluate(() => document.querySelector('#tmpSl03').textContent);
                let umdSl03= await page.evaluate(() => document.querySelector('#umdSl03').textContent);
                let dewSl03= await page.evaluate(() => document.querySelector('#dewSl03').textContent);
                        
                // Flow tube
                let thermicLoad = await page.evaluate(() => document.querySelector('#thermicLoad').textContent);
                let tempagTF = await page.evaluate(() => document.querySelector('#tmpAlimAG').textContent);
                let tmpRetAG = await page.evaluate(() => document.querySelector('#tmpRetAG').textContent);
                let deltaT = await page.evaluate(() => document.querySelector('#deltaT').textContent);
                let vzAlimAG = await page.evaluate(() => document.querySelector('#vzAlimAG').textContent);
                let prsAlimAG = await page.evaluate(() => document.querySelector('#prsAlimAG').textContent);

                // Exhaust fan
                let ex01_status = await page.evaluate(() => document.querySelector('#ex01_status').textContent);

                // Chiller 01
                let ch1Sts = await page.evaluate(() => document.querySelector('#ch1Sts').textContent);
                let ch1Cap = await page.evaluate(() => document.querySelector('#ch1Cap').textContent);
                let ch1Set = await page.evaluate(() => document.querySelector('#ch1Set').textContent);
                let tmpProc1 = await page.evaluate(() => document.querySelector('#tmpProc1').textContent);
            
                // Chiller 01
                let ch2Sts = await page.evaluate(() => document.querySelector('#ch2Sts').textContent);
                let ch2Cap = await page.evaluate(() => document.querySelector('#ch2Cap').textContent);
                let ch2Set = await page.evaluate(() => document.querySelector('#ch2Set').textContent);
                let tmpProc2 = await page.evaluate(() => document.querySelector('#tmpProc2').textContent);
            
                data.push(
                    {tmpSl01,umdSl01,dewSl01},
                    {tmpSl03,umdSl03,dewSl03},
                    {thermicLoad,tempagTF,tmpRetAG,deltaT,vzAlimAG,prsAlimAG},
                    {ex01_status},
                    {ch1Sts,ch1Cap,ch1Set,tmpProc1},
                    {ch2Sts,ch2Cap,ch2Set,tmpProc2}
                );
            
                return console.log(data);
            },1000)
        },500);    
    } 
}