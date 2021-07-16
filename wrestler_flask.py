# %%
import datetime as dt
import numpy as np
import pandas as pd
import sqlalchemy
from flask import Flask, render_template, request, flash
from sqlalchemy import create_engine, MetaData, PrimaryKeyConstraint
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Float, Text, Date
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, inspect


# %%
# Variable to hold csv files
csvfile = ["Resources/event_match.csv", "wrestlers_data.csv"]

# Setup database
engine = create_engine("sqlite:///wrestling.sqlite")
conn = engine.connect()


# %%
# Refelct existing database into new one
Base = declarative_base()


# %%



# %%
Base.metadata.create_all(engine)
metadata = MetaData(bind=engine)
metadata.reflect()


# %%
###
# Use Pandas to read csv into a list of row objects
###

wwe_df = pd.read_csv(csvfile[0], dtype=object)
events_data = wwe_df.to_dict(orient='records')
###
wwe_df = pd.read_csv(csvfiles[1], dtype=object)
global_wrestlers = wwe_df.to_dict(orient='records')

wwe_df.head(100)


# %%
wwe_df = wwe_df.to_sql('wrestling', con=engine, if_exists='replace')
engine.execute("SELECT * FROM wrestling").fetchall()


# %%
# Create our session (link) from Python to the DB
session = Session(engine)

# Collect the names of tables within the database
inspector = inspect(engine)
inspector.get_table_names()


# %%
# Flask setup and routes
app = Flask(__name__)

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/about/')
def about():
    return render_template('about.html')

@app.route('/dashboard/')
def dashboard():
    return render_template('dashboard.html')

@app.route('/bio/')
def bio():
    return render_template('bio.html')

if __name__ == '__main__':
    app.run(debug=True)


# %%



