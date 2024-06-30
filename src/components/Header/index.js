import Cookies from 'js-cookie'
import {withRouter} from 'react-router-dom'

import './index.css'

const Header = props => {
  const onLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <div className="container1">
      <img
        src="https://res.cloudinary.com/dtrekraqy/image/upload/v1717669177/Frame_8787_ivg2xc.png"
        className="img"
        alt="website logo"
      />
      <div className="button1">
        <button onClick={onLogout} className="butt1">
          Logout
        </button>
      </div>
    </div>
  )
}

export default withRouter(Header)
