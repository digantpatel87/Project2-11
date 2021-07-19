# %%
import datetime as dt
import numpy as np
import pandas as pd
import sqlalchemy
from flask import Flask, render_template, request, flash
from sqlalchemy import create_engine, MetaData, PrimaryKeyConstraint
from sqlalchemy import sql
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Float, Text, Date
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, inspect
import os
from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)
import sqlite3

from sqlalchemy.sql.expression import false

# %%
# Variable to hold csv files
csvfile = ["Resources/event_match.csv", "Resources/wrestlers_data.csv","Resources/wrestlers_data_withLatLon.csv"]

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
wwe_df = pd.read_csv(csvfile[1], dtype=object)
global_wrestlers = wwe_df.to_dict(orient='records')

wwe_df.head(100)
wwelatlon_df = pd.read_csv(csvfile[2], dtype=object)
wwelatlon = wwelatlon_df.to_dict(orient='records')

# %%
wwe_df = wwe_df.to_sql('wrestling', con=engine, if_exists='replace')
wwelatlon_df = wwelatlon_df.to_sql('wwelatlon', con=engine, if_exists='replace')

engine.execute("SELECT * FROM wrestling").fetchall()


# %%
# Create our session (link) from Python to the DB
session = Session(engine)

# Collect the names of tables within the database
inspector = inspect(engine)
inspector.get_table_names()

# %%
# Flask setup and routes



#################################################
# Flask Setup
#################################################
app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')
    
@app.route('/index')
def index1():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')

@app.route('/bio')
def bio():
    return render_template('bio.html')

@app.route("/api/wrestlingdata")
def wrestlingdata():
    # con = sqlite3.connect ("wrestling.sqlite")
    # con.row_factory = sqlite3.Row
    
    # cur = con.cursor()
    # results = cur.execute("select Rank, Name from wrestling")
    
    con = sqlite3.connect("wrestling.sqlite")
    df = pd.read_sql_query("select Rank,Name,Height,Weight,Rating,Votes,City,State,Country from wrestling", con)

    # Verify that result of SQL query is stored in the dataframe
    # print(df.head())



    # print(results)
    # rank = [result[0] for result in results]
    # name = [result[1] for result in results]

    # wrestlingdata_data = [{
    #     "Rank": rank,
    #     "Name": name
    # }]
    # rows = cur.fetchall(); 
    # return jsonify(wrestlingdata_data)
    return df.to_csv()

@app.route("/api/wwelatlon")
def wwelatlondata():
    con = sqlite3.connect("wrestling.sqlite")
    df = pd.read_sql_query("select * from wwelatlon", con)
    return df.to_csv()

if __name__ == '__main__':
    app.run(debug=True)


# %%



