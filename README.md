# Teste-Tecnico-BeTalent

# Endpoints Deste Projeto

## Endpoint /user

### <code class="post">POST</code> /user/signup
<details>
  <summary>📃 Body</summary>

```json
{
  "email":"email@hotmail.com",
  "password":"senha"
}
```
</details>

<details>
  <summary class="created">✅ Response Created - 201</summary>

```json
{
  "message": "user created successfully",
}
```
</details>

<details>
  <summary class="badrequest">❌ Response Bad Request - 400</summary>
Quando o campo do email ou password estão faltando

```json
{
  "message": "all fields are required"
}
```
</details>

<details>
  <summary class="badrequest">❌ Response Bad Request - 400</summary>
Quando o email inserido é inválido

```json
{
  "message": "email is invalid"
}
```
</details>

<details>
  <summary class="conflict">❌ Response Conflict - 409</summary>
Quando o usuario ja existe

```json
{
  "message": "user already exist"
}
```
</details>

### <code class="get">POST</code> /user/login
<details>
  <summary>📃 Body</summary>

```json
{
  "email":"email@hotmail.com",
  "password":"senha"
}
```
</details>

<details>
  <summary class="ok">✅ Response OK - 200</summary>

```json
{
  "type": "bearer",
  "value": "oat_Nw.Ymg5c09qVXVycVdBaGFyOVVmUURYSUtOU2I5UGxURHRmV0IwemdWcjQzMzkwNzU4Mw"
}
```
</details>

<details>
  <summary class="badrequest">❌ Response Bad Request - 400</summary>
Quando o campo do email ou password estão faltando

```json
{
  "message": "all fields are required"
}
```
</details>

<details>
  <summary class="badrequest">❌ Response Bad Request - 400</summary>
Quando o campo do email ou password são incorretos

```json
{
  "message": "password or email is incorrect"
}
```
</details>

## Endpoint /client

<details>
  <summary class="unauthorized">❌ Response Unauthorized - 401</summary>
  Quando tenta acessar qualquer uma das rotas sem o Bearer Token

```json
{
  "errors": [
    {
      "message": "Unauthorized access"
    }
  ]
}
```
</details>

### <code class="post">POST - CREATED</code> /client
<details>
  <summary>📃 Body</summary>

```json
{
  "nome": "Matheus",
  "cpf":"40615522955",
  "endereco":{
    "estado":"Santa Catarina",
    "cidade":"Florianopolis",
    "rua":"rua casa",
    "numero_casa": 2
  },
  "telefone":{
    "ddd":47,
    "numero":94840394 
  }
}
```
</details>

<details>
  <summary class="created">✅ Response Created - 201</summary>

```json
{
  "message": "customer created successfully"
}
```
</details>

<details>
  <summary class="badrequest">❌ Response Bad Request - 400</summary>
Quando o cpf é inválido

```json
{
  "message": "CPF is invalid"
}
```
</details>

<details>
  <summary class="badrequest">❌ Response Bad Request - 400</summary>
Quando um dos campos estão faltando

```json
{
  "message": "all fields are required"
}
```
</details>

<details>
  <summary class="badrequest">❌ Response Bad Request - 400</summary>
Quando o email inserido é inválido

```json
{
  "message": "email is invalid"
}
```
</details>

<details>
  <summary class="badrequest">❌ Response Bad Request - 400</summary>
Quando o cliente ja existe

```json
{
  "message": "error when registering the customer"
}
```
</details>

### <code class="get">GET - INDEX</code> /client

<details>
  <summary class="ok">✅ Response Ok - 200</summary>

```json
{
  "data": [
    {
      "id": 1,
      "nome": "Matheus",
      "cpf": "40615522955",
      "createdAt": "2024-07-17T17:40:10.000+00:00",
      "updatedAt": "2024-07-17T17:40:10.000+00:00",
      "endereco": {
        "id": 1,
        "clientId": 1,
        "estado": "Santa Catarina",
        "cidade": "Florianopolis",
        "rua": "rua casa",
        "numeroCasa": 2
      },
      "telefone": {
        "id": 1,
        "clientId": 1,
        "ddd": 47,
        "numero": 94840394
      }
    }
  ]
}
```

Caso não possua algo no banco de dados

```json
{
  "data": []
}
```
</details>

### <code class="get">GET - SHOW</code> /client/:id?mes=07&ano=2024

<details>
  <summary class="Ok">✅ Response Ok - 200</summary>

```json
{
  "data": {
    "cliente": [
      {
        "id": 1,
        "nome": "Matheus",
        "cpf": "40615522955",
        "endereco": {
          "id": 1,
          "clientId": 1,
          "estado": "Santa Catarina",
          "cidade": "Florianopolis",
          "rua": "rua casa",
          "numeroCasa": 2
        },
        "telefone": {
          "id": 1,
          "clientId": 1,
          "ddd": 47,
          "numero": 94840394
        }
      }
    ],
    "vendas": [
    {
        "id": 2,
        "clientId": 1,
        "productId": 12,
        "quantidade": 2,
        "precoUnitario": 240,
        "precoTotal": 480,
        "createdAt": "2024-07-17T17:54:48.000+00:00",
      },
      {
        "id": 1,
        "clientId": 1,
        "productId": 22,
        "quantidade": 1,
        "precoUnitario": 240,
        "precoTotal": 240,
        "createdAt": "2024-07-17T17:54:00.000+00:00",
      }
    ]
  }
}
```
Caso não seja passado mês e ano, as vendas serão filtradas por ID de forma decrescente
</details>

<details>
  <summary class="badrequest">❌ Response Bad Request - 400</summary>
Quando não é passado o id

```json
{
  "message": "error in listing customers and sales"
}
```
</details>

### <code class="put">PUT - UPDATE</code> /client/:id
<details>
  <summary>📃 Body</summary>

```json
{
  "nome": "Matheus",
  "cpf":"40615522955",
  "endereco":{
    "estado":"Santa Catarina",
    "cidade":"Florianopolis",
    "rua":"rua casa",
    "numero_casa": 2
  },
  "telefone":{
    "ddd":47,
    "numero":94840394 
  }
}
```
</details>

<details>
  <summary class="ok">✅ Response Ok - 200</summary>

```json
{
  "message": "customer updated successfully"
}
```
</details>

<details>
  <summary class="badrequest">❌ Response Bad Request - 400</summary>
Quando é passado um ID de um cliente não existente

```json
{
  "message": "customer not found"
}
```
</details>

<details>
  <summary class="badrequest">❌ Response Bad Request - 400</summary>

```json
{
  "message": "failed to updated"
}
```
</details>

### <code class="delete">DELETE - DESTROY</code> /client/:id 

<details>
  <summary class="ok">✅ Response Ok - 200</summary>

```json
{
  "message": "customer deleted successfully"
}
```
</details>

<details>
  <summary class="badrequest">❌ Response Bad Request - 400</summary>
Quando é passado um ID de um cliente não existente

```json
{
  "message": "customer not found"
}
```
</details>

## Endpoint /product

### <code class="post">POST - STORE</code> /product
<details>
  <summary>📃 Body</summary>

```form
{
  "nome": "geladeira",
  "quantidade_estoque": 1,
  "valor": 219.00,
  "descricao": "é uma geladeira"
  "imagem": "geladeira.jpg"
}
```
</details>

<details>
  <summary class="created">✅ Response Created - 201</summary>

```json
{
  "message": "user created successfully",
}
```
</details>

<details>
  <summary class="badrequest">❌ Response Bad Request - 400</summary>
Quando um dos campos então faltando

```json
{
  "message": "all fields are required"
}
```
</details>

<details>
  <summary class="badrequest">❌ Response Bad Request - 400</summary>

```json
{
  "message": "error when listing products"
}
```
</details>

### <code class="get">GET - INDEX</code> /product

<details>
  <summary class="ok">✅ Response Ok - 200</summary>

```json
{
  "data": [
    {
      "nome": "geladeira",
      "quantidade_estoque": 1,
      "valor": 219.00,
      "descricao": "é uma geladeira"
      "imagem": "geladeira.jpg"
    }
  ]
}
```
</details>

### <code class="get">GET - SHOW</code> /product/:id

<details>
  <summary class="ok">✅ Response Ok - 200</summary>

```json
{
  "data": [
    {
      "nome": "geladeira",
      "quantidade_estoque": 1,
      "valor": 219.00,
      "descricao": "é uma geladeira"
      "imagem": "geladeira.jpg"
    }
  ]
}
```
</details>

<details>
  <summary class="badrequest">❌ Response Bad Request - 400</summary>
quando o ID passado não existe
  
```json
{
  "message": "id does not exist"
}
```
</details>

### <code class="put">PUT - UPDATE</code> /product/:id

<details>
  <summary>📃 Body</summary>

```form
{
  "nome": "geladeira",
  "quantidade_estoque": 1,
  "valor": 219.00,
  "descricao": "é uma geladeira"
  "imagem": "geladeira.jpg"
}
```
</details>

<details>
  <summary class="ok">✅ Response Ok - 200</summary>

```json
{
  "message": "product updated successfully",
}
```
Caso seja passado um ID que foi deletado

```json
{
  "message": "product successfully restored",
}
```

</details>

<details>
  <summary class="badrequest">❌ Response Bad Request - 400</summary>
quando o ID passado não existe
  
```json
{
  "message": "product not found"
}
```
</details>

### <code class="delete">DELETE - DESTROY</code> /product/:id

<details>
  <summary class="ok">✅ Response Ok - 200</summary>

```json
{
  "message": "product deleted successfully"
}
```

</details>

<details>
  <summary class="badrequest">❌ Response Bad Request - 400</summary>
quando o ID passado não existe
  
```json
{
  "message": "product not found"
}
```
</details>

## Endpoint /sell

### <code class="post">POST - STORE</code> /sell
<details>
  <summary>📃 Body</summary>

```form
{
  "client_id": 1,
  "product_id": 1,
  "quantidade": 2
}
```
</details>

<summary class="ok">✅ Response Ok - 200</summary>

```json
{
  "message": "sell created successfully",
  "data": {
    "cliente": {
      "nome": "Matheus",
      "cpf": "40615522955"
    },
    "produto": {
      "nome": "fogao",
      "imagem": "x6mv2m0vsih7cgsmpiyq01zd.webp",
      "descricao": "dasdassssssssss",
      "quantidade_estoque": 1,
      "valor": 239.99
    },
    "quantidade": 2,
    "preco_unitario": 239.99,
    "preco_total": 479.98
  }
}
```

</details>

<details>
  <summary class="badrequest">❌ Response Bad Request - 400</summary>
Quando o client_id passado não existe
  
```json
{
  "message": "client not found"
}
```
</details>

<details>
  <summary class="badrequest">❌ Response Bad Request - 400</summary>
Quando o product_id passado não existe
  
```json
{
  "message": "product not found"
}
```
</details>

<details>
  <summary class="badrequest">❌ Response Bad Request - 400</summary>
Quando a quantidade inserida e maior que quantidade em estoque do produto
  
```json
{
  "message": "product out of stock"
}
```
</details>
