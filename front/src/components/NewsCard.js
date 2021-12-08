import React from 'react'
import {Pane, Paragraph, Heading} from 'evergreen-ui'


export default function NewsCard() {
    return(

        <Pane>
            
            <Pane margin="auto" width="60%" paddingTop="100px" paddingBottom="100px">
              <Heading size={900}>
                Запуск сайта!
              </Heading>
              <Paragraph size={500} marginTop={30} marginBottom={80}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Paragraph>
              
              <Heading size={900}>
                Запуск сайта!
              </Heading>
              <Paragraph size={500} marginTop={50} marginBottom={10}>Lorem Ipsum is simply dumm Ipsum.</Paragraph>
              
            </Pane>
        </Pane>
    )
}