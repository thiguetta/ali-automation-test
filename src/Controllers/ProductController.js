const webdriver = require('selenium-webdriver');
const chrome = require("selenium-webdriver/chrome");
const {By} = require('selenium-webdriver');

const options = new chrome.Options().headless().addArguments("--no-sandbox", "--disable-dev-shm-usage")

exports.getProducts = (req, res, next) => {
    /**
     #swagger.start
     #swagger.path = '/products'
     #swagger.method = 'get'
     #swagger.tags = ['Products']
     #swagger.description = 'Paginated search for products'
     #swagger.parameters['term'] = {
        in: 'query',
        description: 'search term',
        type: 'string'
     }
     #swagger.parameters['page'] = {
       in: 'query',
       description: 'search page',
       type: 'string'
     }
     #swagger.responses[200] = {
       schema: {
         totalPages: 10,
         selectedPage: 1,
         products: [{
           id: "1",
           name: "some product",
           url: "product_url.html"
         }]
       },
       description: 'Products found.'
     }
     #swagger.end
     */
    (async function () {
        try {
            let driver = new webdriver.Builder()
                .forBrowser('chrome')
                .setChromeOptions(options)
                .build();
            if (typeof req.query.page == 'undefined') {
                req.query.page = 1
            }
            await driver.get(`https://www.aliexpress.com/wholesale?SearchText=${req.query.term}&page=${req.query.page}`);
            let pixelCount = 200;
            // alternatively we can use By.css("span.total-page") but in this case we opt to use xpath
            let totalPageElement = await driver.findElements(By.xpath(".//span[@class='total-page']"))
            // search results page is dynamically loaded, so we need to keep scrolling down until we reach the page bar,
            // this way we guarantee we have all the listed products for that page
            // we scroll down 200px at a time
            while (totalPageElement.length == 0) {
                await driver.executeScript(`window.scrollTo(0, ${pixelCount})`);
                pixelCount += 200;
                totalPageElement = await driver.findElements(By.xpath(".//span[@class='total-page']"))
            }
            // span total-page is unique in the page, so we can safely get the first element of the array
            let totalPages = await totalPageElement[0].getText();
            let productElements = await driver.findElements(By.css("._3t7zg._2f4Ho"));
            let selectedPage = await driver.findElement(By.css("button.next-btn.next-medium.next-btn-normal.next-pagination-item.next-current")).getText()
            let result = {
                //total pages is in sentence 'Total \d+ pages', so we grab only the number using regex
                totalPages: parseInt(totalPages.match(/\d+/)[0]),
                selectedPage: parseInt(selectedPage),
                products: []
            };
            for (let p of productElements) {
                let url = await p.getAttribute("href");
                let name = await p.findElement(By.css("h1._18_85")).getText();
                let id = url.match(/\d+/)[0]
                result.products.push({
                    id: id,
                    name: name,
                    url: url
                });
            }
            await driver.quit();
            res.json(result);
        } catch (e) {
            console.log(e);
        }
    })();
};

exports.getProductById = (req, res, next) => {
    /**
     #swagger.start
     #swagger.path = '/product/{id}'
     #swagger.method = 'get'
     #swagger.tags = ['Products']
     #swagger.description = 'Get Product by ID'
     #swagger.parameters['id'] = {
        description: 'product ID',
        type: 'string'
     }
     #swagger.responses[200] = {
       schema: {
         productName: "some product",
         productPrice: "US$ 1.00",
         productInStock: 200
       },
       description: 'Product found.'
     }
     #swagger.end
     */
    (async function () {
        try {
            let driver = new webdriver.Builder()
                .forBrowser('chrome')
                .setChromeOptions(options)
                .build();
            await driver.get(`https://www.aliexpress.com/item/${req.params.id}.html`);
            let productName = await driver.findElement(By.css("h1.product-title-text")).getText();
            let productPrice = await driver.findElement(By.css("span.product-price-value")).getText();
            let productInStock = await driver.findElement(By.css("div.product-quantity-info")).getText();
            await driver.quit();
            res.json({
                productName: productName,
                productPrice: productPrice,
                //available stock is in sentence '\d+ Pieces available', so we grab only the number using regex
                productInStock: parseInt(productInStock.match(/\d+/)[0])
            });
        } catch (e) {
            console.log(e)
        }
    })();
};
