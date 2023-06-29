import { useNavigate } from "react-router-dom"
import { accessChatAPI } from "../../../api/dialog-api"
import Button from "../../Button/Button"

type Props = {
    profileId: string
}

const AccessChat:React.FC<Props> = ({profileId}) => {
    const navigate = useNavigate()

    const accessChat = async () => {
        await accessChatAPI(profileId)
        navigate(`/dialogs`)
    }
    
    return (
        <div>
            <Button variant='blue' onClick={accessChat}>
                Написать
            </Button>
        </div>
        
    )
}

export default AccessChat