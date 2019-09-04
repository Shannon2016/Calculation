var config = {
  map: {
    backgroundColor: 'rgba(0,0,0,0.01)',
    visualMap: {
      type: 'piecewise',
      pieces: [
        {min: 60, max: 100, label: '安全', color: '#FF8500'},
        {min: 30, max: 60, label: '安全', color: '#FF5500'},
        {min: 0, max: 30, label: '安全', color: '#FF2500'}
      ],
      color: '#fff',
      textStyle: {
        color: '#fff'
      },
      visibility: 'off'
    },
    tooltip: {
    },
    series: [{
      name: '数据名称',
      type: 'map',
      mapType: name,
      selectedMode: 'single',
      showLegendSymbol: false,
      visibility: 'off',
      itemStyle: {
        normal: {
          color: '#ccc',
          areaColor: 'orange',
          borderColor: '#444',
          borderWidth: 0.5,
          label: {
            show: true,
            textStyle: {
              color: 'orange'
            }
          }
        },
        emphasis: {
          areaColor: 'orange',
          borderColor: '#rgb(43, 214, 177)',
          areaStyle: {
            color: 'orange'
          },
          label: {
            show: true,
            textStyle: {
              color: '#444'
            }
          }
        }
      },
      data: []
    }]
  },
  pie: {
    backgroundColor: 'transparent',
    title: {
      text: '某站点用户访问来源',
      subtext: '纯属虚构',
      x: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        data: [
          {value: 335, name: '直接访问'},
          {value: 310, name: '邮件营销'},
          {value: 234, name: '联盟广告'},
          {value: 135, name: '视频广告'},
          {value: 1548, name: '搜索引擎'}
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  },
  rightBottom: {
    backgroundColor: 'transparent',
    title: {
      text: '某站点用户访问来源',
      subtext: '纯属虚构',
      x: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        data: [
          {value: 335, name: '直接访问'},
          {value: 310, name: '邮件营销'},
          {value: 234, name: '联盟广告'},
          {value: 135, name: '视频广告'},
          {value: 1548, name: '搜索引擎'}
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  },
  line: {
    backgroundColor: 'transparent',
    xAxis: {
      type: 'category',
      data: [],
      axisLabel: {
        interval: 0,
        rotate: 40
      }
    },
    legend: {
      data: []
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: [],
      type: 'line'
    }],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    dataZoom: {
      show: true,
      realtime: true,
      orient: 'vertical',
      width: 20,
      start: 70,
      end: 100
    }
  },
  bar: {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    dataZoom: {
      show: true,
      realtime: true,
      orient: 'vertical',
      width: 20,
      start: 70,
      end: 100
    },
    legend: {
      data: []
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'value'
    },
    yAxis: {
      type: 'category',
      data: []
    },
    series: [
      {
        name: '直接访问',
        type: 'bar',
        stack: '总量',
        label: {
          normal: {
            show: true,
            position: 'insideRight'
          }
        },
        data: []
      }
    ]
  },
  smLine: {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      top: 30,
      left: 40,
      right: 20,
      bottom: 50
    },
    backgroundColor: 'transparent',
    xAxis: {
      type: 'category',
      data: []
    },
    legend: {
      show: false
    },
    dataZoom: {
      show: true,
      realtime: true,
      height: 20,
      start: 0,
      end: 30,
      bottom: 0
    },
    yAxis: {
      type: 'value',
      name: '总人口'
    },
    series: [{
      data: [],
      type: 'line',
      smooth: true,
      symbolSize: 10,
      itemStyle: {
        normal: {
          color: '#386db3',
          lineStyle: {
            color: '#386db3'
          }
        }
      }
    }]
  }
}

export default function getConfig (name) {
  return copyObject(config[name])
}

function copyObject (src) {
  if (src instanceof Object) {
    if (src instanceof Array) {
      let ans = []
      for (let i of src) {
        ans.push(copyObject(i))
      }
      return ans
    } else if (src instanceof Function) {
      return src
    }
    let ans = {}
    for (let i in src) {
      ans[i] = copyObject(src[i])
    }
    return ans
  }
  return src
}
