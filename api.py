from flask import Flask, jsonify
import flask
from flask_restful import Api, Resource
from game_of_life_api_functions import blueprint_name_exists
from game_of_life_api_functions import insert_blueprint
from game_of_life_api_functions import retrieve_blueprints
from flask_cors import CORS

app = Flask(__name__)
api = Api(app)

class HelloWorld(Resource):
    def get(self, name, test):
        resp = flask.make_response(jsonify({"test": "text"}))
        resp.headers['Access-Control-Allow-Origin'] = '*'

        return resp

class insertBlueprint(Resource):
    def get(self, blueprint_name, blueprint_input):
        if blueprint_name_exists(blueprint_name):
            resp = flask.make_response(jsonify({"result": "failure"}))
            resp.headers['Access-Control-Allow-Origin'] = '*'
            return resp

        insert_blueprint(blueprint_input, blueprint_name)

        resp = flask.make_response(jsonify({"result": "success"}))
        resp.headers['Access-Control-Allow-Origin'] = '*'
        return resp

class retrieveBlueprints(Resource):
    def get(self):
        database = retrieve_blueprints()
        resp = flask.make_response(jsonify(database))
        resp.headers['Access-Control-Allow-Origin'] = '*'
        return resp

api.add_resource(HelloWorld, "/helloworld/<string:name>/<int:test>")
api.add_resource(insertBlueprint, "/test/<string:blueprint_name>/<string:blueprint_input>")
api.add_resource(retrieveBlueprints, "/retrieve")

if __name__ == "__main__":
    app.run(debug=True)