CREATE TABLE tarefas (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL REFERENCES usuario(id),
    tittle TEXT NOT NULL,
    descricao TEXT NOT NULL,
    concluida BOOLEAN NOT NULL DEFAULT FALSE
);
