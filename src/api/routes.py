"""
This module takes care of handling the API routes
"""
from datetime import timedelta
from flask import request, jsonify, Blueprint
from api.models import db, User
from flask_jwt_extended import (
    create_access_token,
    jwt_required,
    get_jwt_identity
)

api = Blueprint('api', __name__)

#sign up
@api.route('/signup', methods=['POST'])
def signup():
    data = request.get_json() or {}

    email = data.get("email")
    password = data.get("password")
    name = data.get("name")
    last_name = data.get("last_name")

    if not email or not password:
        return jsonify({"error": "Email y contraseña son obligatorios"}), 400

    user_exists = User.query.filter_by(email=email).first()
    if user_exists:
        return jsonify({"error": "Usuario ya registrado"}), 409

    new_user = User(
        email=email,
        name=name,
        last_name=last_name,
        is_active=True
    )
    new_user.set_password(password)

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "Usuario creado exitosamente"}), 201


#login
@api.route('/login', methods=['POST'])
def login():
    data = request.get_json() or {}

    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email).first()

    if not user or not user.check_password(password):
        return jsonify({"msg": "Correo o contraseña incorrectos"}), 401

    token = create_access_token(
        identity=str(user.id),
        expires_delta=timedelta(days=10)
    )

    return jsonify({
        "token": token,
        "user": user.serialize()
    }), 200


#perfil privado
@api.route('/private', methods=['GET'])
@jwt_required()
def private():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if not user:
        return jsonify({"msg": "Usuario no encontrado"}), 404

    return jsonify(user.serialize()), 200
