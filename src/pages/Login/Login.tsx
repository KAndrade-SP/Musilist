import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store'

import {
    ContainerLogin,
    LeftImage,
    RightPanel,
    Title,
    Description,
    GoogleButton,
} from './Login.styles'
import MusicImage from '../../assets/music-image.jpg'
import { IconBrandGoogleFilled } from '@tabler/icons-react'
import { loginWithGoogle } from '../../redux/reducers/authSlice'

const Login = () => {

    const dispatch = useDispatch<AppDispatch>()

    const handleLogin = () => {
        dispatch(loginWithGoogle())
    }

    return (
        <>
            <ContainerLogin>
                <LeftImage src={MusicImage} alt="Sign in Image" />
                <RightPanel>
                    <Title>Welcome back!</Title>
                    <Description>Sign in to continue</Description>
                    <GoogleButton onClick={handleLogin}>
                        <IconBrandGoogleFilled size={24} style={{ marginRight: '8px' }} />
                        Sign in with Google
                    </GoogleButton>
                </RightPanel>
            </ContainerLogin>
        </>
    )
}

export default Login