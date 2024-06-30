import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import RenderQuestions from '../RenderQuestions'
import './index.css'

class QuizGame extends Component {
  state = {
    dataFetched: false,
    questionsList: [],
    noOfQ: 0,
    currentQuestion: 1,
    score: 0,
    notAttemtedQuestionsID: [],
  }
  componentDidMount() {
    this.fetchData()
  }
  fetchData = async () => {
    const response = await fetch('https://apis.ccbp.in/assess/questions')
    if (response.ok) {
      const data = await response.json()
      this.setState({
        dataFetched: true,
        questionsList: data.questions,
        noOfQ: data.total,
      })
    }
  }
  renderLoader() {
    return (
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#263868" height={50} width={50} />
      </div>
    )
  }
  updateScore = value => {
    if (value === 'NotAttempted') {
      this.setState(prevState => {
        return {
          notAttemtedQuestionsID: [...prevState.notAttemtedQuestionsID, value],
          currentQuestion: prevState.currentQuestion + 1,
        }
      })
    } else {
      this.setState(prevState => {
        return {
          score: prevState.score + value,
          currentQuestion: prevState.currentQuestion + 1,
        }
      })
    }
  }
  renderQuestions() {
    const {questionsList, currentQuestion} = this.state
    return (
      <RenderQuestions
        updateScore={this.updateScore}
        item={questionsList[currentQuestion - 1]}
      />
    )
  }
  render() {
    const {dataFetched, noOfQ, questionsList, currentQuestion} = this.state
    console.log(questionsList[0])
    return (
      <div className="quizContainer">
        <Header />
        <div className="questionsContainer ">
          <div className="questionsCard">
            {!dataFetched && this.renderLoader()}
            {dataFetched && (
              <div className="headerQ">
                <div className="pink">
                  <p className="qq">
                    Question
                    <br />
                    <span className="qNum">
                      {currentQuestion}/{noOfQ}
                    </span>
                  </p>
                </div>
                <img
                  src="https://res.cloudinary.com/dtrekraqy/image/upload/v1718601550/Group_7819_1_pg9jxm.png"
                  alt="timer"
                  className="imageTimer"
                />
              </div>
            )}
            {dataFetched && (
              <div className="questionCon">{this.renderQuestions()}</div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default QuizGame
