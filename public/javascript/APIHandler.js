class APIHandler {
  constructor (baseUrl) {
    this.BASE_URL = baseUrl;
  }

  getFullList () { // or FETCH
    return axios.get(this.BASE_URL + "/characters");
  }

  getOneRegister (id) {
    return axios.get(this.BASE_URL + `/characters/${id}`)
  }

  createOneRegister (character) {
    return axios.post(this.BASE_URL + `/characters`, character)
  }

  updateOneRegister (id, data) {
    return axios.patch(this.BASE_URL + `/characters/${id}`, data)
  }

  deleteOneRegister (id) {
    return axios.delete(this.BASE_URL + `/characters/${id}`)
  }
}




