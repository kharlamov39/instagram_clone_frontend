import { Navigate, useParams } from "react-router-dom";

type Props = {
    currentId: string | undefined
    children?: React.ReactNode
}

const Protected:React.FC<Props> = ({currentId, children}) => {
    const {id} = useParams()

    if( currentId !== id) {
        return <Navigate to='/' />
    }

    return (children as React.ReactElement);
}

export default Protected