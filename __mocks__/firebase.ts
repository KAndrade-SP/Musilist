const mockInitializeApp = jest.fn()
const mockGetAuth = jest.fn(() => ({
  signInWithPopup: jest.fn(),
  signOut: jest.fn(),
}))

const mockGoogleAuthProvider = jest.fn()

export const initializeApp = mockInitializeApp
export const getAuth = mockGetAuth
export const GoogleAuthProvider = mockGoogleAuthProvider
