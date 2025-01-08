import styled from 'styled-components'

export const UploadContainer = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
  max-width: 200px;
  height: 200px;
  border: 2px dashed ${({ theme }) => theme.colors.lightPurple};
  background-color: ${({ theme }) => theme.colors.grayBackground};
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.darkPurple};
    border-color: ${({ theme }) => theme.colors.purplePrimary};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 150px;
    height: 150px;
  }
`

export const UploadText = styled.p`
  color: ${({ theme }) => theme.colors.textWhite};
  font-size: ${({ theme }) => theme.fontSizes.normalFontSize};
  text-align: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.fontSizes.smallFontSize};
  }
`

export const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
`

export const HiddenInput = styled.input`
  display: none;
`
