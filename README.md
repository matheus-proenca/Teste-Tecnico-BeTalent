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
  <summary class="ok">✅ Response OK - 200</summary>

```json
{
  message: 'user created successfully',
}
```
</details>

<details>
  <summary class="badrequest">❌ Response Bad Request - 400</summary>
Quando o campo do email ou password estão faltando

```json
{
  message: 'all fields are required'
}
```
</details>

<details>
  <summary class="badrequest">❌ Response Bad Request - 400</summary>
Quando o email inserido é inválido

```json
{
  message: 'email is invalid'
}
```
</details>

<details>
  <summary class="conflict">❌ Response Conflict - 409</summary>
Quando o usuario ja existe

```json
{
  message: 'User already exist'
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
  message: 'all fields are required'
}
```
</details>

<details>
  <summary class="badrequest">❌ Response Bad Request - 400</summary>
Quando o campo do email ou password são incorretos

```json
{
  message: 'password or email is incorrect'
}
```
</details>
