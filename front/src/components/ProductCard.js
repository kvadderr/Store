import React, {useState} from 'react'
import {Pane, Dialog, Paragraph, ShoppingCartIcon, Text,PlusIcon,majorScale, IconButton, MinusIcon, Button, UnorderedList, TickIcon,ListItem } from 'evergreen-ui'


export default function ProductCard({
  id_product,
  model, 
  articul,
  image,
  detail,
  price,
  onPlus
}){
  
  const [count, setCount] = useState(0);
  const [elev, setIsShown] = useState(0);
  const [isShowDialog, setIsShowDialog] = React.useState(false)
  const obj = { id_product, parentId: id_product, model, price, count };

  const onClickPlus = () => {
    onPlus(obj);
  };
  
  return(
    
    <Pane
    elevation={elev}
    float="left"
    backgroundColor="white"
    margin={24}
    padding={20}              
    flexDirection="column"
    onMouseEnter = {() => setIsShown(4)}              
    onMouseLeave = {() => setIsShown(0)}
    border="0"
    >
    
      <Pane width="250px" height="250px">
      <img src={image} alt="images" width="250px" height="250px"/><br/><br/><br/>
      </Pane>
      <UnorderedList icon={TickIcon} iconColor="success" marginBottom={10}>
        <ListItem>Модель: {model}</ListItem>
        <ListItem>Артикул: {articul}</ListItem>
        <ListItem>{price} ₽</ListItem>
      </UnorderedList>
       
      <IconButton icon={MinusIcon} marginLeft={12} marginRight={majorScale(2)}onClick={() => setCount(count - 1)} />
      <Text marginRight={majorScale(2)}>{count}</Text>
      <IconButton icon={PlusIcon} marginRight={majorScale(2)} onClick={() => setCount(count + 1)}/>
      <Button marginY={8} marginRight={12} iconBefore={ShoppingCartIcon}  onClick={onClickPlus}>
      В корзину
      </Button>
      
      <br/><br/>
      <Button appearance="minimal" width="100%" onClick={() => setIsShowDialog(true)}>Подробнее</Button>
      <br/>

      <Dialog
          isShown={isShowDialog}
          title= {model}
          onCloseComplete={() => setIsShowDialog(false)}
          hasFooter={false}
          padding={40}
        >
          <img src={image} alt="someonePic"/><br/><br/><br/>
          <Paragraph marginBottom={40} size={900}>{detail}</Paragraph>
          
      </Dialog>

    </Pane>
    
    )
    
  }