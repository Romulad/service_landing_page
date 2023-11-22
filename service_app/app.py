from flask import Flask


from home_services.views import home_service_bp


app = Flask(__name__, static_url_path="/soft_static")
app.register_blueprint(home_service_bp)