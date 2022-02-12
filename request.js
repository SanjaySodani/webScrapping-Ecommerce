const request = require('request-promise');
const cheerio = require('cheerio');
const { dbUrl, MongoClient } = require('./dbConfig');

// Get data from Amazon and update in MongoDB
let amazonURL = 'https://www.amazon.in/b/?_encoding=UTF8&node=1389401031&ref_=sv_top_elec_mega_1';

async function getDataFromAmazon() {
    // First delete all data to get fresh products
    let client = await MongoClient.connect(dbUrl);
    try {
        let db = await client.db('test');
        let document = await db.collection('products').deleteMany();
        console.log(document);
    } catch (error) {
        console.log(error);
    } finally {
        client.close();
    }

    let response = await request({
        uri: amazonURL,
        headers: {
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "en-US,en;q=0.9"
        },
        gzip: true
    });

    let $ = cheerio.load(response);
    let products = [];

    $('div[class="_octopus-search-result-card_style_apbSearchResultItem__2-mx4"]').each(function (i, e) {
        products.push({
            title: $('h2[class="a-size-mini a-spacing-none a-color-base s-line-clamp-4"] > a > span', e).text().trim(),
            image: $('div[class="a-section aok-relative s-image-square-aspect"] > img[class="s-image"]', e).attr('src'),
            rating: $('a[class="a-popover-trigger a-declarative"] > i > span[class="a-icon-alt"]', e).text().trim(),
            finalPrice: $('span[class="a-price"] > span > span[class="a-price-whole"]', e).text().trim(),
            originalPrice: $('span[class="a-price a-text-price"] > span[class="a-offscreen"]', e).text().trim()
        });
    });

    client = await MongoClient.connect(dbUrl);
    try {
        let db = await client.db('test');
        let document = await db.collection('products').insertMany(products);
        console.log(document);
    } catch (error) {
        console.log(error);
    } finally {
        client.close();
    }
}

// Get data from Flipkart and update in MongoDB
let flipkartURL = 'https://www.flipkart.com/audio-video/~cs-53mrbtcuf5/pr?sid=0pm&collection-tab-name=Audio+And+Video&p%5B%5D=facets.fulfilled_by%255B%255D%3DFlipkart%2BAssured&p%5B%5D=facets.availability%255B%255D%3DExclude%2BOut%2Bof%2BStock&p%5B%5D=facets.rating%255B%255D%3D4%25E2%2598%2585%2B%2526%2Babove&fm=neo%2Fmerchandising&iid=M_3306207c-b1f2-473d-a17a-b18ab5af8b1a_2_372UD5BXDFYS_MC.9JGNW7M0TUHD&otracker=hp_rich_navigation_1_2.navigationCard.RICH_NAVIGATION_Electronics~Audio~All_9JGNW7M0TUHD&otracker1=hp_rich_navigation_PINNED_neo%2Fmerchandising_NA_NAV_EXPANDABLE_navigationCard_cc_1_L2_view-all&cid=9JGNW7M0TUHD';

async function getDataFromFlipkart() {
    let response = await request({
        uri: flipkartURL,
        headers: {
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "en-US,en;q=0.9"
        },
        gzip: true
    });

    let $ = cheerio.load(response);
    let products = [];

    $('div[class="_4ddWXP"]').each(function (index, item) {
        products.push({
            title: $('a[class="s1Q9rs"]', item).text().trim(),
            image: $('div[class="CXW8mj"] > img[class="_396cs4 _3exPp9"]', item).attr('src'),
            rating: $('div[class="gUuXy- _2D5lwg"] > span > div[class="_3LWZlK"]', item).text().trim(),
            finalPrice: $('div[class="_25b18c"] > div[class="_30jeq3"]', item).text().trim(),
            originalPrice: $('div[class="_25b18c"] > div[class="_3I9_wc"]', item).text().trim()
        });
    });

    let client = await MongoClient.connect(dbUrl);
    try {
        let db = await client.db('test');
        let document = await db.collection('products').insertMany(products);
        console.log(document);
    } catch (error) {
        console.log(error);
    } finally {
        client.close();
    }
}

module.exports = { getDataFromAmazon, getDataFromFlipkart };