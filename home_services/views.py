from flask import Blueprint, render_template

home_service_bp = Blueprint(
    "home_service", __name__, template_folder='templates')


@home_service_bp.route('/', methods=['GET'])
def home_page():
    return render_template('home.html')