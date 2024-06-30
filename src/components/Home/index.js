import React, {Component} from 'react'
import Header from '../Header'
import './index.css'

class Home extends Component {
  state = {
    showAlert: false,
  }
  navigateToQuiz = () => {
    const {history} = this.props
    history.push('/quiz-game')
  }
  showAlert = () => {
    this.setState({showAlert: true})
    setTimeout(this.navigateToQuiz, 1000)
  }
  renderAlert() {
    return (
      <div className="errorContainer">
        <img
          src="https://res.cloudinary.com/dtrekraqy/image/upload/v1718599145/error_kzydya.png"
          alt="alert"
        />
        <p>All the progress will be lost, if you reload during the quiz</p>
      </div>
    )
  }
  render() {
    const {showAlert} = this.state
    return (
      <div className="containerHome">
        <Header />
        <div className="homeContainer">
          <div className="card1">
            <img
              src="https://res.cloudinary.com/dtrekraqy/image/upload/v1717691839/undraw_Questions_re_1fy7_1_bbzvhc.png"
              className="img1"
              alt="start quiz game"
            />
            <h1 className="heading1">
              How Many Of These Questions Do You Actually Know?
            </h1>
            <p className="para1">
              Test yourself with these easy quiz questions and answers
            </p>
            <div className="">
              <button onClick={this.showAlert} className="butt2">
                Start Quiz
              </button>
            </div>
            <div className="containerError">
              {showAlert && this.renderAlert()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
