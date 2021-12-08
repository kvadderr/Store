import React from 'react'
import NewsCard from '../../components/NewsCard'
import MainMenu from '../../components/MainMenu'
import {Pane} from 'evergreen-ui'

export default function News() {
    
    return(
        <Pane>
          <MainMenu/>
          <NewsCard/>
          
        </Pane>
    )
} 
