import styles from './Button.module.css'

type Props = {
    children: React.ReactNode
    variant: string
    type?: 'submit' | 'reset' | 'button'
    onClick?: () => void
}

const Button:React.FC<Props> = ({children, variant, type, onClick}) => {
    return (
        <button type={type} className={styles.button} style={{backgroundColor: variant}} onClick={onClick} >
            {children}
        </button>
    )
}

export default Button