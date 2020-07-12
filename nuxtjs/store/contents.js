export const state = () => ({
  loading: false,
  loaded: false,
  contents: [],
  selectedId: null,
  error: null,
})

export const getters = {
  contentState: (state) => {
    return state
  },
  selectedContent: (state) => {
    const { contents, selectedId } = state
    return contents[selectedId]
  },
}

export const mutations = {
  init(state) {
    state.loading = true
  },
  initSuccess(state, { contents }) {
    state.loading = false
    state.loaded = true
    state.error = null
    state.contents = mergeObj(state.contents, arrayToDictionary(contents))
  },
  initFailure(state, { error }) {
    state.loading = false
    state.loaded = false
    state.error = error
  },
  getAll(state) {
    state.loading = true
  },
  getAllSuccess(state, { contents }) {
    state.loading = false
    state.error = null
    state.contents = mergeObj(state.contents, arrayToDictionary(contents))
  },
  getAllFailure(state, { error }) {
    state.loading = false
    state.error = error
  },
  getOne(state, { selectedId }) {
    state.loading = true
    state.selectedId = selectedId
  },
}

export const actions = {
  init({ commit }) {
    return this.$axios
      .$get('http://strapi:1337/contents')
      .then((contents) => {
        commit('getAllSuccess', { contents })
      })
      .catch((error) => commit('getAllFailure', { error }))
  },
}

function arrayToDictionary(arr) {
  return arr.reduce((acc, cur) => {
    return (acc = { ...acc, [cur.id]: cur })
  }, {})
}

function mergeObj(pastObj, newObj) {
  return { ...pastObj, ...newObj }
}
