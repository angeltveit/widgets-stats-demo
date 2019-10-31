import { Component, Template, Attribute } from '@scoutgg/widgets'
import template from './stats-table.pug'

@Component('demo')
@Attribute('season', Number)
@Attribute('round', Number, { default: 1 })
@Template(template)
export default class StatsTable extends HTMLElement {
  connectedCallback() {
    this.load()
  }
  changeGw(num) {
    if(num < 1) return
    if(num > this.seasonData.finalRound) return
    this.round = num
    this.load()
    this.render()
  }
  async load() {
    // Load the data
    this.loading = true;
    this.render()
    const { seasonTeamRoundStats, seasons } = await fetch(`https://fanteam-game.api.scoutgg.net/season_participations/lite?season_id=${this.season}&side=all&rotation=false&round=${this.round}&$reload=false&bearer[white_label]=fanteam`)
      // Gracefully handle wrong params
      .then((response) => {
        this.loaded = true
        if(!response.ok) {
          console.warn('Load failed. Did you pass wrong params to the component?')
          return []
        }
        return response.json()
      })
    this.seasonTeamRoundStats = seasonTeamRoundStats
    this.seasonData = seasons.find(season => season.id === this.season) || {}
    setTimeout(() => {
      // Tiny hack to not have a fast blink. Better "native" experience
      // for fast connections.
      this.loading = false;
      this.render()
    }, 250)
    
  }
}
