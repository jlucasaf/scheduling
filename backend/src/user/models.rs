use serde::{Deserialize, Serialize};
use diesel::{Queryable, Insertable};

use crate::schema::usuario;


#[derive(Debug, Serialize, Deserialize, Queryable, Insertable, Clone)]
#[diesel(table_name = usuario)]
pub struct Usuario {
    pub id: i32,
    pub username: String,
    pub password_hash: String,
}


#[derive(Insertable)]
#[diesel(table_name = usuario)]
pub struct NewUsuario {
    pub username: String,
    pub password_hash: String,
}
