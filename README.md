# Actividad DE evaluación bootcamp
Repositorio Público para la entrega de la actividad de evaluación del Master Full Stack.

## Para el correcto uso del api en docker

### 1. Descargar Docker Desktop
### 2. Clonar el repositorio
    Con el repositorio descargado, 
    ir a la ruta de descarga y ejecutar el siguiente comando:
    `$ npm install`.

### 3. La carpeta data contiene la BD
### 4. Desde el Docker Desktop
    - Descargar la imagen de mongo.
    - Iniciar un contenedor con puerto 27017 y con la ruta de la carpeta data
    `$ docker run -d -p 27017:27017 -v C:\Users\sergi\Desktop\actividad_eval_bootcamp\data:/data/db --name mongodb_bootcamp  mongo`.

### 5. Luego validar la conexión a la base de datos
    Podrias hacerlo mediante la herramienta de mongodb, mongodb compass.

#### DATO: 
    El comando docker inspect <container_id>, puedes validar el ip del contenedor que te servira luego para poder conectar el api a mongodb.
    ejemplo: "IPAddress": "172.17.0.2".

### 6. Para el despliegue de la api
    Se ejecuta el siguiente comando para la construccion de la imagen definida en el Dockerfile:
    `$ docker build . -t saguilar/apipersona`.

### 7. Para desplegar el repositorio api
    Se ejecuta el siguiente comando, considerando que se tiene que agregar --link para poder conectar el repositorio api con mongodb.
    `$ docker run -d -p 8080:8080 --name host_api_persona --link mongodb_bootcamp saguilar/apipersona`.

#### DATO:
    En el log del repositorio del api se prodra observar los comando 
    console.log que se dejaron para comprobar la conexión:
    
    listening on http://0.0.0.0:8080

    Base de Datos conectada!

    A su ves, se adjunta el archivo .json:
    apipersona_bootcamp.postman_collection.json

    para poder importarlo en postman y probar las apis.

    Gracias.