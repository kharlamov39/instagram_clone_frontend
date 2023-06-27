import { useEffect, useRef } from 'react'
import { UserRes } from '../../../../types/resTypes'
import User from '../../../FullPost/User/User'
import styles from './PopupSearch.module.css'

type Props = {
    data: UserRes[]
    setPopup: (arg: boolean) => void
}

const PopupSearch:React.FC<Props> = ({data, setPopup}) => {
    const popupRef = useRef<HTMLDivElement>(null)

    useEffect ( () => {
        const handleClickOutside = (e:any) => {
            if(popupRef.current && !popupRef.current.contains(e.target)) {
                setPopup(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
            
        }
    }, [popupRef])

    return (
        <div className={styles.main} ref={popupRef} >
            { !!data.length && data.map( el => (
                <div key={el._id} onClick={ () => setPopup(false)}> <User user={el} /> </div>
                ) 
            )}
        </div>
    )
}

export default PopupSearch