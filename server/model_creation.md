``` bash

npx sequelize-cli model:generate --name Employee --attributes email:string,username:string,password:string,image_name:string,image_type:string,image_data:blob,role:string

npx sequelize-cli model:generate --name Item --attributes name:string,stock:integer,image_name:string,image_type:string,image_data:blob,categoryId:integer

npx sequelize-cli model:generate --name Category --attributes name:string

npx sequelize-cli model:generate --name EmployeesItem --attributes employeeId:integer,itemId:integer

```