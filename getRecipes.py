import re
from flask import *
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def main():
    file = open("recipes.txt", "r")
    file = file.read()


    recipes = file.split("______")

    data = []

    for recipe in recipes:
        if recipe != "" or recipe != None:
            info = re.split("Title:|Bean:|Time:|Servings:|Ingredients:|Instructions:", recipe)
            if len(info) == 7:
                object = {
                    "title" : info[1],
                    "bean" : info[2],
                    "time" : info[3],
                    "servings" : info[4],
                    "ingredients" : info[5],
                    "instructions" : info[6]
                }
                data.append(object)
    return jsonify(data)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)
