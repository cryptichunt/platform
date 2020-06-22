import React from 'react'
import styled from 'styled-components'
import Layout from '../components/Layout'

const terminalText = [
  {
    date: (
      <>
        <div>Wed Jun 03 00:27:51 IST 2020</div>
        <br />
      </>
    ),
    command: 'cat explanation.txt',
    text:
      'Greetings! Keeping in line with the cryptic nature of the event, and the CTF influence, the format and the rules of the event will be revealed in the form of a rolling release. 14 points will be released over the next 14 days. Check back every day and gain a new piece of information regarding the event. Happy hunting.',
  },
  {
    date: (
      <>
        <div>Wed Jun 03 00:27:51 IST 2020</div>
        <br />
      </>
    ),
    command: 'cat day-one-rule.txt',
    text:
      'Cryptocracy will start on the 19th of June at 12:00:00 PM IST and will end on 20th June at 11:59:59 PM IST.',
  },
  {
    date: (
      <>
        <div>Thu Jun 04 00:00:01 IST 2020</div>
        <br />
      </>
    ),
    command: 'cat day-two-rule.txt',
    text: (
      <div>
        The hunt will be in the form of a board game. Every tile on the board
        will represent one of 4 things- a level, a tile sharing a piece of
        information related to the overlying story (the story will be released
        in a few days), one of the 4 unique corners or a random chance tile.
        Further details regarding every tile will be detailed later.
        <br />
      </div>
    ),
  },
  {
    date: (
      <>
        <div>Fri Jun 05 00:07:54 IST 2020</div>
        <br />
      </>
    ),
    command: 'cat day-three-rule.txt',
    text: (
      <div>
        The board will have 81 tiles in total - 8 tiles giving information
        relating to the story, 45 level tiles, 23 randomised chance tiles, 4
        unique corners, and one final tile related to the story.
        <br />
      </div>
    ),
  },
  {
    date: (
      <>
        <div>Sat Jun 06 00:16:43 IST 2020</div>
        <br />
      </>
    ),
    command: 'cat day-four-rule.txt',
    text: (
      <div>
        Your movements, and your fate, will be decided by the roll of a virtual
        die. There is no cooldown time period on how often you can roll the die,
        however, you must complete the actions of the tile you are on (eg. solve
        the level, read the story, finish the random chance tile
        action/encounter) before you can roll the die again and move on. Tiles
        that you have visited before become greyed out. You can roll the die
        again without any delay if you land on a previously visited, greyed out
        tile.
      </div>
    ),
  },
  {
    date: (
      <>
        <div>Sun Jun 07 00:04:13 IST 2020</div>
        <br />
      </>
    ),
    command: 'cat day-five-rule.txt',
    text: (
      <div>
        Answers will be lowercase, alphanumeric strings. Special characters are
        allowed.
      </div>
    ),
  },
  {
    date: (
      <>
        <div>Mon Jun 08 00:21:45 IST 2020</div>
        <br />
      </>
    ),
    command: 'cat day-six-rule.txt',
    text: <div>You guys ever played Monopoly? </div>,
  },
  {
    date: (
      <>
        <div>Tue Jun 09 00:12:39 IST 2020</div>
        <br />
      </>
    ),
    command: 'cat day-seven-rule.txt',
    text: (
      <div>
        Lead confirmations will remain open at all times. Participants can
        message any discord admin to get their leads confirmed.
      </div>
    ),
  },
  {
    date: (
      <>
        <div>Thu Jun 11 00:08:20 IST 2020</div>
        <br />
      </>
    ),
    command: 'cat day-nine-rule.txt',
    text: (
      <div>
        Teaming or forming alliances: now this has always been a controversial
        part of every hunt. In Cryptocracy, everyone is allowed to team up or
        form an alliance, even though it's an individual hunt. This doesn't mean
        that people can cheat so extensively that it is apparent to the admins.
        There are two ways you can get banned - 1) Your alliance gets noticed by
        us, or 2) If the participant(s) you are teaming up with report you. The
        details of this reporting system will be explained tomorrow. Also, you
        might've noticed that there was no day-eight-rule.txt. Strange, isn't
        it?
      </div>
    ),
  },
  {
    date: (
      <>
        <div>Fri Jun 12 00:48:17 IST 2020</div>
        <br />
      </>
    ),
    command: 'cat day-ten-rule.txt',
    text: (
      <div>
        The Bounty System: a person can turn in the participant(s) who've
        contacted them for answers if they have sufficient proof of teaming. For
        each person you report you will get the bounty that was on that player's
        head. The exact amount you will receive will be revealed along with the
        rest of the game economy. A person can report the guilty individual
        within 30 minutes of them last approaching the player for answers.
        Methods of reporting including screenshots of conversations, audio
        recordings of calls, etc. Also, we're proud to announce that our
        official sponsor is IvyAchievement! Check them out{' '}
        <a href="https://www.ivyachievement.com/" style={{ color: 'inherit' }}>
          here
        </a>
        .
      </div>
    ),
  },
  {
    date: (
      <>
        <div>Sat Jun 13 00:39:38 IST 2020</div>
        <br />
      </>
    ),
    command: 'cat day-eleven-rule.txt',
    text: (
      <div>
        Prizes have been revealed, check them out{' '}
        <a
          href="https://www.instagram.com/p/CBWK36Hl995/?igshid=kws9jeec5w0j"
          style={{ color: 'inherit' }}
        >
          here
        </a>
        .
      </div>
    ),
  },
  {
    date: (
      <>
        <div>Sun Jun 14 00:13:17 IST 2020</div>
        <br />
      </>
    ),
    command: 'cat day-twelve-rule.txt',
    text: (
      <div>
        The 4 corners of the map are:
        <br />
        1) Bottom-Right is the “GO”, players will collect a small number of
        points when they pass it, but the amount of points is limited i.e. it
        gets exhausted after a while so that players cannot keep passing GO and
        to farm points after they’re done with the levels.
        <br />
        2) Bottom-Left is the Jail where players will have to serve their
        sentence.
        <br />
        3) Top-Left is the gate to the enter the inner tiles, you need to have
        completed a certain number of levels from the outer tiles before you can
        enter the inner ones.
        <br />
        4) Top-Right is a mystery square. It’s contents will get revealed
        mid-game.
        <br />
      </div>
    ),
  },
  {
    date: (
      <>
        <div>Mon Jun 15 00:01:25 IST 2020</div>
        <br />
      </>
    ),
    command: 'cat day-thirteen-rule.txt',
    text: (
      <div>
        Our promo video's out, here's a little{' '}
        <a
          href="https://www.youtube.com/watch?v=Ne7H5zYWmRo"
          target="_blank"
          rel="noreferrer"
        >
          "teaser"
        </a>{' '}
        for you :wink:
      </div>
    ),
  },
  {
    date: (
      <>
        <div>Tue Jun 16 00:02:17 IST 2020</div>
        <br />
      </>
    ),
    command: 'cat day-fourteen-rule.txt',
    text: (
      <div>
        The final tile will be directly related to the underlying story. It will
        only be accessible once all other level tiles have been solved and story
        tiles have been interacted with. Being the final tile in the innermost
        square, it will reward the player with the maximum number of points,
        however, the final level can only be solved by a single player.{' '}
      </div>
    ),
  },
  {
    date: (
      <>
        <div>Thu Jun 18 00:51:43 IST 2020</div>
        <br />
      </>
    ),
    command: 'cat bonus-rule.txt',
    text: (
      <div>
        Cryptocracy Economy: The currency of cryptocracy is points. Your
        objective is to get as many points as you can. The person with the
        maximum points at the end of 48 hours will be declared winner.
        <br /> The distribution of the points is as follows:-
        <br /> Referral: +10
        <br /> Outer Square Level: +500
        <br /> Inner Square Level: +1000
        <br /> Final Level: +3000 (Can only be solved by one player)
        <br /> Hint Card: -125 (Has to be purchased from the shop)
        <br /> Level Skip Card: -350 (Has to be purchased from the shop)
        <br /> Jail: -125 (To get out of Jail)
        <br /> Go Square- +200 x 5 (Will exhaust after completing 5 rounds
        around the outer board)
        <br />
        Some other important "bits of information":-
        <br /> 1) Each hint card will have a unique code. Participants have to
        send this unique code to the admins to avail the hint.
        <br /> 2) Hints will be released if the admins feel that they are
        necessity. For most levels participants will have to buy hint cards from
        the shop.
        <br /> 3) The leaderboard will show the bounty for each player at all
        times.
        <br /> 4) For the gate to enter the inner board to open you have to
        complete all the levels in the outer board.
      </div>
    ),
  },
  {
    command: 'sudo cat help.txt',
    commandText: (
      <>
        <div style={{ display: 'block' }}>[sudo] password for villager:</div>
      </>
    ),
    text: (
      <div>
        The story can be found{' '}
        <a
          href="https://docs.google.com/document/d/1FalOU_hKzum3LV-BzHBJdcOwJf3FyjokUGe_p2TwL9k/edit?usp=sharing"
          target="_blank"
          rel="noreferrer"
        >
          here.
        </a>
        <br />A short TL;DR can be found{' '}
        <a
          href="https://docs.google.com/document/d/1RTzJZ3STnN9jAFJcM2CPBQxwLZbOxqyqdIKsHdEOkm0/edit?usp=sharing"
          target="_blank"
          rel="noreferrer"
        >
          here.
        </a>
      </div>
    ),
  },
  {
    command: 'sudo cat levels.txt',
    text:
      ' cat: levels.txt: No such file or directory. Check back on 19th June, 12:00:00 PM IST 2020 to participate in the event. We sincerely apologize for the delay. Happy hunting!',
  },
]

const Terminal = styled.div`
  margin: auto;
  width: 60%;
  color: #eee;
  line-height: 32px;
  * {
    font-family: monospace;
  }
  @media screen and (max-width: 768px) {
    width: 75%;
  }
  div {
    display: inline-block;
    font-size: 18px;
  }
`

const Tag = styled.div`
  color: #1793d1;
  font-weight: bold;
`

const Blinking = styled.span`
  div.blinking {
    animation: blinkingText 1.2s infinite;
  }
  @keyframes blinkingText {
    0% {
      color: #eee;
    }
    49% {
      color: #eee;
    }
    60% {
      color: transparent;
    }
    99% {
      color: transparent;
    }
    100% {
      color: #eee;
    }
  }
`

const MainTerminal = styled.div`
  padding: 50px;
`

export default () => (
  <Layout
    title="Rules & Format"
    allowAll={true}
    allowAuthenticated={true}
    fallback="/"
  >
    <MainTerminal>
      <Terminal>
        {terminalText.map(({ command, text, commandText, date }) => (
          <div key={command} style={{ display: 'block' }}>
            <Tag>[villager@archlinux ~]$ </Tag> {command}
            <br />
            {commandText}
            {date}
            {text}
          </div>
        ))}
        <div style={{ display: 'block' }}>
          <Tag>[villager@archlinux ~]$ </Tag> cd Home
          <Blinking>
            <div className="blinking">|</div>
          </Blinking>
        </div>
      </Terminal>
    </MainTerminal>
  </Layout>
)
