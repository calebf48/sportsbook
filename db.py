import sqlite3

#Create an NFL database
con = sqlite3.connect('./db/nfl.db')
cur = con.cursor()

#cur.execute('CREATE TABLE Game(id, year, week, home_team, away_team, ml, spread, total, home_score, away_score)')
#print('Game table created')

cur.execute('INSERT INTO Game VALUES(1, 2024, 11, Philadelphia Eagles, Washington Commanders, -170/200, -10.5/10.5, 43.5, 26, 18);')