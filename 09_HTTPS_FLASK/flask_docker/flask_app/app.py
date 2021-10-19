from flask import Flask, request

server = Flask(__name__)

@server.route('/search',methods=['GET','POST'])
def hello_world():
    if request.method == 'GET':
        dev = request.args["dev"]
        msg = request.args["msg"]
    else :
        dev = request.form["dev"]
        msg = request.form["msg"]
    res = "{}로 전달된 데이터 ({},{})".format(request.method,dev, msg)
    return res

