import MainMenu from '../../components/MainMenu';
import LeftMenu from '../../components/LeftMenu';
import ProductCard from '../../components/ProductCard';
import {Pane,Heading, Portal, Button, TextInputField, SideSheet, Paragraph, ShopIcon, IconButton,TrashIcon, toaster, Table} from 'evergreen-ui'
import React from 'react';
import axios from 'axios';

function Store (){

    const [catalogName, setCatalogName] = React.useState("Wi-FI роутеры");
    const [catalogTitle, setCatalogTitle] = React.useState("Wi-FI роутеры");
    const [basketItems, setBasketItems] = React.useState([]);
    const [cartItems, setCartItems] = React.useState([]);
    const [isShowSideDialog, setIsShowSideDialog] = React.useState(false);
    const [value, setValue] = React.useState('')
    
    function mapToObj(inputMap) {
      let obj = {};  
      inputMap.forEach(function(value, key){
          obj[key] = value
      });  
      return obj;
    } 

    const obj1 = Object.fromEntries(basketItems);
    const json = JSON.stringify({...basketItems});

    function sendApplication(){
      console.log({items: basketItems});
      axios.post("http://localhost:4000/api/order", json, {
        "headers": {      
        "content-type": "application/json",
        },
      });
    }

    //Загрузка каталога товаров
    React.useEffect(()=> {
      async function fetchData() {
        try {
          const [cartResponse] = await Promise.all([
            axios.get('http://localhost:4000/api/store')
          ]);
          setCartItems(cartResponse.data);        
        } catch (error) {
          alert('Ошибка при запросе данных');
          console.error(error);
        }
        
      }
      fetchData();
    }, []);
    
    //Добавление позиции в корзину
    const onAddToBasket = async (obj) => {
      try {
        setBasketItems((prev)=> [...prev, obj]);      
      } catch {
        alert('Ошибка при добавлении в корзину');
      }
    }
  
    //Удаление позиции из корзины
    const onRemoveItem = (id_product) => {
      try {
        setBasketItems((prev) => prev.filter((item) => Number(item.id_product) !== Number(id_product)));
      } catch (error) {
        alert('Ошибка при удалении из корзины');
      }
    };

    const jsonData = { 
      phone: value,
      products: basketItems.map((item, index) => (
        {id_product: item.id_product, count: item.count}
        ))
      
    };
        
    return (
      
      <Pane>    
        
        <MainMenu/>
        
        <Pane display="flex" padding={16} >
      
          <Pane flex={1} marginTop={20}>
            <LeftMenu setCatalogName = {setCatalogName}/>
          </Pane>
      
          <Pane flex={5} marginTop={20}>          
            <Heading  size={900} marginLeft={30} marginTop={30}>{catalogName}</Heading>
            {/*  console.log(JSON.stringify(jsonData))
            <Heading  size={400} marginLeft={30} marginTop={5}>технология беспроводной локальной сети с устройствами на основе стандартов IEEE 802.11.</Heading>
            */}
            <Pane clearfix marginTop={20}> {
              cartItems.filter(product => product.catalog == catalogName).map((item, index) => {
                return <ProductCard {...item}  onPlus={(obj) => onAddToBasket(obj)}/>
              })
            }
            </Pane>
      
          </Pane>
      
        </Pane>

        {/* Иконка всплывающей корзины */}  
        <Portal>
          <Pane position="fixed" bottom={50} right={50}>
            <IconButton icon={ShopIcon} onClick={() => setIsShowSideDialog(true)}/>
          </Pane>
        </Portal>
  
        <SideSheet width={900} isShown={isShowSideDialog} onCloseComplete={() => setIsShowSideDialog(false)}>
          <Paragraph margin={40} size={500}>Корзина</Paragraph>
          <Table margin={40}>
            <Table.Head>
              <Table.TextHeaderCell>Название</Table.TextHeaderCell>
              <Table.TextHeaderCell>Кол-во</Table.TextHeaderCell>
              <Table.TextHeaderCell>Итоговая стоимость</Table.TextHeaderCell>
              <Table.TextHeaderCell>Удалить</Table.TextHeaderCell>
            </Table.Head>
            <Table.Body> {
              basketItems.map((item, index) => (
              <Table.Row key={item.artikul}>
                <Table.TextCell>{item.model}</Table.TextCell>
                <Table.TextCell>{item.count}</Table.TextCell>
                <Table.TextCell>{item.price * item.count} ₽</Table.TextCell>
                <Table.TextCell>   <IconButton icon={TrashIcon} intent="danger" onClick={() => onRemoveItem(item.id_product)}/></Table.TextCell>
              </Table.Row>
              ))
            }
            </Table.Body>
          </Table>
   
          <TextInputField
            marginLeft={40} marginRight={40}
            label="Введите номер телефона"
            placeholder="74957556983"
            onChange={e => setValue(e.target.value)} value={value}
          />
  
          <Button marginLeft={40} marginBottom={40} appearance="primary" intent="success" onClick = {() => axios.post('http://localhost:4000/api/order/', jsonData).then(toaster.success('Заказ оформлен! Скоро с вами свяжутся '))}>
              Оформить заказ
          </Button>      
  
        </SideSheet>
      
      </Pane>
    )
}

export default Store;