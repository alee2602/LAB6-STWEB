FROM ubuntu:latest
ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && \
    apt-get install -y mysql-server

ENV MYSQL_DATABASE=blog_db
ENV MYSQL_USER=grammy_user
ENV MYSQL_PASSWORD=grammy_winner
ENV MYSQL_ROOT_PASSWORD=gramy_nominee

COPY schema.sql /docker-entrypoint-initdb.d/schema.sql

EXPOSE 3306

CMD ["mysqld"]
