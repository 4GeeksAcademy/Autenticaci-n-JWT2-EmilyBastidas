"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from datetime import datetime, timedelta
from flask import request, jsonify, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from werkzeug.security import generate_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)
CORS(api)

#Registro

@api.route('/signup', methods=['POST'])
def signup():

    data = request.get_json() or {}
    email = data.get("email")
    password = data.get("password")
    name = data.get("name")
    last_name = data.get("last_name")

    # Validaciones

    if not email or not password:
      return jsonify({
        "error": "Email y contraseña son obligatorios"
    }), 400

    # Verificar si existe

    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"error":"Usuario registrado anteriormente, por favor verifique"}), 409

    # Crear usuario

    new_user = User(email=email, name=name, last_name=last_name, is_active=True) 
    new_user.set_password(password)

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "Usuario creado exitosamente", "user": new_user.serialize()}), 201

#Inicio de Sesión

@api.route("/login", methods=["POST"])
def login():

    data = request.get_json() or {}
    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email).first()
    if not user or not user.check_password(password):
        return jsonify({"msg": "Contraseña o correo incorrectos, intente nuevamente"}), 401
    
    # Crear token de acceso

    expires = timedelta(days=10)
    access_token = create_access_token(identity=str(user.id), expires_delta=expires)

    datos = {
        "msg": "Inicio de sesión exitoso", 
        "access_token": access_token,
        "user": user.serialize()
    }

    return jsonify({"datos": datos}), 200

#Ingreso al perfil, con validación de usuario autenticado

@api.route("/private", methods=["GET"])
@jwt_required() 
def get_user_profile():
    
    user_id = get_jwt_identity()
  
    user = User.query.get(user_id)
    if not user:
        return jsonify({"msg": "Usuario no encontrado"}), 404

    return jsonify(user.serialize()), 200

#Actualización del perfil

@api.route("/private", methods=["PUT"])
@jwt_required()
def update_user_profile():
    user_id = get_jwt_identity() 
    user = User.query.get(user_id)

    if not user:
        return jsonify({"msg": "Usuario no encontrado"}), 404
    
    data = request.get_json() or {}

    user.name = data.get("name", user.name)
    user.last_name = data.get("last_name", user.last_name)
    user.address = data.get("address", user.address)
    user.email = data.get("email", user.email) 

    try:
        db.session.commit()
        return jsonify({"msg": "Perfil actualizado", "user": user.serialize()}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "Error al actualizar perfil", "error": str(e)}), 500
    
 


    
