import './App.scss';



import React from 'react';

import daoHanzi from './images/dao_hanzi.gif';
import daoFlip from './images/dao_flip.gif';

import { tao, taoChn } from './dao'

import Divination from './Divination.js'

export default class App extends React.Component {
  state = {
    isEnglish:  true,
    dataSource: tao,
  }

  handleLangChange = (event) => {
    event.preventDefault()

    this.setState({
      isEnglish:  !this.state.isEnglish,
      dataSource: !this.state.isEnglish ? tao : taoChn,
    })
  }


  render() {    
    const { isEnglish, dataSource } = this.state

    const header = isEnglish ? 'Divination through DAO DE JING quotes' : '通过占卜 道德静语录'
    
    const message = isEnglish ? '中文' : 'Engish'

    return (
      <div className="app">
         
          <div className="section left">
            <img className="img-left" src={daoHanzi} alt="Dao Hanzi"></img>
          </div>
      <div className="section main">
          <header>
          <a href="#" onClick={this.handleLangChange} className="lang_btn">{message}</a>
            <h1> { header }</h1>
          </header>
          <article>
            <Divination isEnglish={isEnglish} dataSource={dataSource} />
          </article>
      </div>
          <div className="section right">
            <img className="img-right" src={daoFlip} alt="Dao Hanzi"></img>
          </div>
      </div>
    );
  }
}

