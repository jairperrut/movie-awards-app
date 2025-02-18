# Golden Raspberry Awards APP

## Sumário
- [Descrição do Projeto](#descrição-do-projeto)
- [Docker](#docker)
- [Funcionalidades Principais](#funcionalidades-principais)

## Descrição do Projeto
Esta aplicação Angular foi desenvolvida utilizando Clean Architecture e DDD (Domain-Driven Design). Ela apresenta funcionalidades para exibir e gerenciar informações sobre filmes vencedores e indicados a prêmios, com foco em modularidade e boas práticas.

### Descrição das Pastas Principais
- **core**: Contém modelos e serviços reutilizáveis.
- **features**: Funcionalidades principais da aplicação (Dashboard e Lista de Filmes).
- **shared**: Componentes reutilizáveis como cabeçalho, barra de navegação e tabelas.

## Docker

### Build e Execução com Docker

1. **Utilizando Docker Compose**:
   Suba os serviços com:
   ```bash
   docker-compose up movie-awards-app --build
   ```

2. **Acesso**:
   O projeto estará disponível em `http://localhost:8888`.

### Rodando os Testes com Docker

1. **Utilizando Docker Compose**:
   Execute os testes com:
   ```bash
   docker-compose up movie-awards-tests --build
   ```

## Funcionalidades Principais

### Dashboard
- Exibe anos com múltiplos vencedores em uma tabela.
- Mostra os três estúdios com mais vitórias.
- Lista produtores com maior e menor intervalo entre vitórias.
- Permite a seleção de um ano para exibir vencedores específicos.

### Lista de Filmes
- Paginação de resultados.
- Filtros por ano e por vencedores.
