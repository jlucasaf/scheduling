// @generated automatically by Diesel CLI.

diesel::table! {
    tarefas (id) {
        id -> Int4,
        usuario_id -> Int4,
        tittle -> Text,
        descricao -> Text,
        concluida -> Bool,
    }
}

diesel::table! {
    usuario (id) {
        id -> Int4,
        username -> Text,
        password_hash -> Text,
    }
}

diesel::joinable!(tarefas -> usuario (usuario_id));

diesel::allow_tables_to_appear_in_same_query!(
    tarefas,
    usuario,
);
