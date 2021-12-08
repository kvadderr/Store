import React from 'react'
import {Pane, Paragraph, Link, Table, Heading, IconButton, EditIcon, SideSheet, TextInputField, TrashIcon, Button, toaster, Combobox} from 'evergreen-ui'
import axios from 'axios';

function HR() {

    
    const [userItems, setUserItems] = React.useState([]);
    const [isShowSideDialog, setIsShowSideDialog] = React.useState(false)

    const [userID, setUserID] = React.useState(1);
    const [userFIO, setUserFIO] = React.useState();
    const [userLogin, setUserLogin] = React.useState();
    const [userPassword, setUserPassword] = React.useState();
    const [userRole, setUserRole] = React.useState();

    const [isAdded, setIsAdded] = React.useState(false);

    const FilteredData = (id, FIO, login, password, role) => {
      setUserID(id);
      setUserFIO(FIO);
      setUserLogin(login);
      setUserPassword(password);
      setUserRole(role);
  };

    const CleanData = () => {
      setUserID();
      setUserFIO();
      setUserLogin();
      setUserPassword();
      setUserRole('Директор');
  };

  const json = {
    FIO: userFIO,
    login: userLogin,
    password: userPassword,
    role:userRole,
    id_user: userID
}
           
    //Удаление позиции 
    const onRemoveItem = (id_user) => {
      try {
        setUserItems((prev) => prev.filter((item) => Number(item.id_user) !== Number(id_user)));
      } catch (error) {
        alert('Ошибка при удалении');
      }
    };

     //Загрузка данных
     React.useEffect(()=> {
        async function fetchData() {
          try {
            const [cartResponse] = await Promise.all([
              axios.get('http://localhost:4000/api/users/')
            ]);
            setUserItems(cartResponse.data);        
          } catch (error) {
            alert('Ошибка при запросе данных');
            console.error(error);
          }
          
        }
        fetchData();
      }, []);

    return(
        <Pane padding={16} >
            <Pane display="flex" width="100%">
            <Heading  flex={7} size={900} margin={40}> Отдел кадров </Heading>
            <Button flex={2} margin={40} marginRight={16} appearance="primary" intent="success" onClick = { () => {CleanData(); setIsShowSideDialog(true);setIsAdded(true);}}>
                Добавить нового сотрудника
            </Button>
            <a href="/store">
            <Button  flex={1} type="button" margin={40} marginLeft={16} float="right" appearance="primary">
                
                Выход
            </Button>
            </a>   
        </Pane>
        <Pane>   
          <Table margin={40}>
            <Table.Head>
              <Table.TextHeaderCell>ФИО</Table.TextHeaderCell>
              <Table.TextHeaderCell>Должность</Table.TextHeaderCell>
              <Table.TextHeaderCell>Редактировать</Table.TextHeaderCell>
              <Table.TextHeaderCell>Удалить</Table.TextHeaderCell>
            </Table.Head>
            <Table.Body> {
              
            userItems.map((item, index) => (
              <Table.Row key={item.id_user}>
                <Table.TextCell>{item.FIO}</Table.TextCell>           
                <Table.TextCell>{item.role}</Table.TextCell>
                <Table.TextCell>   <IconButton icon={EditIcon} intent="success" onClick={() => { FilteredData(item.id_user, item.FIO, item.login, item.password, item.role); setIsAdded(false); setIsShowSideDialog(true);}}/></Table.TextCell>
                <Table.TextCell>   <IconButton icon={TrashIcon} intent="danger" onClick={() => {  axios.delete('http://localhost:4000/api/users/'+ item.id_user).then(toaster.success('Сотрудник уволен')); onRemoveItem(item.id_user);}}/></Table.TextCell>
              </Table.Row>
            ))
}
            </Table.Body>
          </Table>
            </Pane>

            <SideSheet isShown={isShowSideDialog} onCloseComplete={() => setIsShowSideDialog(false)}>
                <Paragraph margin={40} size={900}>Сотрудник</Paragraph>

                <TextInputField
                marginLeft={40} marginRight={40}
                label="ФИО"
                value = {userFIO}
                onChange={e => setUserFIO(e.target.value)}
                />

                <TextInputField
                marginLeft={40} marginRight={40}
                label="Логин"
                value = {userLogin}
                onChange={e => setUserLogin(e.target.value)}
                placeholder="Логин"
                />

                <TextInputField
                marginLeft={40} marginRight={40}
                label="Пароль"
                value = {userPassword}
                onChange={e => setUserPassword(e.target.value)}
                />

                <Combobox
                width={300}
                marginLeft={40} marginRight={40} marginTop={10} marginBottom={20}
                initialSelectedItem={{ label: userRole}}
                items={[{ label: 'Директор' }, { label: 'Отдел послепродажной поддержки' }, { label: 'Отдел продаж' },{ label: 'Отдел кадров' }]}
                itemToString={item => (item ? item.label : '')}
                onChange={selected => setUserRole(selected.label)}
                />
               
        
          <Button marginLeft={40} marginBottom={40}  appearance="primary" onClick={() => {isAdded ? axios.post('http://localhost:4000/api/users', json).then(toaster.success('Данные добавлены! Перезагрузите страницу')) : axios.put('http://localhost:4000/api/users/', json).then(toaster.success('Данные обновлены! Перезагрузите страницу'))}}>
          {isAdded ? "Добавить сотрудника" : "Обновить данные сотрудника" } 
          </Button>      
        

        </SideSheet>
        </Pane>
    )
}

export default HR;