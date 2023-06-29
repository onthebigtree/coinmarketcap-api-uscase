// 该函数获取特定的加密货币数据，并将数据写入 Google Sheets
function getSpecificCoinData() {
  var coins = ['bitcoin', 'ethereum']; // 在这个数组中列出你感兴趣的货币
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet(); // 获取当前活动的工作表

  // 遍历数组中的每一种货币
  for (var j = 0; j < coins.length; j++) {
    // 为每种货币创建 URL
    var url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?slug=' + coins[j];
    var headers = {
      'X-CMC_PRO_API_KEY': 'your-api-key', // 请替换成你的 CoinMarketCap API 密钥
      'Accept': 'application/json'
    };

    // 设置请求选项
    var options = {
      'method' : 'get', 
      'headers': headers, 
      'muteHttpExceptions': true 
    };
  
    var response = UrlFetchApp.fetch(url, options);
    var json = JSON.parse(response.getContentText());
    var data = json.data; // 获取数据

    // 遍历数据中的每一项
    var coinKeys = Object.keys(data);
    for(var i = 0; i < coinKeys.length; i++) {
      // 将每一项的名字和美元价格添加到工作表的新一行
      sheet.appendRow([data[coinKeys[i]].name, data[coinKeys[i]].quote.USD.price]);
    }
  }
}

// 该函数创建一个触发器，每 20 分钟运行一次 getSpecificCoinData 函数
function createTrigger() {
  ScriptApp.newTrigger('getSpecificCoinData') // 创建一个新的触发器，触发函数是 getSpecificCoinData
    .timeBased() // 触发器是基于时间的
    .everyMinutes(20) // 设置为每 20 分钟运行一次
    .create(); // 创建触发器
}
