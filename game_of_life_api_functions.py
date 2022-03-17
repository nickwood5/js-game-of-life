import json, os

def insert_blueprint(blueprint_input, blueprint_name):

    split_input = blueprint_input.split("&")
    print(split_input)

    blueprint = []

    for coordinate in split_input:
        formatted_coordinate = coordinate.split("_")
        print(formatted_coordinate)
        blueprint.append(formatted_coordinate)

    design = {}
    print(blueprint)
    design["blueprint"] = blueprint

    print(design)

    with open('game_of_life/game_of_life_database.json') as json_file:
        database = json.load(json_file)
    
    database[blueprint_name] = blueprint

    with open('game_of_life/game_of_life_database.json', 'w') as outfile:
        json.dump(database, outfile)


def blueprint_name_exists(blueprint_name):
    with open('game_of_life/game_of_life_database.json') as json_file:
        database = json.load(json_file)
    
    keys = list(database.keys())
    if blueprint_name in keys:
        return True
    
    return False

#insert_blueprint("5_5&3_3&9_0", "dad")
#print(blueprint_name_exists("3"))