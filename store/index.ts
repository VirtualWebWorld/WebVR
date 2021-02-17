export const state = () => ({
  video: null,
})

export const mutations = {
  setVideo: (state: any, video: HTMLVideoElement) => {
    state.video = video
  },
}

export const getters = {
  video: (state: any) => {
    return state.video
  },
}
