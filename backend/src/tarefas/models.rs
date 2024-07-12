use serde::{Deserialize, Serialize};
use diesel::{Queryable, Insertable};

use crate::schema::todos;


#[derive(Debug, Serialize, Deserialize, Queryable, Insertable)]
#[diesel(table_name = tarefas)]
pub struct Todo {
    pub id: i32,
    pub usuario_id: i32,
    pub titulo: String,
    pub descricao: String,
    pub concluida: bool,
}

#[derive(Insertable)]
#[diesel(table_name = tarefas)]
pub struct NewTodo<'a> {
    pub usuario_id: i32,
    pub titulo: &'a str,
    pub descricao: &'a str,
}