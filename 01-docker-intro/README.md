# Comando para construir proyecto en Docker

```bash
# Construir la imagen
docker build -t react-nginx .

# Ejecutar el contenedor
docker run -d -p 8080:80 --name react-nginx react-nginx

# Detener y eliminar el contenedor
docker stop react-nginx
docker rm react-nginx
```