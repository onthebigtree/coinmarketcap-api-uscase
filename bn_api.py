import requests
import pandas as pd

# 希望追踪的货币
coins = ["BTC", "ETH", "BNB", "XRP", "ADA", "DOGE", "DOT"]

def get_coin_price(coin):
    URL = f"https://api.binance.com/api/v3/ticker/price?symbol={coin}USDT"
    response = requests.get(URL)
    data = response.json()
    return data['price']

def main():
    # 初始化数据字典
    data = {'Coin': [], 'Price': []}
    for coin in coins:
        data['Coin'].append(coin)
        data['Price'].append(get_coin_price(coin))
    
    # 创建DataFrame
    df = pd.DataFrame(data)
    
    # 写入Excel文件
    df.to_excel('crypto_prices.xlsx', index=False)

main()