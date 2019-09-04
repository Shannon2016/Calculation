const year = new Date()
const population = {
  year: year.getFullYear() - 1,
  area: '100000',
  isPredicting: false,
  predictYear: 2019,
  currentTab: 0,
  name: '中国',
  areaBuf: '100000',
  nameBuf: '100000',
  min: year.getFullYear() - 1,
  max: year.getFullYear() - 1,
  highLightIndex: 0,
  breadCrumb: [{
    name: '中国',
    code: '100000'
  }],
  breadCrumbBuf: [{
    name: '中国',
    code: '100000'
  }]
}
export default population
