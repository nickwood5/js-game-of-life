import requests

base = "http://nickwood5.pythonanywhere.com/"

response = requests.get("http://nickwood5.pythonanywhere.com/helloworld/nick/5")
print(response.json())


response = requests.get(base + "gameoflife/insert/aa/24_10&24_11&24_12&24_13&24_14&24_15&25_7&25_8&25_9&25_15&25_16&25_17&25_18&26_6&26_7&26_15&26_16&26_18&26_19&26_20&27_5&27_6&27_14&27_15&27_16&27_20&28_4&28_5&28_14&28_16&29_14&29_16&30_15&30_16")
print(response.json())


response = requests.get(base + "retrieve") 
print(response.json())