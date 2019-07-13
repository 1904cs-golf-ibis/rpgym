import React, {Component} from 'react'

import BattleActions from './battle-actions'
import BattleMessages from './battle-messages'

export default class Arena extends Component {
  render() {
    return (
      <div id="arenaContainer">
        <div id="arena">
          <div id="arenaAvatar">
            <img
              src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/eaea9a95-2614-4b2a-ab10-580f594097f7/d4okomz-de8567ea-7d7e-4ebb-bc94-2948bf5f95c4.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2VhZWE5YTk1LTI2MTQtNGIyYS1hYjEwLTU4MGY1OTQwOTdmN1wvZDRva29tei1kZTg1NjdlYS03ZDdlLTRlYmItYmM5NC0yOTQ4YmY1Zjk1YzQuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.PiUCxOEAoF38VZ7I_z0pj_e51-Zt4y8SmJIqS6qyYQg"
              width="250%"
            />
          </div>

          <div id="arenaOpponent">
            <img
              src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/7cfc5bf3-7934-445e-a8fa-e086ddf4c067/d519zzf-2891309f-a401-400d-a107-52013fb301f4.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzdjZmM1YmYzLTc5MzQtNDQ1ZS1hOGZhLWUwODZkZGY0YzA2N1wvZDUxOXp6Zi0yODkxMzA5Zi1hNDAxLTQwMGQtYTEwNy01MjAxM2ZiMzAxZjQuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.aVXE3aHCpu24mHjJLAQaGFZ-r4DyH8QD4dgztbqSyBs"
              width="250%"
            />
          </div>
        </div>
      </div>
    )
  }
}
