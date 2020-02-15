import './divination.scss';
import zen from './images/again.gif';

import React from 'react';

// import { tao, taoChn } from './dao'

const initialState = {
    askAquestion: true,
    chapterNum: -1,
    poem: null,
    showEntirePoem: false,
}

export default class Divination extends React.Component {
    state = initialState

    componentDidUpdate(prevProps) {
        if (prevProps.isEnglish !== this.props.isEnglish) {
            this.setState({ ...initialState })
        }
    }

    handleClick = (event) =>  { 
        event.preventDefault()
        this.setState({ askAquestion: false })
// is it english or chinese
        // const source = this.props.isEnglish
        //     ? tao
        //     : taoChn

        const source = this.props.dataSource

//choose a chapter
        const index   = Math.random() * (source.length)
        const rounded = Math.floor(index)
 

        const passage = source[rounded]
        
        const { chapterNum, poem } = passage.passage

  
        //choose a quote
            const chozenPoem   = poem.split('</br>')
            const indexQuote   = Math.random() * (chozenPoem.length - 1)
            const roundedQuote = Math.floor(indexQuote)

            const poemIndexes = [
                roundedQuote,
                // roundedQuote + 1,
            ]
                        
            this.setState({
                chapterNum,
                poem: poem.split('</br>'),
                poemIndexes,
            })            
    }

  

    handleShowPoem = () => {
        this.setState({ showEntirePoem: true })
        this.setState({ askAquestion: false })
    }

    resetAll = () => {
        this.setState({ ...initialState })
        
    }

    render() {
        const { askAquestion, poem, poemIndexes, showEntirePoem } = this.state

        const shouldShowButton = poem && !showEntirePoem

        const questMessage = this.props.isEnglish ? 'Make a question out of your doubts' : '问一个问题'

        const revealBtnMessage = this.props.isEnglish ? 'Reveal a quote...' : '显示报价...'

        const contextBtnMessage = this.props.isEnglish ? 'This quote in chapter' : '本章引用'

        const againBtnMessage = this.props.isEnglish ? 'Start again' : '重新开始'


        return (
            <div className="divination">
                {
                    askAquestion && (
                        <div className="question">
                            <h3> { questMessage }</h3>
                            <a href="#" onClick={this.handleClick} className="reveal_btn" alt="click         to see Dao quote">{ revealBtnMessage }</a> 
                        </div>
                    )
                }

                <div className="quoteContainer">
                    <div className="quoteBlock">
                        {
                            poem && poem.map((line, index) => {
                                const isCurrentLineSelected = poemIndexes.includes(index)

                                const shouldShowLine = isCurrentLineSelected || showEntirePoem

                                let className = shouldShowLine ? "poem-line show" : "poem-line"

                                if (showEntirePoem && isCurrentLineSelected) {
                                    className = className + " highlight"             
                                }

                                return <div key={index} className={className}>{ line }</div>
                            })
                        }
                       
                    </div>

                    {
                        
                        shouldShowButton && (
                            <div className="details">
    <a className="reveal_btn" onClick={this.handleShowPoem}>{contextBtnMessage}</a>
                            </div>
                        )
                    }
                     {
                            !askAquestion && (
                            <div className="again_btn">
                            <a href="#" onClick={this.resetAll} className="zen_btn" alt="new quote from Dao">
                                <img className="try_again" src={zen} alt="try again"></img> {againBtnMessage}
                            </a>
                            </div>)
                        }
                </div>
            </div>

        )
    }
}