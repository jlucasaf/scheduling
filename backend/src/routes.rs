use actix_web::web;
use crate::user::user_routes::user_routes;


pub fn routes(cfg: &mut web::ServiceConfig) {
    user_routes(cfg);
    // Aqui você pode adicionar outras rotas conforme necessário
}



