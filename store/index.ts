export const state = () => ({
  video: null,
  load: 0,
})

export const mutations = {
  setVideo: (state: any, video: HTMLVideoElement) => {
    state.video = video
  },
  loadCount: (state: any) => {
    state.load++
  },
}

export const getters = {
  video: (state: any) => {
    return state.video
  },
  load: (state: any) => {
    return state.load
  },
}
