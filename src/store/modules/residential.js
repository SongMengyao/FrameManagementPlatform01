import {
  getHousePage,
  getAddHouse,
  getEditHouse,
  getHouseInfo,
  getZoneTree,
  getBedList,
  getRoomList,
  getZoneList,
  getZoneSave,
  getRoomSave,
  getRoomSaveList
} from '@/api/residentialMana/residential'

const residential = {
  state: {},
  mutations: {},
  actions: {
    getHousePage ({ commit }, product) {
      return new Promise((resolve, reject) => {
        getHousePage(product).then(rest => {
          resolve(rest)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getAddHouse ({ commit }, product) {
      return new Promise((resolve, reject) => {
        getAddHouse(product).then(rest => {
          resolve(rest)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getEditHouse ({ commit }, product) {
      return new Promise((resolve, reject) => {
        getEditHouse(product).then(rest => {
          resolve(rest)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getHouseInfo ({ commit }, product) {
      return new Promise((resolve, reject) => {
        getHouseInfo(product).then(rest => {
          resolve(rest)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getZoneTree ({ commit }, product) {
      return new Promise((resolve, reject) => {
        getZoneTree(product).then(rest => {
          resolve(rest)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getBedList ({ commit }, product) {
      return new Promise((resolve, reject) => {
        getBedList(product).then(rest => {
          resolve(rest)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getRoomList ({ commit }, product) {
      return new Promise((resolve, reject) => {
        getRoomList(product).then(rest => {
          resolve(rest)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getZoneList ({ commit }, product) {
      return new Promise((resolve, reject) => {
        getZoneList(product).then(rest => {
          resolve(rest)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getZoneSave ({ commit }, product) {
      return new Promise((resolve, reject) => {
        getZoneSave(product).then(rest => {
          resolve(rest)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getRoomSave ({ commit }, product) {
      return new Promise((resolve, reject) => {
        getRoomSave(product).then(rest => {
          resolve(rest)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getRoomSaveList ({ commit }, product) {
      return new Promise((resolve, reject) => {
        getRoomSaveList(product).then(rest => {
          resolve(rest)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default residential
