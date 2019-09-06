import axios from 'axios'
import global from '../store/global'
// import mock from './mock'

const prefix = '/api'

function ajax ({
  url = null,
  method = 'GET',
  data = {},
  success = console.log,
  fail = console.log,
  error = console.log
}) {
  if (url === null) {
    return false
  }
  url = prefix + url
  if (method === 'GET') {
    axios.get(
      url,
      {
        params: data,
        headers: {'Authorization': global.token}
      }
    ).then(res => {
      if (res.status === 200 && res.data.code === 200) {
        success(res.data)
      } else {
        fail(res)
      }
    }).catch(res => {
      error(res)
    })
  } else {
    let param = new URLSearchParams()
    for (let i in data) {
      param.append(i, data[i])
    }
    axios.post(
      url,
      data,
      {
        headers: {'Authorization': global.token}
      }
    ).then(res => {
      success(res.data)
      // } else {
      //   fail(res)
      // }
    }).catch(res => {
      error(res)
    })
  }
}

// function ajax2 ({
//   url = null,
//   method = 'GET',
//   data = {},
//   success = console.log,
//   fail = console.log
// }) {
//   if (url === null) {
//     return false
//   }
//   setTimeout(() => {
//     success(mock[url][method])
//   })
// }

export default ajax
