import '../Assests/Css/Statics.css'

function Statics() {
    return ( 
        <>
            <div className="d-flex statics">
                <div className="statics-box">
                    <div className="countnum">476</div>
                    <div className="counttext">Job Posted Today</div>
                </div>
                <div><hr className='border-section'/></div>
                <div className="statics-box">
                    <div className="countnum">2+</div>
                    <div className="counttext">Millions Daily
                    Active Users</div>
                </div>
                <div><hr className='border-section'/></div>
                <div className="statics-box">
                    <div className="countnum">5k</div>
                    <div className="counttext">Trusted by Big
                    Companies</div>
                </div>
                <div><hr className='border-section'/></div>
                <div className="statics-box">
                    <div className="countnum">10M</div>
                    <div className="counttext">Over 10 Million
                    skill connection</div>
                </div>
            </div>
        </>
     );
}

export default Statics;