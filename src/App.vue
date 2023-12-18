<template>
  <div id="app">
    <svg id="main" width="1800" height="1000">
      <g id="links"></g>
      <g id="circles"></g>
    </svg>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import * as d3 from 'd3'
// import func from 'vue-editor-bridge'

export default {
  name: 'App',
  components: {
    // HelloWorld
  },
  data () {
    return {
      nodes: [],
      links: [],
      idToIndex: {}
    }
  },
  mounted () {
    let url = "miserable.json"
    let request = new XMLHttpRequest()
    let that = this
    request.open("get", url)
    request.send(null)
    request.onload = function () {
      let data = JSON.parse(request.responseText)
      that.processData(data)
    }
  },
  methods: {
    processData (data) {
      const nodes = data.nodes
      const links = data.links
      console.log(nodes, links)
      this.nodes = data.nodes
      this.links = data.links
      let svg = d3.select('svg')
      let width = +svg.attr('width')
      let height = +svg.attr('height')
      console.log(width, height)
      // 添加node
      for (let i = 0, n = this.nodes.length; i < n; ++i) {
        // node颜色
        const color_arr = ['#bebada', '#fb8072', '#80b1d3', '#ffffb3', '#fdb462', '#b3de69',
          '#8dd3c7', '#fccde5', '#3b6a64', '#060808', '#baaf7c'
        ]
        let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
        this.nodes[i].x = 450 + width / 2 * Math.random()
        this.nodes[i].y = 200 + height / 2 * Math.random()
        // center 900 550
        this.nodes[i].vx = this.nodes[i].vy = 0
        this.nodes[i].flag = 0
        this.idToIndex[this.nodes[i].id] = i
        circle.setAttribute("r", 7)
        circle.setAttribute("cx", this.nodes[i].x)
        circle.setAttribute("cy", this.nodes[i].y)
        circle.setAttribute("fill", color_arr[this.nodes[i].group])
        circle.setAttribute("group", this.nodes[i].group)
        circle.setAttribute("name", this.nodes[i].id)
        circle.setAttribute("id", this.nodes[i].id)
        circle.setAttribute("stroke", "#fff")
        circle.setAttribute("stroke-width", "2px")
        let g = document.getElementById('circles')
        g.appendChild(circle)
        let that = this
        circle.onmousedown = function () {
          // let event = e || window.event
          // let point_x = event.offsetX
          // let point_y = event.offsetY
          let index = that.idToIndex[circle.id]
          that.nodes[index].flag = 1
          document.onmousemove = function (ent) {
            let evt = ent || window.event
            let ele_left = evt.offsetX
            let ele_top = evt.offsetY
            that.nodes[index].x = ele_left
            that.nodes[index].y = ele_top
            that.nodes[index].vx = that.nodes[index].vy = 0
          }
          document.onmouseup = function () {
            console.log("抬起停止移动")
            // 移除移动和抬起事件
            that.nodes[index].flag = 0
            this.onmouseup = null
            this.onmousemove = null
          }
          // 解决有些时候,在鼠标松开的时候,元素仍然可以拖动-使用的是第二种方式
          document.ondragstart = function (ev) {
            ev.preventDefault()
          }
          document.ondragend = function (ev) {
            ev.preventDefault()
          }
        }
      }
      // 添加link
      for (let i = 0, n = this.links.length; i < n; ++i) {
        let source = this.links[i].source
        let target = this.links[i].target
        let line = document.createElementNS("http://www.w3.org/2000/svg", "line")
        let source_node = document.getElementById(source)
        let target_node = document.getElementById(target)
        this.links[i].x1 = source_node.getAttribute('cx')
        this.links[i].x2 = target_node.getAttribute('cx')
        this.links[i].y1 = source_node.getAttribute('cy')
        this.links[i].y2 = target_node.getAttribute('cy')
        line.setAttribute("x1", this.links[i].x1)
        line.setAttribute("x2", this.links[i].x2)
        line.setAttribute("y1", this.links[i].y1)
        line.setAttribute("y2", this.links[i].y2)
        line.setAttribute("id", source + target)
        line.setAttribute("value", this.links[i].value)
        line.setAttribute("stroke", "#dfdece")
        line.setAttribute("stroke-width", "2px")
        let g = document.getElementById('links')
        g.appendChild(line)
      }
      setInterval(this.update, 0.01)
      // let intervalId = setInterval(update, 10)
    },

    update () {
      this.updateNodePos()
      // this.nodes[1].x = this.nodes[1].x + 0.5
      // this.nodes[1].y = this.nodes[1].y + 0.5
      // 更新
      for (let i = 0, n = this.nodes.length; i < n; ++i) {
        let node = document.getElementById(this.nodes[i].id)
        if (this.nodes[i].flag == 0) {
          this.nodes[i].x += this.nodes[i].vx
          this.nodes[i].y += this.nodes[i].vy
        }
        node.setAttribute("cx", this.nodes[i].x)
        node.setAttribute("cy", this.nodes[i].y)
        this.nodes[i].vx = this.nodes[i].vy = 0
      }
      for (let i = 0, n = this.links.length; i < n; ++i) {
        let source = this.links[i].source
        let target = this.links[i].target
        let link = document.getElementById(source + target)

        let source_node = document.getElementById(source)
        let target_node = document.getElementById(target)
        this.links[i].x1 = source_node.getAttribute('cx')
        this.links[i].x2 = target_node.getAttribute('cx')
        this.links[i].y1 = source_node.getAttribute('cy')
        this.links[i].y2 = target_node.getAttribute('cy')

        link.setAttribute("x1", this.links[i].x1)
        link.setAttribute("x2", this.links[i].x2)
        link.setAttribute("y1", this.links[i].y1)
        link.setAttribute("y2", this.links[i].y2)
      }
    },
    updateNodePos () {
      // node间斥力
      let alpha = 3e-2
      for (let i = 0, n = this.nodes.length; i < n; i++) {
        for (let j = 0; j < n; j++) {
          if (i == j) continue
          else {
            let dx = (this.nodes[j].x - this.nodes[i].x == 0) ? 1e-6 : (this.nodes[j].x - this.nodes[i].x)
            let dy = (this.nodes[j].y - this.nodes[i].y == 0) ? 1e-6 : (this.nodes[j].y - this.nodes[i].y)
            let r = Math.sqrt(dx * dx + dy * dy)
            let k = alpha / r
            this.nodes[j].vx += dx * k
            this.nodes[j].vy += dy * k
          }
        }
      }
      // center的引力
      let epsilon = 3e-8
      for (let i = 0, n = this.nodes.length; i < n; i++) {
        let centerX = 900, centerY = 550
        let dx = centerX - this.nodes[i].x,
          dy = centerY - this.nodes[i].y
        let r = Math.sqrt(dx * dx + dy * dy)
        let k = epsilon * r * r
        this.nodes[i].vx += dx * k
        this.nodes[i].vy += dy * k
      }
      // link间的引力
      let delt = 1.5e-7
      for (let i = 0, n = this.links.length; i < n; i++) {
        let link = this.links[i],
          source = link.source,
          target = link.target,
          strength = link.value
        // let line = document.getElementById(source + target)
        let source_node = this.nodes[this.idToIndex[source]]
        let target_node = this.nodes[this.idToIndex[target]]
        let dx = source_node.x - target_node.x
        let dy = source_node.y - target_node.y
        let r = Math.sqrt(dx * dx + dy * dy)
        let k = delt * r * r / strength
        source_node.vx -= dx * k
        source_node.vy -= dy * k
        target_node.vx += dx * k
        target_node.vy += dy * k
      }
    },
  }
}
</script>

<style>
#app {
  margin: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
