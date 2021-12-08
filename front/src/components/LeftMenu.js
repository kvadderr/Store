import React from 'react';
import { Menu, Strong } from 'evergreen-ui';

export default function MainMenu({setCatalogName}) {

  return(
      
    <Menu >
      <Menu.Group>  
        <Strong   size={400} marginBottom={10} marginLeft={15} >Wi-FI</Strong >
          <Menu.Item onSelect={ () => setCatalogName("Wi-FI роутеры")}>Wi-FI роутеры</Menu.Item>
          <Menu.Item onSelect={ () => setCatalogName("Точки доступа")}>Точки доступа</Menu.Item>
          <Menu.Item onSelect={ () => setCatalogName("Антенны")}>Антенны</Menu.Item>
          <br/>
        <Strong   size={400} marginBottom={10} marginLeft={15}>4G/5G</Strong >
          <Menu.Item onSelect={ () => setCatalogName("4G/5G роутеры")}>4G/5G роутеры</Menu.Item>
          <Menu.Item onSelect={ () => setCatalogName("4G/5G USB")}>4G/5G USB</Menu.Item>
          <Menu.Item onSelect={ () => setCatalogName("Сим карты")}>Сим карты</Menu.Item>
          <br/>
        <Strong   size={400} marginBottom={10} marginLeft={15}>Авто</Strong >
          <Menu.Item onSelect={ () => setCatalogName("Автомагнитолы")}>Автомагнитолы</Menu.Item>
          <Menu.Item onSelect={ () => setCatalogName("Антирадары")}>Антирадары</Menu.Item>
          <Menu.Item onSelect={ () => setCatalogName("Видеорегистраторы")}>Видеорегистраторы</Menu.Item>
          <Menu.Item onSelect={ () => setCatalogName("Навигаторы")}>Навигаторы</Menu.Item>
          <Menu.Item onSelect={ () => setCatalogName("Охранный комплекс")}>Охранный комплекс</Menu.Item>
      </Menu.Group>
    </Menu>
     
  )
}