
import s1 from "../assets/s1.jpg"
import tshirtwomen1 from "../assets/tshirtwomen1.jpg"
import s3 from "../assets/s3.jpg"
import s4 from "../assets/s4.jpg"

const Background = ({heroCount}) => {

    if(heroCount === 0) {
        return  <div className="w-full h-full relative overflow-auto">
        <img src={s1} alt=""  className='w-full h-full float-left object-cover'/>
        </div> 
    }else if(heroCount === 1){
        return <div className="w-full h-full relative overflow-auto">
                <img src={tshirtwomen1} alt=""  className='w-full h-full float-left object-cover'/>
            </div> 
    }else if(heroCount === 2){
        return <div className="w-full h-full relative overflow-auto">
        <img src={s3} alt=""  className='w-full h-full float-left object-cover'/>
        </div> 
    }else if(heroCount === 3){
        return <div className="w-full h-full relative overflow-auto">
        <img src={s4} alt=""  className='w-full h-full float-left object-cover'/>
        </div> 
    }

}

export default Background


