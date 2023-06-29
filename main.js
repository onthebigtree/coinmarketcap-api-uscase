function getSpecificCoinData() {
  var coins = ['bitcoin', 'ethereum']; // 根据需要修改这个数组，添加你感兴趣的货币
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  for (var j = 0; j < coins.length; j++) {
    var url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?slug=' + coins[j];
    var headers = {
      'X-CMC_PRO_API_KEY': 'your-api-key', // 请替换成你的 CoinMarketCap API 密钥
      'Accept': 'application/json'
    };

    var options = {
      'method' : 'get',
      'headers': headers,
      'muteHttpExceptions': true
    };
  
    var response = UrlFetchApp.fetch(url, options);
    var json = JSON.parse(response.getContentText());
    var data = json.data;

    var coinKeys = Object.keys(data);
    for(var i = 0; i < coinKeys.length; i++) {
      sheet.appendRow([data[coinKeys[i]].name, data[coinKeys[i]].quote.USD.price]);
    }
  }
}

function createTrigger() {
  ScriptApp.newTrigger('getSpecificCoinData')
    .timeBased()
    .everyMinutes(20) // 设置为每20分钟运行一次
    .create();
}
