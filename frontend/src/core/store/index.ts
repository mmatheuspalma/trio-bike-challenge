import { createPinia, setMapStoreSuffix } from 'pinia'

setMapStoreSuffix('')
const store = createPinia()

export { mapState, mapActions } from 'pinia'
export * from './modules'

export default store
