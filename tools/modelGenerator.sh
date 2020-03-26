#!/bin/bash
echo $1
SHELL_DIR=$(cd `dirname $0`; pwd)
echo ${SHELL_DIR}
MODEL_DIR=${SHELL_DIR}"/../app/model"
echo ${MODEL_DIR}
sequelize-auto -h "localhost" -d "fly-cloth-dev" -e "mysql" -p "3306" -u "root" -x "root" -t $1 -o ${MODEL_DIR}
