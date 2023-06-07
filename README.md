# food-now

Olá, professor. A API se encontra [aqui](https://github.com/Leoozera/global-solution-spring).

## Instruções de uso

Altere o arquivo da API `src/main/resources/application.properties`:

```
spring.datasource.url=jdbc:oracle:thin:@oracle.fiap.com.br:1521:orcl
spring.datasource.username=RM94426
spring.datasource.password=260104
```

Altere o arquivo do projeto mobile `src/lib/api.ts`:

```
import axios from 'axios';

export const api = axios.create({ baseURL: 'http://<SEU IP AQUI>:8080' });
```

## Lista de endpoints
- GET `/consumidor`
- GET/POST `/restaurante`
- GET/POST/PUT/DELETE `/produto`
- GET/POST `/pedidos`
