import styled from 'styled-components'

export const MediaBannerWrapper = styled.div<{ $backgroundColor: string }>`
  position: relative;
  width: 100%;
  height: 400px;
  overflow: visible;
  display: flex;
  align-items: center;
  background-color: ${({ $backgroundColor }) => $backgroundColor};
`

export const HiddenImage = styled.img`
  display: none;
`

export const BackgroundImage = styled.div<{ $image: string; $dominantColor: string | null }>`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 30%;
  background-image: url(${({ $image }) => $image});
  background-size: cover;
  background-position: center;
  mask-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0) 0%,
    ${({ $dominantColor }) => $dominantColor || 'rgba(0, 0, 0, 1)'} 100%
  );
  -webkit-mask-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0) 0%,
    ${({ $dominantColor }) => $dominantColor || 'rgba(0, 0, 0, 1)'} 100%
  );
  z-index: 1;
`

export const BannerContent = styled.div`
  position: relative;
  z-index: 3;
  width: 100%;
`
