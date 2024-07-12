use actix_web::{web, HttpResponse, Responder};
use diesel::prelude::*;
use crate::db::Pool;
use crate::user::models::{Usuario, NewUsuario};
use bcrypt::{hash, verify, DEFAULT_COST};
use serde::{Deserialize, Serialize};
use jsonwebtoken::{encode, decode, Header, Validation, EncodingKey, DecodingKey};
use std::env;

#[derive(Serialize, Deserialize)]
pub struct CreateUser {
    pub username: String,
    pub password: String,
}

#[derive(Serialize, Deserialize)]
pub struct LoginUser {
    pub username: String,
    pub password: String,
}

#[derive(Serialize, Deserialize)]
pub struct Claims {
    pub sub: String,
    pub exp: usize,
}

#[derive(Serialize, Deserialize)]
pub struct LoggedUser {
    pub id: i32,
    pub username: String,
    pub token: String,
}

fn generate_jwt(user_id: i32) -> String {
    let secret = env::var("JWT_SECRET").expect("JWT_SECRET must be set");
    let expiration = chrono::Utc::now()
        .checked_add_signed(chrono::Duration::seconds(60 * 60))
        .expect("valid timestamp")
        .timestamp();
    let claims = Claims {
        sub: user_id.to_string(),
        exp: expiration as usize,
    };
    encode(&Header::default(), &claims, &EncodingKey::from_secret(secret.as_ref())).unwrap()
}

pub async fn create_user(pool: web::Data<Pool>, new_user: web::Json<CreateUser>) -> impl Responder {
    let pool = pool.clone();
    let new_username = new_user.username.clone();
    let new_password = new_user.password.clone();

    let hashed_password_result = hash(&new_password, DEFAULT_COST);
    let hashed_password = match hashed_password_result {
        Ok(hashed) => hashed,
        Err(err) => {
            eprintln!("Erro ao criar hash da senha: {:?}", err);
            return HttpResponse::InternalServerError().finish();
        }
    };

    let result = web::block(move || {
        let mut conn = pool.get().unwrap();
        diesel::insert_into(crate::schema::usuario::table)
            .values(&NewUsuario {
                username: new_username.clone(),
                password_hash: hashed_password.clone(),
            })
            .execute(&mut conn)
    })
    .await;

    match result {
        Ok(_) => HttpResponse::Ok().json(format!("Novo usuário criado: {}", new_user.username)),
        Err(_) => HttpResponse::InternalServerError().finish(),
    }
}

pub async fn login_user(pool: web::Data<Pool>, login_user: web::Json<LoginUser>) -> impl Responder {
    let pool = pool.clone();
    let username = login_user.username.clone();
    let password = login_user.password.clone();

    let result = web::block(move || {
        let mut conn = pool.get().unwrap();
        crate::schema::usuario::dsl::usuario
            .filter(crate::schema::usuario::dsl::username.eq(username))
            .first::<Usuario>(&mut conn)
    })
    .await;

    match result {
        Ok(user) => {
            let user = user.unwrap();
            if verify(&password, &user.password_hash).unwrap() {
                let token = generate_jwt(user.id);
                HttpResponse::Ok().json(LoggedUser {
                    id: user.id,
                    username: user.username,
                    token,
                })
            } else {
                HttpResponse::Unauthorized().body("Invalid credentials")
            }
        }
        Err(_) => HttpResponse::Unauthorized().body("Invalid credentials"),
    }
}

