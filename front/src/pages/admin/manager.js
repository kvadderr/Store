import React from 'react'
import {Pane, Paragraph, Switch, Textarea, Table, Heading, IconButton, EditIcon, SideSheet, TextInputField, TrashIcon, Button, Combobox, toaster} from 'evergreen-ui'
import axios from 'axios';

function Manager() {

    const [productID, setProductID] = React.useState(1);
    const [productDetail, setProductDetail] = React.useState();
    const [productPrice, setProductPrice] = React.useState();
    const [productCatalog, setProductCatalog] = React.useState('Wi-FI роутеры');
    const [productImage, setProductImage] = React.useState();
    const [productArticul, setProductArticul] = React.useState();
    const [productModel, setProductModel] = React.useState();

    const [clientPhone, setClientPhone] = React.useState();
    const [clientFIO, setClientFIO] = React.useState();
    const [clientMail, setClientMail] = React.useState();
    const [orderStatus, setOrderStatus] = React.useState();
    const [appID, setAppID] = React.useState();

    const [applicationItems, setApplicationItems] = React.useState([]);
    const [productItems, setProductItems] = React.useState([]);
    const [isShowSideDialog, setIsShowSideDialog] = React.useState(false);
    const [isShowAppDialog, setIsShowAppDialog] = React.useState(false);
    const [isAdded, setIsAdded] = React.useState();
    const [checked, setChecked] = React.useState(true)

    const FilteredData = (id, detail, price, img, articul, catalog, model) => {
        setProductID(id);
        setProductDetail(detail);
        setProductPrice(price);
        setProductImage(img);
        setProductArticul(articul);
        setProductCatalog(catalog);
        setProductModel(model);
    };

    const CleanData = () => {
      setProductID();
      setProductDetail();
      setProductPrice();
      setProductImage();
      setProductArticul();
      setProductCatalog('Wi-FI роутеры');
      setProductModel();
  };
   
    const json = { 
      model: productModel,
      detail: productDetail,
      articul: productArticul,
      price: productPrice,
      image: productImage,
      catalog: productCatalog,
      id: productID
    };
    
    const json2 = {
      status: orderStatus,
      id_order: appID
    }

    async function LoadProductData(phone) {
      try {
        const [phoneResponse] = await Promise.all([
          axios.get('http://localhost:4000/api/order/client/'+phone)
        ]);
        
        if (phoneResponse.data.length > 0) {
          setIsAdded(false);
          setClientFIO(phoneResponse.data[0].FIO);
          setClientMail(phoneResponse.data[0].mail);
        } else {
          setIsAdded(true);
          setClientFIO("Данные отстутствуют");
          setClientMail("Данные отстутствуют");
        }
      } catch (error) {
        alert('Ошибка при запросе данных');
        console.error(error);
      }
      
    }


     //Загрузка каталога товаров
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
     
        
    //Удаление позиции 
    const onRemoveItem = (id_product) => {
      try {
        setProductItems((prev) => prev.filter((item) => Number(item.id_product) !== Number(id_product)));
      } catch (error) {
        alert('Ошибка при удалении');
      }
    };
      
    return(
        <Pane padding={16} >
            <Pane display="flex" width="100%">
            <Heading  flex={10} size={900} margin={40}> Мененджмент</Heading>
            
            
            <Switch value="lol" flex={1} float="right" marginTop={50} checked={checked} onChange={(e) => setChecked(e.target.checked)} />
            
            <a href="/store">
            <Button  flex={1} type="button" margin={40} marginLeft={16} float="right" appearance="primary">
                Выход
            </Button>
            </a>   
        </Pane>
        <Pane>   
          

          { checked ? 
          <Pane>
            <Button marginRight={16} marginLeft = {40} appearance="primary" intent="success" onClick = { () => {CleanData(); setIsShowSideDialog(true);setIsAdded(true);}}>
                Добавить товар
            </Button>
          <Table margin={40}>
            <Table.Head>
              <Table.TextHeaderCell>Модель</Table.TextHeaderCell>
              <Table.TextHeaderCell>Артикул</Table.TextHeaderCell>
              <Table.TextHeaderCell>Стоимость</Table.TextHeaderCell>
              <Table.TextHeaderCell>Каталог</Table.TextHeaderCell>
              <Table.TextHeaderCell>Редактировать</Table.TextHeaderCell>
              <Table.TextHeaderCell>Удалить</Table.TextHeaderCell>
            </Table.Head>
            <Table.Body> {
              
            productItems.map((item, index) => (
              <Table.Row key={item.id_product}>
                <Table.TextCell>{item.model}</Table.TextCell>           
                <Table.TextCell>{item.articul}</Table.TextCell>
                <Table.TextCell>{item.price}</Table.TextCell>
                <Table.TextCell>{item.catalog}</Table.TextCell>
                <Table.TextCell>   <IconButton icon={EditIcon} intent="success" onClick={() => { FilteredData(item.id_product, item.detail, item.price, item.image, item.articul, item.catalog, item.model); setIsShowSideDialog(true);setIsAdded(false);}}/></Table.TextCell>
                <Table.TextCell>   <IconButton icon={TrashIcon} intent="danger"  onClick={() => {  axios.delete('http://localhost:4000/api/store/'+ item.id_product).then(toaster.success('Продукт удален')); onRemoveItem(item.id_product);}}/></Table.TextCell>
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
              <Table.TextHeaderCell>Обработать заявку</Table.TextHeaderCell>
            </Table.Head>
            <Table.Body> {
              
            applicationItems.map((item, index) => (
              <Table.Row key={item.id_application}>
                <Table.TextCell>{item.id_application}</Table.TextCell>           
                <Table.TextCell>{item.phone}</Table.TextCell>
                <Table.TextCell>{item.status}</Table.TextCell>
                <Table.TextCell><IconButton icon={EditIcon} intent="success" onClick={() => { setIsShowAppDialog(true); LoadProductData(item.phone); setOrderStatus(item.status); setAppID(item.id_application);}}/></Table.TextCell>
              </Table.Row>
            ))
            }
            </Table.Body>
          </Table>

          }
            </Pane>
         

            <SideSheet isShown={isShowSideDialog} onCloseComplete={() => setIsShowSideDialog(false)}>
                <Paragraph margin={40} size={900}>Продукт</Paragraph>

                <TextInputField
                marginLeft={40} marginRight={40}
                label="Модель"
                value = {productModel}  
                onChange={e => setProductModel(e.target.value)}
                />

                <TextInputField
                marginLeft={40} marginRight={40}
                label="Артикул"
                value = {productArticul}  
                onChange={e => setProductArticul(e.target.value)}
                />

                <TextInputField
                marginLeft={40} marginRight={40}
                label="Стоимость"
                value = {productPrice}  
                onChange={e => setProductPrice(e.target.value)}
                />

                <TextInputField
                marginLeft={40} marginRight={40}
                label="Ссылка на изображение"
                value = {productImage}  
                onChange={e => setProductImage(e.target.value)}
                />

                <Textarea 
                marginLeft={40} marginRight={140}
                label="Описание"    
                width="85%"
                value = {productDetail}  
                onChange={e => setProductDetail(e.target.value)}
                />

                <Combobox
                width={300}
                marginLeft={40} marginRight={40} marginTop={10} marginBottom={20}
                initialSelectedItem={{ label: productCatalog}}
                items={[{ label: 'Wi-FI роутеры' }, { label: 'Точки доступа' }, { label: 'Антенны' }, { label: '4G/5G роутеры' }, { label: '4G/5G USB' }, { label: 'Сим карты' }, { label: 'Автомагнитолы' }, { label: 'Антирадары' }, { label: 'Видеорегистраторы' }, { label: 'Навигаторы' }, { label: 'Охранный комплекс' }]}
                itemToString={item => (item ? item.label : '')}
                onChange = {selected => setProductCatalog(selected.label)}
                />
            

          <Button marginLeft={40} marginBottom={40}  appearance="primary" onClick={() => {isAdded ? axios.post('http://localhost:4000/api/store', json).then(toaster.success('Продукт добавлен')) : axios.put('http://localhost:4000/api/store', json).then(toaster.success('Данные обновлены'))}}>
            {isAdded ? "Добавить" : "Обновить"} 
          </Button>      
        </SideSheet>


        <SideSheet isShown={isShowAppDialog} onCloseComplete={() => setIsShowAppDialog(false)}>
                <Paragraph margin={40} size={900}>Доступная информация о клиенте</Paragraph>
                <Paragraph margin={40} size={300}>ФИО - {clientFIO}</Paragraph>
                <Paragraph margin={40} size={300}>Почта - {clientMail}</Paragraph>
                <Combobox
                width={300}
                marginLeft={40} marginRight={40} marginTop={10} marginBottom={20}
                initialSelectedItem={{ label: orderStatus}}
                items={[{ label: 'Рассматривается' }, { label: 'Положительный' }, { label: 'Отклонен' }]}
                itemToString={item => (item ? item.label : '')}
                onChange = {selected => setOrderStatus(selected.label)}
                />
              
            

          <Button marginLeft={40} marginBottom={40}  appearance="primary" onClick={() => {axios.put('http://localhost:4000/api/application', json2).then(toaster.success('Данные обновлены! Перезагрузите страницу'))}}>
            Обновить
          </Button>      
        </SideSheet>


        </Pane>
    )
}

export default Manager;