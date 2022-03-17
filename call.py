import requests

base = "http://nickwood5.pythonanywhere.com/"

response = requests.get("http://nickwood5.pythonanywhere.com/helloworld/nick/5")
print(response.json())


#response = requests.get(base + "test/hiii/1_3&1_4&3_5")
#print(response.json())


#response = requests.get(base + "retrieve") 
#print(response.json())