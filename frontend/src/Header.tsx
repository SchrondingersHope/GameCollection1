import './Header.css'

function Header(){
    return (
        <div className="header">
            <div className="nav">N</div>
            <div className="mid">
                <div className="logo">L</div>

                {/* default is offline, can be changed to be against bot/online. */}
                <div className="play">P</div>
                <div className="score">S</div>
                <div className="timer">T</div>

                {/* after timer starts, turn off go first/second toggle */}
                <input type="button"/> 
            </div>
            <div className="login">LSP</div>
        </div>
    )
}

export default Header

//  nav icon, logo/home page, play (offline, against bot, online), score, timer, (go first/second), login/signup/profile 
// for dot game, set dimensions (maybe allow both horizontal and vertical)