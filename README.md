
# Secure Schedule Wiki

Bem-vindo à wiki do projeto Secure Schedule. Aqui você encontrará todas as informações relacionadas ao projeto, incluindo documentação técnica, guias de desenvolvimento e análise de tecnologias utilizadas.

## Índice
1. [Visão Geral do Projeto](#visão-geral-do-projeto)
2. [Histórico da Linguagem Rust](#histórico-da-linguagem-rust)
3. [Comparação: Rust vs C](#comparação-rust-vs-c)
   - [Custo](#custo)
   - [Construtores](#construtores)
   - [Legibilidade](#legibilidade)
   - [Exemplos](#exemplos)
   - [Por que Rust é Melhor que C](#por-que-rust-é-melhor-que-c)
4. [Guia de Configuração e Desenvolvimento](#guia-de-configuração-e-desenvolvimento)
5. [FAQs e Solução de Problemas](#faqs-e-solução-de-problemas)

## Visão Geral do Projeto

O projeto Secure Schedule tem como objetivo desenvolver uma aplicação segura para gerenciamento de agendas. Utilizaremos a linguagem Rust devido às suas características de segurança e desempenho, bem como outras tecnologias complementares.

## Histórico da Linguagem Rust

Rust é uma linguagem de programação de sistemas desenvolvida pela Mozilla Research, com o objetivo de oferecer segurança e desempenho. Foi anunciada em 2010 e a versão 1.0 foi lançada em 2015. Rust é conhecida por seu sistema de tipos que previne erros comuns de memória e por seu gerenciamento de memória sem necessidade de um coletor de lixo (garbage collector).

**Características principais do Rust:**
- **Segurança de memória:** Rust previne falhas de segmentação e outras falhas comuns relacionadas à memória.
- **Concorrência:** Oferece um modelo de concorrência seguro, evitando condições de corrida.
- **Desempenho:** Comparável a linguagens de baixo nível como C e C++.

## Comparação: Rust vs C

### Custo

- **Rust:** Rust é uma linguagem gratuita e open-source, assim como suas bibliotecas e ferramentas. A curva de aprendizado pode ser íngreme devido ao seu sistema de propriedades e de tipos, mas o tempo investido em aprender Rust compensa pela redução de erros e aumento de produtividade a longo prazo.
- **C:** C também é uma linguagem gratuita e open-source, com uma ampla variedade de bibliotecas e ferramentas disponíveis. A curva de aprendizado é menor em comparação com Rust, mas os desenvolvedores podem enfrentar mais desafios relacionados a erros de memória e segurança, o que pode aumentar os custos de manutenção.

### Construtores

- **Rust:** Rust não possui construtores no mesmo sentido que C++, mas utiliza métodos associados (`impl`) para inicializar e configurar instâncias de structs. Isso oferece uma maior flexibilidade e controle sobre a criação e inicialização de objetos.
  ```rust
  struct Rectangle {
      width: u32,
      height: u32,
  }

  impl Rectangle {
      fn new(width: u32, height: u32) -> Rectangle {
          Rectangle { width, height }
      }
  }

  let rect = Rectangle::new(30, 50);
  ```

- **C:** C não possui construtores nativos. A inicialização de structs é feita manualmente, o que pode levar a um código mais verboso e suscetível a erros.
  ```c
  struct Rectangle {
      unsigned int width;
      unsigned int height;
  };

  struct Rectangle create_rectangle(unsigned int width, unsigned int height) {
      struct Rectangle rect;
      rect.width = width;
      rect.height = height;
      return rect;
  }

  struct Rectangle rect = create_rectangle(30, 50);
  ```

### Legibilidade

- **Rust:** Rust é projetado para ser expressivo e legível, com um forte sistema de tipos que ajuda a capturar erros em tempo de compilação. Sua sintaxe moderna facilita a leitura e compreensão do código.
- **C:** C tem uma sintaxe mais simples e direta, mas carece de muitos recursos de segurança e abstração encontrados em Rust. Isso pode levar a código menos legível e mais propenso a erros.

### Exemplos

**Exemplo 1: Alocação de Memória**

- **Rust:**
  ```rust
  fn main() {
      let x = Box::new(10); // Alocação segura na heap
      println!("{}", x);
  }
  ```

- **C:**
  ```c
  #include <stdio.h>
  #include <stdlib.h>

  int main() {
      int *x = (int *)malloc(sizeof(int));
      if (x == NULL) {
          return 1; // Falha na alocação de memória
      }
      *x = 10;
      printf("%d
", *x);
      free(x);
      return 0;
  }
  ```

**Exemplo 2: Concorrência**

- **Rust:**
  ```rust
  use std::thread;

  fn main() {
      let handle = thread::spawn(|| {
          println!("Hello from a thread!");
      });

      handle.join().unwrap();
  }
  ```

- **C:**
  ```c
  #include <pthread.h>
  #include <stdio.h>

  void* print_message(void* ptr) {
      printf("Hello from a thread!
");
      return NULL;
  }

  int main() {
      pthread_t thread;
      pthread_create(&thread, NULL, print_message, NULL);
      pthread_join(thread, NULL);
      return 0;
  }
  ```

## Por que Rust é Melhor que C

1. **Segurança de Memória:** Rust garante segurança de memória em tempo de compilação, evitando vulnerabilidades comuns como buffer overflows, que são frequentes em C.
2. **Gerenciamento de Memória:** Rust gerencia memória de forma automática e eficiente sem necessidade de um garbage collector, enquanto C requer gerenciamento manual, propenso a erros.
3. **Concorrência:** Rust oferece um modelo de concorrência seguro que evita condições de corrida, diferente de C, onde a concorrência segura depende fortemente da disciplina do programador.
4. **Sistema de Tipos:** O sistema de tipos de Rust é mais expressivo e rigoroso, ajudando a capturar mais erros em tempo de compilação.
5. **Produtividade:** Apesar da curva de aprendizado, Rust pode aumentar a produtividade a longo prazo devido à redução de erros e a necessidade de menos depuração.

## Guia de Configuração e Desenvolvimento

1. **Instalação do Rust:**
   - Siga as instruções oficiais para instalar Rust: [Instalação do Rust](https://www.rust-lang.org/tools/install)

2. **Configuração do Ambiente:**
   - Configure seu IDE ou editor de texto preferido para suportar Rust. Recomenda-se o uso do Visual Studio Code com a extensão Rust.

3. **Criando um Novo Projeto:**
   - Utilize o Cargo, a ferramenta de gerenciamento de pacotes e build do Rust.
     ```sh
     cargo new secure_schedule
     cd secure_schedule
     ```

4. **Estrutura do Projeto:**
   - A estrutura básica do projeto será a seguinte:
     ```
     secure_schedule/
     ├── src/
     │   └── main.rs
     ├── Cargo.toml
     └── README.md
     ```

## FAQs e Solução de Problemas

**Pergunta:** Como depurar erros de memória no Rust?
**Resposta:** Utilize ferramentas como `valgrind` para C, mas no Rust, a maioria dos erros de memória são prevenidos em tempo de compilação. Ferramentas como `cargo check` e `clippy` também ajudam a encontrar e corrigir erros.

**Pergunta:** Como lidar com bibliotecas C no Rust?
**Resposta:** Use `FFI` (Foreign Function Interface) para integrar bibliotecas C no Rust. Consulte a documentação oficial para mais detalhes.
