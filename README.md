RPGym

Overview:
We will be combining a fitness app with an Role Play Game, where a user can level up their character through running. A user can also
battle other users through turn based combat. The ultimatel goal is to gamify fitness to incentivize gamers to go outside and get fit.

MVP (Tier 1):
A user's data should be pulled from the Strava API. This
data will be used to determine the speed stat. A character
will have 3 stats: Speed, HP and Energy. During battle, a user can
Attack (using 1 of 3 moves), Block (take a %tage of the
attack), and Charge (gain energy at the cost of a turn.
Energy is used to attack). All users will only be 1 class.

-Access data from Strava API
-Create character associated with a user
  -make page that displays character data
-A character has 3 stats (Speed, HP and Energy)
  -Speed is associated with a user's fastest mile
-A user can battle other users
  -Only "Sprint" battles wll be available (short battles, faster timeout)
  -A user can have 3 moves
  -A user can block damage
  -A user can Charge to gain energy

Tier 2:
-Leveling up
-More classes (sub classes), more moves
 (Think of more move names)
-Leaderboard
-Battle history
-Achievements / Bounties / Quests

Tier 3:
-Distinction between types of exercises (run, bike, etc)
-Different types of battles (having the run BE the battle)
-Accessibility features


Stretch Goals:
A user should be able to gain more energy by running and the energy cap should increase when a user levels up. A user can choose between 2 classes (Mage and Warrior), each with their own separate move list. A user should be able to increase their level through fitness, allowing their character to have access to new moves.

Stack Used:
Express, React, Redux, Sequelize, Postgres, Web Sockets

Norms:

What does this group do when two or more members disagree (ex. on a technical approach, a technology choice, etc)?

Talk about it then vote.


What does this group do when a member is frustrated?

Ask if they want to talk about their frustration. If I am the reason why someone is frustrated, ask another teammate to speak to person B to mediate.

What does this group do when we merge our work together?

Inform the team that you are merging. Request the team to look at it. If there is a merge conflict, the member(s) working on that feature should work together to resolve the conflict.

When does this group ask for help?

If we're pair programming, always ask for help. Over communicate. IF the pair is stuck, after 10 mins, approach the other pair. If they cannot help, approach the instructors and fellows. The normal strategy would be to run through the code, go to documentation and then to google before asking for help.

How do we pair? What do we do when two group members pair with each other?

Change the pair everyday. Option: Dicuss the potiential of switching pairs mid-day during standup.

How does this group approach work "after hours" (i.e. after normal class hours and weekends)?

It is up to an individual to code after hours. You are not punished for it. If you are working on a feature after hours, it would be nice to ask for permission and alert people you are doing so first.

What time does this group have daily stand up?

Right after REACTO, around 10:30AM. We will have a second stand up after lunch and a catch-up at 5:50PM.

Roles:

Taskmaster and Gitmaster per pair.
Once or twice a week, we'll go back to our code to make tests.
-Tuesday is a optional day for specs.
-1/2 hours on Friday
-Google sheet with date, roll and person assigned to the roll for the day.
