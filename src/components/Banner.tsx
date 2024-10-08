import { styled } from 'styled-components'
import { User } from '../types/UserTypes'

const BannerWrapper = styled.div`
    position: relative;
    height: 330px;
    margin-top: -90px;
    background-image: url('https://via.placeholder.com/1600x330');
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`

const BannerContainer = styled.div`
    display: flex;
    width: 1440px;
    justify-self: start;
    padding: 2rem 2rem 1rem;
`

const UserWrapperHeader = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1rem;
    align-items: center;
    justify-content: center;
`

const UserIconHeader = styled.img`
    width: 120px;
    border-radius: 100%;
`

const UserNameHeader = styled.span`
    ${({ theme: { colors, fontSizes } }) => `
        font-size: ${fontSizes.biggestFontSize};
        color: ${colors.textWhite};
        font-weight: bold;
    `}
`

const Banner = ({ user }: { user: User | null }) => {

    return (
        <>
            {user &&
                <BannerWrapper>
                    <BannerContainer>
                        <UserWrapperHeader>
                            <UserIconHeader src={user.photoURL || ''} alt={user.displayName + "photo" || 'User photo'}></UserIconHeader>
                            <UserNameHeader>{user.displayName}</UserNameHeader>
                        </UserWrapperHeader>
                    </BannerContainer>
                </BannerWrapper>
            }
        </>
    )
}

export default Banner