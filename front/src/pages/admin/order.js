import React from 'react'
import {Pane, Paragraph, Link, Textarea, Table, Heading, IconButton, EditIcon, SideSheet, TextInputField, TrashIcon, Button, Combobox, toaster} from 'evergreen-ui'
import axios from 'axios';

function Order() {

    const [clientPhone, setClientPhone] = React.useState();
    const [clientFIO, setClientFIO] = React.useState();
    const [clientMail, setClientMail] = React.useState();
    const [orderStatus, setOrderStatus] = React.useState();

    const [orderID, setOrderID] = React.useState();
    const [totalPrice, setTotalPrice] = React.useState();
    const [orderItems, setOrderItems] = React.useState([]);
    const [clientItems, setClientItems] = React.useState([]);
    const [productItems, setProductItems] = React.useState([]);
    const [isShowSideDialog, setIsShowSideDialog] = React.useState(false);

    const [isAdded, setIsAdded] = React.useState(false);
   
    const json = {
        phone: clientPhone,
        FIO: clientFIO,
        mail: clientMail,
        status: orderStatus,
        id_order: orderID
    }
    
    async function LoadProductData(id_product, phone) {
        try {
          const [cartResponse] = await Promise.all([
            axios.get('http://localhost:4000/api/order/'+id_product)
          ]);
          setProductItems(cartResponse.data);        

          const [phoneResponse] = await Promise.all([
            axios.get('http://localhost:4000/api/order/client/'+phone)
          ]);
          setClientItems(phoneResponse.data);
          
          if (phoneResponse.data.length > 0) {
            setIsAdded(false);
            setClientFIO(phoneResponse.data[0].FIO);
            setClientMail(phoneResponse.data[0].mail);
          } else {
            setIsAdded(true);
            setClientFIO("");
            setClientMail("");
          }
        } catch (error) {
          alert('Ошибка при запросе данных');
          console.error(error);
        }
        
      }
     //Загрузка данных
     React.useEffect(()=> {
        async function fetchData() {
          try {
            const [cartResponse] = await Promise.all([
              axios.get('http://localhost:4000/api/order')
            ]);
            setOrderItems(cartResponse.data);        
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
            <Heading  flex={7} size={900} margin={40}> Заказы</Heading>
           
            <a href="/store">
            <Button  flex={1} type="button" margin={40} marginLeft={16} float="right" appearance="primary">
                Выход
            </Button>
            </a>   
        </Pane>
        <Pane>   
          <Table margin={40}>
            <Table.Head>
              <Table.TextHeaderCell>Номер заказа</Table.TextHeaderCell>
              <Table.TextHeaderCell>Номер клиента</Table.TextHeaderCell>
              <Table.TextHeaderCell>Статус</Table.TextHeaderCell>
              <Table.TextHeaderCell>Оформление заказа</Table.TextHeaderCell>
            </Table.Head>
            <Table.Body> {
              
            orderItems.map((item, index) => (
              
              <Table.Row key={item.id_order}   >
                <Table.TextCell>{item.id_order}</Table.TextCell>  
                <Table.TextCell>{item.phone}</Table.TextCell>           
                <Table.TextCell>{item.status}</Table.TextCell>
                <Table.TextCell>   <IconButton icon={EditIcon} intent="success" onClick={() => {  setIsShowSideDialog(true); LoadProductData(item.id_order, item.phone); setClientPhone(item.phone); setOrderID(item.id_order); setOrderStatus(item.status)}}/></Table.TextCell>
              </Table.Row>
            ))
            }
            </Table.Body>
          </Table>
            </Pane>
         

            <SideSheet isShown={isShowSideDialog} onCloseComplete={() => setIsShowSideDialog(false)}>
                <Paragraph margin={40} size={900}>Заказанные продукты</Paragraph>

                <Table margin={40}>
                    <Table.Head>
                    <Table.TextHeaderCell>Модель</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Каталог</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Кол-во</Table.TextHeaderCell>
                    </Table.Head>
                    <Table.Body> {
                    
                    productItems.map((item, index) => (
                    <Table.Row key={index}>
                        <Table.TextCell>{item.model}</Table.TextCell>  
                        <Table.TextCell>{item.catalog}</Table.TextCell>           
                        <Table.TextCell>{item.count}</Table.TextCell>
                    </Table.Row>
                    ))
                    }
                    </Table.Body>
                </Table>


                <Paragraph margin={40} size={900}>Информация о клиенте</Paragraph>

                <TextInputField
                marginLeft={40} marginRight={40}
                label="ФИО"
                value = {clientFIO}  
                onChange={e => setClientFIO(e.target.value)}
                />

                <TextInputField
                marginLeft={40} marginRight={40}
                label="Почта"
                value = {clientMail}  
                onChange={e => setClientMail(e.target.value)}
                />

                <Paragraph margin={40} size={900}>Статус заказа</Paragraph>
        
                <Combobox
                width={300}
                marginLeft={40} marginRight={40} marginTop={10} marginBottom={20}
                initialSelectedItem={{ label: orderStatus}}
                items={[{ label: 'Рассматривается' }, { label: 'Положительный' }, { label: 'Отклонен' }]}
                itemToString={item => (item ? item.label : '')}
                onChange = {selected => setOrderStatus(selected.label)}
                />
            

          <Button marginLeft={40} marginBottom={40}  appearance="primary" onClick={() => {isAdded ? axios.post('http://localhost:4000/api/order/client', json).then(toaster.success('Заказ оформлен! Клиенту отправлено письмо')) : axios.put('http://localhost:4000/api/order/client', json).then(toaster.success('Заказ оформлен! Клиенту отправлено письмо'))}}>
            {isAdded ? "Добавить данные клиента и оформить покупку" : "Оформить покупку" } 
          </Button>      
        </SideSheet>
        </Pane>
    )
}

export default Order;