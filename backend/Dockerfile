# Use a imagem oficial do Rust
FROM rust:latest

# Copie o código fonte para o contêiner
WORKDIR /usr/src/todo_list_backend
COPY . .

# Compile o projeto
RUN cargo build --release

# Defina o comando de inicialização
CMD ["./target/release/todo_list_backend"]
