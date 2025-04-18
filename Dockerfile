FROM mysql:8.0

# Copiamos el archivo SQL a la carpeta que MySQL usa para inicializar
COPY init.sql /docker-entrypoint-initdb.d/

# Importante: no necesitas CMD ni EXPOSE extra, mysql lo maneja
