import React from 'react'
import {Pane, Paragraph, Switch, Textarea, Table, Heading, IconButton, EditIcon, SideSheet, TextInputField, TrashIcon, Button, Combobox, toaster} from 'evergreen-ui'
import axios from 'axios';
import { ExportCSV } from './ExportCSV';

function Director() {

    const [applicationItems, setApplicationItems] = React.useState([]);
    const [productItems, setProductItems] = React.useState([]);
    const [checked, setChecked] = React.useState(true)
    

    //Загрузка данных
    React.useEffect(()=> {
        async function fetchData() {
          try {
            const [cartResponse] = await Promise.all([
              axios.get('http://localhost:4000/api/store')
            ]);
            setProductItems(cartResponse.data);      
            const [Response] = await Promise.all([
              axios.get('http://localhost:4000/api/application')
            ]);
            setApplicationItems(Response.data);      
          } catch (error) {
            alert('Ошибка при запросе данных');
            console.error(error);
          }
          
        }
        fetchData();
    }, []);
      
    return(
      <Pane padding={16}>
        <Pane display="flex" width="100%">
          <Heading  flex={7} size={900} margin={40}> Директор</Heading>
          <Switch value="lol" flex={1} float="right" marginTop={50} marginRight={16} checked={checked} onChange={(e) => setChecked(e.target.checked)} />
          <ExportCSV  csvData={productItems} fileName={"Экспорт данных по жалобам"} />
          <ExportCSV  csvData={applicationItems} fileName={"Экспорт данных по каталогу товаров"} />
          
          <a href="/store">
          <Button  flex={1} type="button" margin={40} marginLeft={16} float="right" appearance="primary">
            Выход
          </Button>
          </a>   
        </Pane>
        <Pane>   
          {checked ? 
          <Pane>
            
            <Table margin={40}>
              <Table.Head>
                <Table.TextHeaderCell>Модель</Table.TextHeaderCell>
                <Table.TextHeaderCell>Артикул</Table.TextHeaderCell>
                <Table.TextHeaderCell>Стоимость</Table.TextHeaderCell>
                <Table.TextHeaderCell>Каталог</Table.TextHeaderCell>
              </Table.Head>
              <Table.Body> {
              productItems.map((item, index) => (
                <Table.Row key={item.id_product}   >
                 <Table.TextCell>{item.model}</Table.TextCell>           
                <Table.TextCell>{item.articul}</Table.TextCell>
                <Table.TextCell>{item.price}</Table.TextCell>
                <Table.TextCell>{item.catalog}</Table.TextCell>
              </Table.Row>
              ))
              }
              </Table.Body>
            </Table>
            </Pane>
          :
          <Table margin={40}>
            <Table.Head>
              <Table.TextHeaderCell>#Обращения</Table.TextHeaderCell>
              <Table.TextHeaderCell>Номер телефона</Table.TextHeaderCell>
              <Table.TextHeaderCell>Статус обращения</Table.TextHeaderCell>
            </Table.Head>
            <Table.Body> {
              
            applicationItems.map((item, index) => (
              <Table.Row key={item.id_application}>
                <Table.TextCell>{item.id_application}</Table.TextCell>           
                <Table.TextCell>{item.phone}</Table.TextCell>
                <Table.TextCell>{item.status}</Table.TextCell>
              </Table.Row>
            ))
            }
            </Table.Body>
          </Table>}
        </Pane>
      </Pane>
    )
}

export default Director;