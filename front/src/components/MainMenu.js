import React from 'react';
import { Link,  TextInput, CornerDialog, TreeIcon, Pane, Heading, toaster} from 'evergreen-ui';
import axios from 'axios';

export default function LeftMenu() {

  const [isShown, setIsShown] = React.useState(false)
  const [value, setValue] = React.useState('')

  const json = JSON.stringify({ phone: value, status: "Рассматривается" });

  function sendApplication(){
    axios.post("http://localhost:4000/api/application", json, {
      "headers": {      
      "content-type": "application/json",
      },
    });
    toaster.success('Ваша заявка будет рассмотрена в ближайшее время!')
  }


  return(

    <Pane width="100%" background="white" margin={0}>
      
      <CornerDialog
        title="Добро пожаловать"
        isShown={isShown}
        confirmLabel="Отправить заявку"
        cancelLabel = "Отмена"
        onCloseComplete={() => setIsShown(false)}
        onConfirm = {() =>  sendApplication() }>
        В случае проблем или возникновения вопросов введите свой номер телефона.
        <TextInput onChange={e => setValue(e.target.value)} value={value} marginTop={10}/>
      </CornerDialog>

      <Pane 
        elevation={0} 
        display="flex" 
        padding={16} 
        border="default">
        
        <Pane 
          flex={1} 
          alignItems="center" 
          display="flex">
          <TreeIcon color="success" marginRight={10} marginLeft={16}/>
          <Heading is="h2">KVADDER</Heading>
        </Pane>
        
        <Pane 
          flex={5} 
          alignItems="center" 
          display="flex">
          
          <Link href="/store" marginLeft={30} marginRight={24}  color="neutral">Каталог</Link>
          {/*
          <Link href="/news" marginRight={24} color="neutral">Новости</Link>
          */}
          <Link href="/about" marginRight={24} color="neutral">О компании</Link>
          <Link marginRight={24} color="neutral" onClick={() => setIsShown(true)}>Обратная связь</Link>

        </Pane>
    
      </Pane>
    </Pane>


    )
}