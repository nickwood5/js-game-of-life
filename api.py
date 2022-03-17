from flask import Flask
from flask_restful import Api, Resource
from game_of_life_api_functions import blueprint_name_exists
from game_of_life_api_functions import insert_blueprint

app = Flask(__name__)
api = Api(app)

class HelloWorld(Resource):
    def get(self, name, test):
        return {"name": name, "test": test}

class insertBlueprint(Resource):
    def get(self, blueprint_name, blueprint_input):
        if blueprint_name_exists(blueprint_name):
            return {"result": "failure"}
        
        insert_blueprint(blueprint_input, blueprint_name)
        return {"result": "success"}

class retrieveBlueprints(Resource):
    

api.add_resource(HelloWorld, "/helloworld/<string:name>/<int:test>")
api.add_resource(insertBlueprint, "/test/<string:blueprint_name>/<string:blueprint_input>")

if __name__ == "__main__":
    app.run(debug=True)