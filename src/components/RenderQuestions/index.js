import React, {Component} from 'react'
import './index.css'

class RenderQuestions extends Component {
  state = {
    id: '',
    options: [],
    optionsType: 'DEFAULT',
    questionText: '',
    selectedOption: null,
    optionSelected: false,
    score: 'NotAttempted',
  }

  componentDidMount() {
    this.updateState()
  }

  updateState = () => {
    const {item} = this.props
    const {
      id,
      options,
      question_text: questionText,
      options_type: optionsType,
    } = item

    this.setState({
      id,
      options,
      questionText,
      optionsType,
    })
  }

  handleOptionClick = (optionId, isCorrect) => {
    this.setState({
      selectedOption: optionId,
      optionSelected: true,
      score: isCorrect === 'true' ? 1 : 0,
    })
  }

  returnImage = option => {
    const {selectedOption, optionSelected} = this.state

    if (optionSelected && option.id === selectedOption) {
      return (
        <img
          src={
            option.is_correct === 'true'
              ? 'https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png'
              : 'https://assets.ccbp.in/frontend/react-js/quiz-game-close-circle-img.png'
          }
          className="iconContainer"
          alt={option.is_correct === 'true' ? 'correct' : 'incorrect'}
        />
      )
    }

    if (optionSelected && option.is_correct === 'true') {
      return (
        <img
          src="https://assets.ccbp.in/frontend/react-js/quiz-game-check-circle-img.png"
          className="iconContainer"
          alt="correct"
        />
      )
    }

    return null
  }

  returnBackground = option => {
    const {selectedOption, optionSelected} = this.state

    if (optionSelected) {
      if (option.is_correct === 'true') {
        return 'buttonCon optionItemCheck'
      } else if (selectedOption === option.id) {
        return 'buttonCon optionItemClose'
      }
    }

    return 'buttonCon'
  }

  renderDefault = () => {
    const {questionText, options, optionSelected} = this.state
    return (
      <div className="questionContainer">
        <h1 className="questionText">{questionText}</h1>
        <ul className="optionsList">
          {options.map(option => (
            <li key={option.id} className="optionItem">
              <button
                className={this.returnBackground(option)}
                onClick={() =>
                  this.handleOptionClick(option.id, option.is_correct)
                }
                disabled={optionSelected}
              >
                {option.text}
              </button>
              <div className="iconContainer">{this.returnImage(option)}</div>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  renderQuestionWithType = () => {
    const {optionsType} = this.state
    switch (optionsType) {
      case 'DEFAULT':
        return this.renderDefault()
      default:
        return null
    }
  }

  returnScore = () => {
    const {score} = this.state
    const {updateScore} = this.props
    updateScore(score)
  }

  render() {
    const {optionSelected} = this.state
    return (
      <div className="containerRender">
        {this.renderQuestionWithType()}
        <div
          className={`buttonContainer ${
            optionSelected ? 'onSelectButton' : ''
          }`}
        >
          <button
            disabled={!optionSelected}
            className={`buttonCon ${optionSelected ? 'onSelectButton' : ''}`}
            onClick={this.returnScore}
          >
            Next Question
          </button>
        </div>
      </div>
    )
  }
}

export default RenderQuestions
