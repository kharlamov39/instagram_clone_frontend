import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'

export const useAppDispatch: () => AppDispatch =  useDispatch
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector