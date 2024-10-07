import { useDispatch, useSelector } from 'react-redux'
import { styled } from 'styled-components'
import { AppDispatch, RootState } from '../redux/store'

const BannerWrapper = styled.div`
    position: relative;
    height: 330px;
    margin-top: -90px;
    background-image: url('https://via.placeholder.com/1600x330');
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: flex-end;
    padding: 20px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); 
`

const UserWrapperHeader = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1rem;
    align-items: center;
    justify-content: center;
`

const UserIconHeader = styled.img`
    width: 80px;
    border-radius: 100%;
`

const UserNameHeader = styled.span`
    ${({ theme: { colors, fontSizes } }) => `
        font-size: ${fontSizes.bigFontSize};
        color: ${colors.textWhite};
        font-weight: bold;
    `}
`

const Banner = () => {

    const dispatch = useDispatch<AppDispatch>()
    const { user, loading, error } = useSelector((state: RootState) => state.auth)

    return (

        <BannerWrapper>
            <UserWrapperHeader>
                <UserIconHeader src={user?.photoURL || ''} alt={user?.displayName + "photo" || 'User photo'}></UserIconHeader>
                <UserNameHeader>{user?.displayName}</UserNameHeader>
            </UserWrapperHeader>
        </BannerWrapper>
    )
}

export default Banner