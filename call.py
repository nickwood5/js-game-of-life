import requests

base = "http://nickwood5.pythonanywhere.com/"

response = requests.get(base + "helloworld/nick/5")
print(response.json())


response = requests.get(base + "test/test/1_3&1_4")
print(response.json())


pattern = {"a"}