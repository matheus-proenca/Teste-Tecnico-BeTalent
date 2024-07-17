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

### <code class="post">POST</code> /client
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

### <code class="post">GET</code> /client

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
### <code class="post">GET</code> /client/:id?mes=07&ano=2024

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

### <code class="post">POST</code> /client/:id
<details>
  <summary>📃 Body</summary>

```json
{
  "nome": "Matheus",t
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
  message: 'failed to update'
}
```
</details>

### <code class="delete">DELETE</code> /client/:id 

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
  "message": "failed to delete"
}
```
</details>
