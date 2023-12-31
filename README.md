## Ejercicio práctico - BackEnd Developer

> Ing. José Mauricio Lahuasi Quillupangui - jmlahuasiq@hotmail.com - [linkedin](https://www.linkedin.com/in/jos%C3%A9-mauricio-lahuasi-quillupangui-1b660874/)

### Instrucciones Instalación

> - Descargar o Clonar el repositorio

> - Instalar dependencias

```
    npm install
```

> - Crear un repositorio y Base de Datos en [cockroachDb](https://www.cockroachlabs.com/). Se debe configurar para que funcione con TypeORM.

> > > ![](./assets/01-ConfiguracionBDD.png)

> - Copiar la `DATABASE_URL`.

> - Crear el archivo `.env` basado en la estructura de `.env.template`. Pegar en `DATABASE_URL` la URL que se obtuvo anteriormente.

### Instrucciones Ejecución

> - Para ejecutar en ambiente de desarrollo

```
    npm run dev
```

> - Para generar fuentes producción [dist](./dist/)

```
    npm run build
```

> - Para ejecutar fuentes de producción [dist](./dist/)

```
    npm run start
```

> - Para ejecutar pruebas unitarias

```
    npm run test
```

### TAREAS

> **Ejercicio 1: Servicio simulado (Mock)**

> > - **NOTA**: Debe el proyecto debe estar ejecutandose en modo `Desarrollo` o en modo `Produccion`

> > - Url servicio mock [GET](http://localhost:8080/api/mock/getall)

> **Ejercicio 2: Administración de organizaciones**

> > - **NOTA**: Debe el proyecto debe estar ejecutandose en modo `Desarrollo` o en modo `Produccion`

> > - **Servicios CRUD**

> > > - **Create**: Petición de tipo [POST](http://localhost:8080/api/organization). Se envía en el `Body` una petición con la siguiente estructura

```
            {
                "name":"Banco Pichincha",
                "status": 1
            }
```

> > > > > Se recibe una respuesta con la siguiente estructura

```
            {
                "OK": true,
                "MESSAGE": "Successful process",
                "organization": {
                    "_id": 1,
                    "name": "Banco Pichincha",
                    "status": 1
                }
            }
```

> > > > > **NOTA**: Se valida que `status` sea `0 o 1`. Se realizó esto para Manejar un `status` `activo e inactivo`

> > > - **Read**: Petición de tipo [GET](http://localhost:8080/api/organization/all).

> > > > > Se recibe una respuesta con la siguiente estructura

```
            {
                "OK": true,
                "MESSAGE": "Successful process",
                "organization": [
                    {
                        "_id": 1,
                        "name": "Banco Pichincha",
                        "status": "0"
                    }
                ]
            }
```

> > > - **Update**: Petición de tipo [PUT](http://localhost:8080/api/organization/1).

> > > > > Se recibe en la url el ID del registro que se quiere actualizar

```
            http://localhost:8080/api/organization/1

            Donde
                1 : es el ID que se quiere actualizar
```

> > > > > Se envía en el `Body` una petición con la siguiente estructura

```
            {
                "name":"Banco Pichincha",
                "status": 1
            }
```

> > > > > Se recibe una respuesta con la siguiente estructura

```
            {
                "OK": true,
                "MESSAGE": "Successful process",
                "organization": {
                    "_id": 1,
                    "name": "Banco Pichincha",
                    "status": 1
                }
            }
```

> > > > > **NOTA**: Se valida que `status` sea `0 o 1`. Se realizó esto para Manejar un `status` `activo e inactivo`

> > > - **Delete**: Petición de tipo [DELETE](http://localhost:8080/api/organization/1). Se recibe en la url el ID del registro que se quiere eliminar

```
            http://localhost:8080/api/organization/1

            Donde
                1 : es el ID que se quiere eliminar
```

> > > > > Se recibe una respuesta con la siguiente estructura

```
            {
                "OK": true,
                "MESSAGE": "Successful process"
            }
```

> **Ejercicio 3: Servicio para obtener las métricas de un repositorio**

> > - Se creó un EndPoint [GET](http://localhost:8080/api/custom/1), (en la url `1` es el `id` de la tribu)

> > > - **Respuesta Escenario #1**: Resultado si se cumplen las siguientes condiciones: repositorio.state igual "E", metrica.coverage mayor 75%, repository.created_at (Año) igual al año actual.

```
    {
        "repositories": [
            {
                "id": "2",
                "name": "cd-common-text",
                "tribe": "Centro Digital",
                "organization": "Banco Pichincha",
                "state": "Habilitado",
                "coverage": "76%",
                "codeSmells": "1",
                "bugs": "0",
                "vulnerabilities": "2",
                "hotspots": "0",
                "verificationState": "En Espera"
            }
        ]
    }

```

> > > - **Respuesta Escenario #2**: Resultado si la tribu no existe

```
    {
        "repositories": {
            "error": "La Tribu no se encuentra registrada"
        }
    }
```

> > > - **Respuesta Escenario #3**: Se consume el servicio mock [GET](http://localhost:8080/api/mock/getall) mediante `Axios` para obtener los nombres del campo verificationState. **NOTA**: Como es un servicio rest en este mismo proyecto funciona cuando se encuntra ejecutando en Desarrollo o Producción.

```
    "verificationState": "En Espera"
```

> > > - **Respuesta Escenario #4**: Respuesta cuando con cumple la covertura del 75%

```
    {
        "repositories": {
            "error": "La Tribu no tiene repositorios que cumplan con la cobertura necesaria"
        }
    }
```

> > > - **UNIT TEST**: Se deben ejecutar con el servicio arriba porque necesita el mock creado en la TAREA #1 para encontrar el nombre y realizar la validacion

> **Ejercicio 4: Generar reporte CSV métricas repositorio**

> > - Se creó un servicio rest [GET](http://localhost:8080/api/custom/csv/1) que retorna un archivo `CSV` con la información del id de la Tribu que se envía en la URL.
