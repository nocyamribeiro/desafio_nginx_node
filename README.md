# Desafio

Nesse desafio você colocará em prática o que aprendemos em relação a utilização do nginx como proxy reverso. A idéia principal é que quando um usuário acesse o nginx, o mesmo fará uma chamada em nossa aplicação node.js. Essa aplicação por sua vez adicionará um registro em nosso banco de dados mysql, cadastrando um nome na tabela people.

O retorno da aplicação node.js para o nginx deverá ser:

<h1>Full Cycle Rocks!</h1>

- Lista de nomes cadastrada no banco de dados.

Gere o docker-compose de uma forma que basta apenas rodarmos: docker-compose up -d que tudo deverá estar funcionando e disponível na porta: 8080.

## Proposta de solução

Para atender os requisitos utilizou-se de um docker-compose com três serviços associados:
- app: serviço responsável pela aplicação node.
- db: serviço responsável pelo banco de dados que a aplicação node faz acesso.
- nginx: responsável pelo proxy de acesso da aplicação a partir do endereço http://localhost:8080

### Estratégia de desenvolvimento da aplicação

A aplicação tomou como base as explicações feitas nas aulas a partir deste [arquivo](https://github.com/codeedu/fullcycle2.0-devops-docker/blob/main/node/index.js).
Algumas responsabilidades foram separadas por meio de funções para facilitar a leitura e a função listPeople ficou responsável por fazer o select no banco e retornar cada nome no formato html <ul><li>. Para gerar nomes diferentes foi utilizado uma biblioteca que gera nomes, e no caso deste desafio foi escolhido o dicionário dos nomes dos personagens do Star Wars.
Toda vez que sobe a aplicação, a partir do comando `docker-compose up`, um novo nome é cadastrado.

### Construção do banco

Para forçar o banco de dados já possui a tabela que era necessária para a aplicação node, o arquivo /scripts/schema.sql foi criado. Este arquivo é chamado na construção do container do mysql, pois
foi adicionado, a partir do volume deste serviço, em um diretório que tem a função de subir arquivos .sql na inicialização do banco, o /docker-entrypoint-initdb.d.


