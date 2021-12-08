import React from 'react'
import {Pane, Paragraph, Switch, Textarea, Table, Heading, IconButton, EditIcon, SideSheet, TextInputField, TrashIcon, Button, Combobox, toaster} from 'evergreen-ui'
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

function Admin(){

    const [userLogin, setUserLogin] = React.useState();
    const [userPassword, setUserPassword] = React.useState();
    const [userRole, setUserRole] = React.useState();

    async function login() {
        try {
          const [Response] = await Promise.all([
            axios.get('http://localhost:4000/api/users/login/'+ userLogin +'/password/'+ userPassword)
          ]);
          
          if (Response.data.length > 0) {
            setUserRole(Response.data[0].role);
            console.log("BEST!!");
            console.log(userRole);

            if (userRole === "Директор") window.location.replace("http://localhost:3000/director");
            if (userRole === "Отдел послепродажной поддержки") window.location.replace("http://localhost:3000/manager");
            if (userRole === "Отдел кадров") window.location.replace("http://localhost:3000/hr");
            if (userRole === "Отдел продаж") window.location.replace("http://localhost:3000/order");

          } else {
            toaster.notify('Неверные данные');
            console.log("Неверные данные");
          }
        } catch (error) {
          alert('Ошибка при запросе данных');
          console.error(error);
        }
        
      }

    return(
        <Pane width="50%" marginLeft="25%" marginTop={100}>
            <TextInputField
            label="Введите данные для авторизации"
            required
            description="Логин"
            placeholder="Поле для ввода логина"
            value = {userLogin}
            onChange={e => setUserLogin(e.target.value)}
            />
            <TextInputField
            description="Пароль"
            placeholder="Поле для ввода пароля"
            value = {userPassword}
            onChange={e => setUserPassword(e.target.value)}
            />
            <Button marginBottom={40}  appearance="primary" onClick={() => login()}>
            {"Войти"} 
          </Button>    
        </Pane>
    )
}

export default Admin;